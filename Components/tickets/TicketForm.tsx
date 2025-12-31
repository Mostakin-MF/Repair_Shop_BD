'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ticketSchema } from '@/lib/utils/validation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/Card';
import { createTicket, updateTicket } from '@/lib/actions/tickets';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Customer } from '@/lib/db/schema';

// Extend schema to handle form data where numeric/enums might need specific handling if not already covered
type TicketFormData = z.infer<typeof ticketSchema>;

interface TicketFormProps {
  initialData?: any; // Using any to avoid strict type conflicts with DB result vs form expect
  customerId?: string;
  customers: Customer[];
  isEdit?: boolean;
}

export default function TicketForm({ initialData, customerId, customers, isEdit = false }: TicketFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      notes: initialData?.notes || '',
      priority: initialData?.priority || 'MEDIUM',
      status: initialData?.status || 'OPEN',
      customerId: initialData?.customerId || customerId || '',
    },
  });

  async function onSubmit(data: TicketFormData) {
    setIsSubmitting(true);
    setError(null);

    try {
      if (isEdit && initialData?.id) {
        const result = await updateTicket(initialData.id, data);
        if (result.success) {
          router.push(`/dashboard/tickets/${initialData.id}`);
        } else {
            // @ts-ignore
          setError(result.error || 'Failed to update ticket');
        }
      } else {
        const result = await createTicket(data);
        if (result.success) {
            // @ts-ignore
          router.push(`/dashboard/tickets/${result.data.id}`);
        } else {
            // @ts-ignore
          setError(result.error || 'Failed to create ticket');
        }
      }
    } catch (e) {
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{isEdit ? 'টিকেট সম্পাদনা করুন' : 'নতুন টিকেট তৈরি করুন'}</CardTitle>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {error && (
            <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">শিরোনাম</label>
            <Input
              {...form.register('title')}
              error={form.formState.errors.title?.message}
              placeholder="টিকেট শিরোনাম"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">বিবরণ</label>
            <Textarea
              {...form.register('description')}
              error={form.formState.errors.description?.message}
              placeholder="সমস্যার বিস্তারিত বিবরণ"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-2">
              <label className="text-sm font-medium">গ্রাহক</label>
              <select
                {...form.register('customerId')}
                className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                disabled={!!customerId || isEdit} // Disable if pre-selected or editing (typically don't change customer on edit)
              >
                <option value="">গ্রাহক নির্বাচন করুন</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.firstName} {c.lastName} ({c.email})
                  </option>
                ))}
              </select>
              {form.formState.errors.customerId && (
                <p className="text-xs text-destructive mt-1">{form.formState.errors.customerId.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">অগ্রাধিকার</label>
              <select
                {...form.register('priority')}
                 className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="LOW">নিম্ন (Low)</option>
                <option value="MEDIUM">মাঝারি (Medium)</option>
                <option value="HIGH">উচ্চ (High)</option>
              </select>
            </div>
          </div>

          {isEdit && (
            <div className="space-y-2">
              <label className="text-sm font-medium">স্ট্যাটাস</label>
               <select
                {...form.register('status')}
                 className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="OPEN">খোলা (Open)</option>
                <option value="COMPLETED">সম্পন্ন (Completed)</option>
              </select>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">নোট (ঐচ্ছিক)</label>
            <Textarea
              {...form.register('notes')}
              error={form.formState.errors.notes?.message}
              placeholder="অতিরিক্ত নোট"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            বাতিল
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEdit ? 'আপডেট করুন' : 'তৈরি করুন'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
