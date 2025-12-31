import { z } from 'zod';

// Customer Validation Schema
export const customerSchema = z.object({
    firstName: z.string().min(1, 'First name is required').max(100),
    lastName: z.string().min(1, 'Last name is required').max(100),
    email: z.string().email('Invalid email address').max(255),
    phone: z.string().min(1, 'Phone is required').max(20),
    address: z.string().min(1, 'Address is required').max(500),
    city: z.string().min(1, 'City is required').max(100),
    state: z.string().max(100).optional(),
    zipCode: z.string().max(20).optional(),
    notes: z.string().optional(),
});

export type CustomerFormData = z.infer<typeof customerSchema>;

// Ticket Validation Schema
export const ticketSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255),
    description: z.string().min(1, 'Description is required'),
    notes: z.string().optional(),
    customerId: z.string().uuid('Invalid customer'),
    assignedTo: z.string().uuid().optional(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    status: z.enum(['OPEN', 'COMPLETED']).optional(),
});

export type TicketFormData = z.infer<typeof ticketSchema>;

// User Update Schema
export const userUpdateSchema = z.object({
    role: z.enum(['EMPLOYEE', 'MANAGER', 'ADMIN']),
    isActive: z.boolean(),
});

export type UserUpdateData = z.infer<typeof userUpdateSchema>;

// Search Schema
export const searchSchema = z.object({
    query: z.string().min(1).max(255),
});

export type SearchData = z.infer<typeof searchSchema>;
