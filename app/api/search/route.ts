import { NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { tickets, customers } from '@/lib/db/schema';
import { requireAuth } from '@/lib/auth/kinde';
import { or, ilike } from 'drizzle-orm';

export async function GET(request: Request) {
    try {
        await requireAuth();

        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q');

        if (!query) {
            return NextResponse.json(
                { success: false, error: 'Search query required' },
                { status: 400 }
            );
        }

        // Search tickets
        const ticketResults = await db
            .select()
            .from(tickets)
            .where(
                or(
                    ilike(tickets.title, `%${query}%`),
                    ilike(tickets.description, `%${query}%`)
                )
            )
            .limit(10);

        // Search customers
        const customerResults = await db
            .select()
            .from(customers)
            .where(
                or(
                    ilike(customers.firstName, `%${query}%`),
                    ilike(customers.lastName, `%${query}%`),
                    ilike(customers.email, `%${query}%`),
                    ilike(customers.phone, `%${query}%`)
                )
            )
            .limit(10);

        return NextResponse.json({
            success: true,
            data: {
                tickets: ticketResults,
                customers: customerResults,
            },
        });
    } catch (error) {
        console.error('Error searching:', error);
        return NextResponse.json(
            { success: false, error: 'Search failed' },
            { status: 500 }
        );
    }
}
