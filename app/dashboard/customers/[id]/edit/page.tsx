import CustomerForm from '@/components/customers/CustomerForm';
import { db } from '@/lib/db/client';
import { customers } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default async function EditCustomerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [customer] = await db
    .select()
    .from(customers)
    .where(eq(customers.id, id));

  if (!customer) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/dashboard/customers/${customer.id}`}>
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            ফিরে যান
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-foreground">গ্রাহক সম্পাদনা</h1>
      </div>

      <CustomerForm 
        initialData={customer}
        isEdit={true}
      />
    </div>
  );
}
