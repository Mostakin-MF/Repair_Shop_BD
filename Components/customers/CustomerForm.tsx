'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { customerSchema } from '@/lib/utils/validation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/Card';
import { createCustomer, updateCustomer } from '@/lib/actions/customers';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

type CustomerFormData = z.infer<typeof customerSchema>;

interface CustomerFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function CustomerForm({ initialData, isEdit = false }: CustomerFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      firstName: initialData?.firstName || '',
      lastName: initialData?.lastName || '',
      email: initialData?.email || '',
      phone: initialData?.phone || '',
      address: initialData?.address || '',
      city: initialData?.city || '',
      state: initialData?.state || '',
      zipCode: initialData?.zipCode || '',
      notes: initialData?.notes || '',
    },
  });

  async function onSubmit(data: CustomerFormData) {
    setIsSubmitting(true);
    setError(null);

    try {
      if (isEdit && initialData?.id) {
        const result = await updateCustomer(initialData.id, data);
        if (result.success) {
          router.push(`/dashboard/customers/${initialData.id}`);
        } else {
             // @ts-ignore
          setError(result.error || 'Failed to update customer');
        }
      } else {
        const result = await createCustomer(data);
        if (result.success) {
             // @ts-ignore
          router.push(`/dashboard/customers/${result.data.id}`);
        } else {
             // @ts-ignore
          setError(result.error || 'Failed to create customer');
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
        <CardTitle>{isEdit ? 'গ্রাহক তথ্য সম্পাদনা' : 'নতুন গ্রাহক যোগ করুন'}</CardTitle>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {error && (
            <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">নামের প্রথম অংশ</label>
              <Input
                {...form.register('firstName')}
                error={form.formState.errors.firstName?.message}
                placeholder="Ex. Karim"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">নামের শেষ অংশ</label>
              <Input
                {...form.register('lastName')}
                error={form.formState.errors.lastName?.message}
                placeholder="Ex. Ahmed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">ইমেইল</label>
              <Input
                {...form.register('email')}
                error={form.formState.errors.email?.message}
                placeholder="example@email.com"
                type="email"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">ফোন</label>
              <Input
                {...form.register('phone')}
                error={form.formState.errors.phone?.message}
                placeholder="017..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">ঠিকানা</label>
            <Input
              {...form.register('address')}
              error={form.formState.errors.address?.message}
              placeholder="House #, Road #"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">শহর</label>
              <Input
                {...form.register('city')}
                error={form.formState.errors.city?.message}
                placeholder="Dhaka"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">বিভাগ/রাজ্য</label>
              <Input
                {...form.register('state')}
                error={form.formState.errors.state?.message}
                placeholder="Dhaka"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">পোস্ট কোড</label>
              <Input
                {...form.register('zipCode')}
                error={form.formState.errors.zipCode?.message}
                placeholder="1200"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">নোট (ঐচ্ছিক)</label>
            <Textarea
              {...form.register('notes')}
              error={form.formState.errors.notes?.message}
              placeholder="গ্রাহক সম্পর্কে নোট"
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
            {isEdit ? 'আপডেট করুন' : 'যোগ করুন'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
