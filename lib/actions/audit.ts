'use server';

import { db } from '@/lib/db/client';
import { auditLogs } from '@/lib/db/schema';
import { requireAuth } from '@/lib/auth/kinde';

type AuditAction = 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'STATUS_CHANGE' | 'COMPLETE';
type AuditResource = 'TICKET' | 'CUSTOMER' | 'USER';

interface LogAuditProps {
    action: AuditAction;
    resourceType: AuditResource;
    resourceId: string;
    details?: string;
    metadata?: Record<string, unknown>;
}

export async function logAudit({
    action,
    resourceType,
    resourceId,
    details,
    metadata,
}: LogAuditProps) {
    try {
        const user = await requireAuth();

        await db.insert(auditLogs).values({
            userId: user.id || 'system',
            action,
            entity: resourceType,
            entityId: resourceId,
            changes: details ? { details, ...metadata } : metadata,
        });
    } catch (error) {
        console.error('Failed to log audit:', error);
        // Don't fail the request just because audit logging failed
    }
}
