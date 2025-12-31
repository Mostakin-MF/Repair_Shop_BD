'use server';

import { db } from '../db/client';
import { tickets, customers } from '../db/schema';
import { ticketSchema } from '../utils/validation';
import { requireAuth } from '../auth/kinde';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { sendTicketNotification } from '../email/notifications';
import { logAudit } from './audit';

export async function createTicket(data: unknown) {
    const user = await requireAuth();

    const validated = ticketSchema.parse(data);

    const [ticket] = await db.insert(tickets).values({
        ...validated,
        createdBy: user.id,
        status: 'OPEN',
    }).returning();

    // Send email notification
    try {
        const customer = await db.query.customers.findFirst({
            where: eq(customers.id, validated.customerId)
        });

        if (customer?.email) {
            await sendTicketNotification({
                to: customer.email,
                userName: `${customer.firstName} ${customer.lastName}`,
                ticketTitle: ticket.title,
                ticketId: ticket.id,
                type: 'CREATED'
            });
        }
    } catch (error) {
        console.error('Error sending email:', error);
    }

    await logAudit({
        action: 'CREATE',
        resourceType: 'TICKET',
        resourceId: ticket.id,
        details: `Created ticket: ${ticket.title}`,
    });

    revalidatePath('/dashboard');
    revalidatePath('/tickets');

    return { success: true, data: ticket };
}

export async function updateTicket(id: string, data: unknown) {
    const user = await requireAuth();

    const validated = ticketSchema.partial().parse(data);

    const [ticket] = await db.update(tickets)
        .set({
            ...validated,
            updatedAt: new Date(),
        })
        .where(eq(tickets.id, id))
        .returning();

    // Send email notification
    try {
        const customer = await db.query.customers.findFirst({
            where: eq(customers.id, ticket.customerId)
        });

        if (customer?.email) {
            await sendTicketNotification({
                to: customer.email,
                userName: `${customer.firstName} ${customer.lastName}`,
                ticketTitle: ticket.title,
                ticketId: ticket.id,
                type: 'UPDATED',
                status: ticket.status
            });
        }
    } catch (error) {
        console.error('Error sending email:', error);
    }

    await logAudit({
        action: 'UPDATE',
        resourceType: 'TICKET',
        resourceId: id,
        details: `Updated ticket status to ${ticket.status}`,
    });

    revalidatePath('/dashboard');
    revalidatePath('/tickets');
    revalidatePath(`/tickets/${id}`);

    return { success: true, data: ticket };
}

export async function completeTicket(id: string) {
    const user = await requireAuth();

    const [ticket] = await db.update(tickets)
        .set({
            status: 'COMPLETED',
            completedAt: new Date(),
            updatedAt: new Date(),
        })
        .where(eq(tickets.id, id))
        .returning();

    await logAudit({
        action: 'COMPLETE',
        resourceType: 'TICKET',
        resourceId: id,
        details: 'Marked ticket as completed'
    });

    revalidatePath('/dashboard');
    revalidatePath('/tickets');
    revalidatePath(`/tickets/${id}`);

    return { success: true, data: ticket };
}

export async function deleteTicket(id: string) {
    const user = await requireAuth();

    await db.delete(tickets).where(eq(tickets.id, id));

    await logAudit({
        action: 'DELETE',
        resourceType: 'TICKET',
        resourceId: id,
        details: 'Deleted ticket'
    });

    revalidatePath('/dashboard');
    revalidatePath('/tickets');

    return { success: true };
}
