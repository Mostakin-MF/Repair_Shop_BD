'use server';

import { db } from '../db/client';
import { users } from '../db/schema';
import { requireAdmin } from '../auth/kinde';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { UserRole } from '../utils/constants';
import { logAudit } from './audit';

export async function updateUserRole(userId: string, newRole: string) {
    try {
        await requireAdmin();

        if (!['EMPLOYEE', 'MANAGER', 'ADMIN'].includes(newRole)) {
            throw new Error('Invalid role');
        }

        await db.update(users)
            .set({ role: newRole as UserRole })
            .where(eq(users.id, userId));

        await logAudit({
            action: 'UPDATE',
            resourceType: 'USER',
            resourceId: userId,
            details: `Updated user role to ${newRole}`
        });

        revalidatePath('/dashboard/admin');
        return { success: true };
    } catch (error) {
        console.error('Failed to update user role:', error);
        return { success: false, error: 'Failed to update role' };
    }
}

export async function toggleUserStatus(userId: string, isActive: boolean) {
    try {
        await requireAdmin();

        await db.update(users)
            .set({ isActive })
            .where(eq(users.id, userId));

        await logAudit({
            action: 'UPDATE',
            resourceType: 'USER',
            resourceId: userId,
            details: `Updated user status to ${isActive ? 'Active' : 'Inactive'}`
        });

        revalidatePath('/dashboard/admin');
        return { success: true };
    } catch (error) {
        console.error('Failed to update user status:', error);
        return { success: false, error: 'Failed to update status' };
    }
}
