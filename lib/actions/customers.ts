'use server';

import { db } from '../db/client';
import { customers } from '../db/schema';
import { customerSchema } from '../utils/validation';
import { requireAuth } from '../auth/kinde';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { logAudit } from './audit';

export async function createCustomer(data: unknown) {
    const user = await requireAuth();

    const validated = customerSchema.parse(data);

    const [customer] = await db.insert(customers).values({
        ...validated,
        createdBy: user.id,
    }).returning();

    await logAudit({
        action: 'CREATE',
        resourceType: 'CUSTOMER',
        resourceId: customer.id,
        details: `Created customer: ${customer.firstName} ${customer.lastName}`
    });

    revalidatePath('/dashboard');
    revalidatePath('/customers');

    return { success: true, data: customer };
}

export async function updateCustomer(id: string, data: unknown) {
    const user = await requireAuth();

    const validated = customerSchema.partial().parse(data);

    const [customer] = await db.update(customers)
        .set({
            ...validated,
            updatedAt: new Date(),
        })
        .where(eq(customers.id, id))
        .returning();

    await logAudit({
        action: 'UPDATE',
        resourceType: 'CUSTOMER',
        resourceId: id,
        details: `Updated customer: ${customer.firstName} ${customer.lastName}`
    });

    revalidatePath('/dashboard');
    revalidatePath('/customers');
    revalidatePath(`/customers/${id}`);

    return { success: true, data: customer };
}

export async function deleteCustomer(id: string) {
    const user = await requireAuth();

    await db.delete(customers).where(eq(customers.id, id));

    await logAudit({
        action: 'DELETE',
        resourceType: 'CUSTOMER',
        resourceId: id,
        details: 'Deleted customer'
    });

    revalidatePath('/dashboard');
    revalidatePath('/customers');

    return { success: true };
}
