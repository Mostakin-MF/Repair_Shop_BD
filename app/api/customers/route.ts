import { NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { customers } from '@/lib/db/schema';
import { requireAuth } from '@/lib/auth/kinde';
import { customerSchema } from '@/lib/utils/validation';
import { desc, or, ilike } from 'drizzle-orm';

export async function GET(request: Request) {
    try {
        await requireAuth();

        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search');

        let query = db.select().from(customers).$dynamic();

        if (search) {
            query = query.where(
                or(
                    ilike(customers.firstName, `%${search}%`),
                    ilike(customers.lastName, `%${search}%`),
                    ilike(customers.email, `%${search}%`),
                    ilike(customers.phone, `%${search}%`)
                )
            );
        }

        const results = await query.orderBy(desc(customers.createdAt));

        return NextResponse.json({ success: true, data: results });
    } catch (error) {
        console.error('Error fetching customers:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch customers' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const user = await requireAuth();
        const body = await request.json();

        const validated = customerSchema.parse(body);

        const [customer] = await db.insert(customers).values({
            ...validated,
            createdBy: user.id,
        }).returning();

        return NextResponse.json({ success: true, data: customer });
    } catch (error) {
        console.error('Error creating customer:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create customer' },
            { status: 500 }
        );
    }
}
