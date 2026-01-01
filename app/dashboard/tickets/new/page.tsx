import TicketForm from '@/components/tickets/TicketForm';
import { db } from '@/lib/db/client';
import { customers } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default async function NewTicketPage({ searchParams }: { searchParams: Promise<{ customerId?: string }> }) {
  const { customerId } = await searchParams;
  const allCustomers = await db
    .select()
    .from(customers)
    .orderBy(desc(customers.createdAt));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/tickets">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            ফিরে যান
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-foreground">নতুন টিকেট</h1>
      </div>

      <TicketForm 
        customers={allCustomers} 
        customerId={customerId} 
      />
    </div>
  );
}
