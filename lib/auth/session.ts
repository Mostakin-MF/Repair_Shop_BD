import { User } from '../db/schema';
import { MAX_DAYS_BETWEEN_LOGINS } from '../utils/constants';

export function needsLogin(user: User): boolean {
    if (!user.lastLoginAt) {
        return true;
    }

    const daysSinceLogin = Math.floor(
        (Date.now() - user.lastLoginAt.getTime()) / (1000 * 60 * 60 * 24)
    );

    return daysSinceLogin >= MAX_DAYS_BETWEEN_LOGINS;
}

export function getSessionExpiryDate(lastLogin: Date): Date {
    const expiry = new Date(lastLogin);
    expiry.setDate(expiry.getDate() + MAX_DAYS_BETWEEN_LOGINS);
    return expiry;
}

export function getDaysUntilExpiry(lastLogin: Date): number {
    const expiry = getSessionExpiryDate(lastLogin);
    const daysLeft = Math.ceil(
        (expiry.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    return Math.max(0, daysLeft);
}
