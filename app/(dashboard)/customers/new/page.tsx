import CustomerForm from '@/components/customers/CustomerForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function NewCustomerPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/customers">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            ফিরে যান
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-foreground">নতুন গ্রাহক</h1>
      </div>

      <CustomerForm />
    </div>
  );
}
