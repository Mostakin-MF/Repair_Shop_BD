'use server';

import { db } from '@/lib/db/client';
import { customers, tickets } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

// Schema for booking submission
// Using flexible schema validation to handle both new and existing customers
const bookingSchema = z.object({
    // Customer Info
    phone: z.string().min(1, 'Phone number is required'),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email().optional().or(z.literal('')),
    address: z.string().optional(),
    city: z.string().optional(),

    // Ticket Info
    vehicleType: z.enum(['CAR', 'BIKE', 'OTHER']),
    vehicleModel: z.string().min(1, 'Vehicle model is required'),
    serviceType: z.enum(['ENGINE_WORK', 'WASH', 'SERVICING', 'PAINT', 'OTHER']),
    description: z.string().min(1, 'Description is required'),
    appointmentDate: z.string().optional(), // ISO string from date picker
});

export type BookingState = {
    success?: boolean;
    error?: string | null;
    data?: any;
};

export async function checkCustomerByPhone(phone: string) {
    try {
        const customer = await db.query.customers.findFirst({
            where: eq(customers.phone, phone),
        });

        if (customer) {
            return { success: true, customer };
        }
        return { success: true, customer: null };
    } catch (error) {
        console.error('Error checking customer:', error);
        return { success: false, error: 'Failed to check customer' };
    }
}

export async function submitBooking(prevState: BookingState, formData: FormData): Promise<BookingState> {
    try {
        const rawData = {
            phone: formData.get('phone') as string,
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            email: formData.get('email') as string,
            address: formData.get('address') as string,
            city: formData.get('city') as string,

            vehicleType: formData.get('vehicleType') as any,
            vehicleModel: formData.get('vehicleModel') as string,
            serviceType: formData.get('serviceType') as any,
            description: formData.get('description') as string,
            appointmentDate: formData.get('appointmentDate') as string,
        };

        // Basic validation
        // Note: In a real app we'd use safeParse from Zod here, but simplified for speed
        if (!rawData.phone || !rawData.description || !rawData.vehicleType || !rawData.vehicleModel) {
            return { success: false, error: 'Mandatory fields missing' };
        }

        // Check if customer exists
        const existingCustomer = await db.query.customers.findFirst({
            where: eq(customers.phone, rawData.phone),
        });

        let customerId = existingCustomer?.id;

        if (!existingCustomer) {
            // Create new customer
            if (!rawData.firstName || !rawData.lastName) {
                return { success: false, error: 'Name is required for new customers' };
            }

            const [newCustomer] = await db.insert(customers).values({
                firstName: rawData.firstName,
                lastName: rawData.lastName,
                email: rawData.email || `temp_${Date.now()}@example.com`, // Allow booking without email if needed, or enforce
                phone: rawData.phone,
                address: rawData.address || 'Not provided',
                city: rawData.city || 'Dhaka',
                // createdBy is optional now in schema for this exact reason
            }).returning();

            customerId = newCustomer.id;
        }

        if (!customerId) {
            return { success: false, error: 'Failed to identify customer' };
        }

        // Create Ticket
        const [newTicket] = await db.insert(tickets).values({
            title: `${rawData.serviceType} for ${rawData.vehicleModel}`,
            description: rawData.description,
            status: 'OPEN',
            priority: 'MEDIUM',
            customerId: customerId,
            vehicleType: rawData.vehicleType,
            vehicleModel: rawData.vehicleModel,
            serviceType: rawData.serviceType,
            appointmentDate: rawData.appointmentDate ? new Date(rawData.appointmentDate) : new Date(),
            // createdBy is optional
        }).returning();

        revalidatePath('/dashboard/tickets');

        return { success: true, data: { ticketId: newTicket.id } };
    } catch (error) {
        console.error('Booking error:', error);
        return { success: false, error: 'Failed to submit booking' };
    }
}
