import { format, formatDistance, formatRelative } from 'date-fns';

export function formatDate(date: Date | string | null | undefined): string {
    if (!date) return 'N/A';
    try {
        const d = typeof date === 'string' ? new Date(date) : date;
        return format(d, 'MMM dd, yyyy');
    } catch {
        return 'Invalid date';
    }
}

export function formatDateTime(date: Date | string | null | undefined): string {
    if (!date) return 'N/A';
    try {
        const d = typeof date === 'string' ? new Date(date) : date;
        return format(d, 'MMM dd, yyyy HH:mm');
    } catch {
        return 'Invalid date';
    }
}

export function formatRelativeTime(date: Date | string | null | undefined): string {
    if (!date) return 'N/A';
    try {
        const d = typeof date === 'string' ? new Date(date) : date;
        return formatDistance(d, new Date(), { addSuffix: true });
    } catch {
        return 'Invalid date';
    }
}

export function formatRelativeDate(date: Date | string | null | undefined): string {
    if (!date) return 'N/A';
    try {
        const d = typeof date === 'string' ? new Date(date) : date;
        return formatRelative(d, new Date());
    } catch {
        return 'Invalid date';
    }
}
