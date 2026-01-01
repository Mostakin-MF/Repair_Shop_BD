import TicketForm from '@/components/tickets/TicketForm';
import { db } from '@/lib/db/client';
import { customers, tickets } from '@/lib/db/schema';
import { desc, eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default async function EditTicketPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [ticket] = await db
    .select()
    .from(tickets)
    .where(eq(tickets.id, id));

  if (!ticket) {
    notFound();
  }

  const allCustomers = await db
    .select()
    .from(customers)
    .orderBy(desc(customers.createdAt));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/dashboard/tickets/${ticket.id}`}>
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            ফিরে যান
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-foreground">টিকেট সম্পাদনা</h1>
      </div>

      <TicketForm 
        customers={allCustomers} 
        initialData={ticket}
        isEdit={true}
      />
    </div>
  );
}
