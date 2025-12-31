import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { db } from '../db/client';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

export async function getAuthUser() {
    const { getUser, isAuthenticated } = getKindeServerSession();

    const authenticated = await isAuthenticated();
    if (!authenticated) {
        return null;
    }

    const kindeUser = await getUser();
    if (!kindeUser) {
        return null;
    }

    // Find or create user in database
    let [dbUser] = await db.select().from(users).where(eq(users.kindeId, kindeUser.id));

    if (!dbUser) {
        // Create new user from Kinde data
        [dbUser] = await db.insert(users).values({
            kindeId: kindeUser.id,
            email: kindeUser.email || '',
            firstName: kindeUser.given_name || '',
            lastName: kindeUser.family_name || '',
            profileImageUrl: kindeUser.picture || null,
            role: 'EMPLOYEE', // Default role, admin can change
            isActive: true,
            lastLoginAt: new Date(),
        }).returning();
    } else {
        // Update last login time
        [dbUser] = await db.update(users)
            .set({ lastLoginAt: new Date() })
            .where(eq(users.id, dbUser.id))
            .returning();
    }

    return dbUser;
}

export async function requireAuth() {
    const user = await getAuthUser();
    if (!user) {
        throw new Error('Unauthorized');
    }
    return user;
}

export async function requireAdmin() {
    const user = await requireAuth();
    if (user.role !== 'ADMIN') {
        throw new Error('Admin access required');
    }
    return user;
}
