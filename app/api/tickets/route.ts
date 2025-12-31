import { NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { tickets, customers } from '@/lib/db/schema';
import { requireAuth } from '@/lib/auth/kinde';
import { ticketSchema } from '@/lib/utils/validation';
import { desc, or, ilike, eq } from 'drizzle-orm';

export async function GET(request: Request) {
    try {
        await requireAuth();

        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search');
        const status = searchParams.get('status');

        let query = db
            .select({
                id: tickets.id,
                title: tickets.title,
                description: tickets.description,
                status: tickets.status,
                priority: tickets.priority,
                createdAt: tickets.createdAt,
                customerName: customers.firstName,
                customerLastName: customers.lastName,
            })
            .from(tickets)
            .leftJoin(customers, eq(tickets.customerId, customers.id))
            .$dynamic();

        if (status) {
            query = query.where(eq(tickets.status, status as any));
        }

        if (search) {
            query = query.where(
                or(
                    ilike(tickets.title, `%${search}%`),
                    ilike(tickets.description, `%${search}%`)
                )
            );
        }

        const results = await query.orderBy(desc(tickets.createdAt));

        return NextResponse.json({ success: true, data: results });
    } catch (error) {
        console.error('Error fetching tickets:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch tickets' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const user = await requireAuth();
        const body = await request.json();

        const validated = ticketSchema.parse(body);

        const [ticket] = await db.insert(tickets).values({
            ...validated,
            createdBy: user.id,
            status: 'OPEN',
        }).returning();

        return NextResponse.json({ success: true, data: ticket });
    } catch (error) {
        console.error('Error creating ticket:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create ticket' },
            { status: 500 }
        );
    }
}
