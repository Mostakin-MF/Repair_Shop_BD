'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { checkCustomerByPhone, submitBooking } from '@/lib/actions/booking';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import { Loader2, CheckCircle2, Car, Bike, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Validations
const phoneSchema = z.object({
  phone: z.string().min(11, 'ভুল ফোন নম্বর (কমপক্ষে ১১ অঙ্ক)').max(15, 'ভুল ফোন নম্বর'),
});

const detailsSchema = z.object({
  firstName: z.string().min(1, 'নাম আবশ্যক'),
  lastName: z.string().min(1, 'বংশনাম আবশ্যক'),
  email: z.string().email('সঠিক ইমেইল দিন').optional().or(z.literal('')),
  address: z.string().optional(),
  city: z.string().optional(),
});

const serviceSchema = z.object({
  vehicleType: z.enum(['CAR', 'BIKE', 'OTHER'], { required_error: 'যানবাহনের ধরন নির্বাচন করুন' }),
  vehicleModel: z.string().min(1, 'মডেল নেম আবশ্যক'),
  serviceType: z.enum(['ENGINE_WORK', 'WASH', 'SERVICING', 'PAINT', 'OTHER'], { required_error: 'সেবার ধরন নির্বাচন করুন' }),
  description: z.string().min(1, 'বিবরণ আবশ্যক'),
  appointmentDate: z.string().optional(),
}).refine((data) => {
    // Basic catch-all to ensure enums are selected
    return data.vehicleType && data.serviceType;
}, { message: "সব তথ্য সঠিক ভাবে পূরণ করুন" });

type BookingFormData = z.infer<typeof phoneSchema> & z.infer<typeof detailsSchema> & z.infer<typeof serviceSchema>;

export default function BookingForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [existingCustomer, setExistingCustomer] = useState<any>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Forms
  const { register: registerPhone, handleSubmit: handleSubmitPhone, formState: { errors: errorsPhone } } = useForm({
    resolver: zodResolver(phoneSchema)
  });

  const { register: registerDetails, handleSubmit: handleSubmitDetails, formState: { errors: errorsDetails }, setValue: setDetailsValue } = useForm({
    resolver: zodResolver(detailsSchema)
  });

  const { register: registerService, handleSubmit: handleSubmitService, formState: { errors: errorsService } } = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
        vehicleType: 'CAR',
        serviceType: 'SERVICING'
    }
  });

  // Steps Handlers
  const onPhoneSubmit = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await checkCustomerByPhone(data.phone);
      setPhone(data.phone);
      
      if (result.success && result.customer) {
        setExistingCustomer(result.customer);
        // Pre-fill details if existing
        setDetailsValue('firstName', result.customer.firstName);
        setDetailsValue('lastName', result.customer.lastName);
        setDetailsValue('email', result.customer.email);
        setDetailsValue('address', result.customer.address);
        setDetailsValue('city', result.customer.city);
      } else {
        setExistingCustomer(null);
      }
      setStep(2);
    } catch (e) {
      setError('যাচাইকরণে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setIsLoading(false);
    }
  };

  const onDetailsSubmit = (data: any) => {
    setStep(3);
  };

  const onServiceSubmit = async (serviceData: any) => {
    setIsLoading(true);
    setError(null);

    // Combine all data
    // Note: In a real app we'd maintain a single form state or context, keeping it simple here via getValues or just passing phone + existing ID logic
    const formData = new FormData();
    formData.append('phone', phone);
    
    // If existing, we don't strictly update customer info here (simplified), but we pass it anyway
    // If new, these fields are required
    const detailsValues = { firstName: '', lastName: '', email: '', address: '', city: '' }; // Need to fetch from step 2 form state. 
    // Hack: We can't access step 2 form state easily without context or lifting state. 
    // Solution: Store step 2 data in state when moving to step 3.
    // Let's implement that quickly.
    
    // Instead of full refactor, I'll assume we re-grab from the DOM or better, use a single form for steps 2/3 or just store object.
    // Let's use `detailsData` state.
  };

  // State to hold data between steps
  const [detailsData, setDetailsData] = useState<any>({});

  const onDetailsSubmitWrapper = (data: any) => {
    setDetailsData(data);
    onDetailsSubmit(data);
  };

  const onFinalSubmit = async (serviceData: any) => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('phone', phone);
    
    // Add customer details
    Object.keys(detailsData).forEach(key => formData.append(key, detailsData[key]));
    if (existingCustomer) {
       // Ideally we might want to ensure we don't overwrite blindly, but action handles lookup
       // The action uses phone to look up, so names are ignored if exists, or we could update
    }

    // Add service details
    Object.keys(serviceData).forEach(key => formData.append(key, serviceData[key]));

    try {
        // @ts-ignore
      const result = await submitBooking(null, formData);
      if (result.success) {
        setBookingSuccess(true);
      } else {
        setError(result.error || 'বুকিং ব্যর্থ হয়েছে।');
      }
    } catch (e) {
      setError('অপ্রত্যাশিত ত্রুটি।');
    } finally {
      setIsLoading(false);
    }
  };


  if (bookingSuccess) {
    return (
      <Card className="max-w-md mx-auto text-center py-12">
        <CardContent>
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl mb-2">বুকিং সফল হয়েছে!</CardTitle>
          <CardDescription className="mb-6">
            আপনার অ্যাপয়েন্টমেন্ট নিশ্চিত করা হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
          </CardDescription>
          <Button onClick={() => router.push('/')}>হোম পেজে ফিরে যান</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle>অ্যাপয়েন্টমেন্ট বুক করুন</CardTitle>
        <CardDescription>
          {step === 1 && 'ধাপ ১: আপনার ফোন নম্বর যাচাই করুন'}
          {step === 2 && 'ধাপ ২: ব্যক্তিগত তথ্য'}
          {step === 3 && 'ধাপ ৩: সেবার বিবরণ'}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {/* Step 1: Phone */}
        {step === 1 && (
          <form onSubmit={handleSubmitPhone(onPhoneSubmit)} className="space-y-4">
             <div className="space-y-2">
              <label className="text-sm font-medium">ফোন নম্বর <span className="text-destructive">*</span></label>
              <Input 
                {...registerPhone('phone')}
                placeholder="01XXXXXXXXX"
                error={errorsPhone.phone?.message as string}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
              পরবর্তী
            </Button>
          </form>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <form onSubmit={handleSubmitDetails(onDetailsSubmitWrapper)} className="space-y-4">
            {existingCustomer && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md mb-4 text-sm text-blue-700 dark:text-blue-300">
                স্বাগতম ফিরে আসার জন্য, {existingCustomer.firstName}! আপনার তথ্য স্বয়ংক্রিয়ভাবে পূরণ করা হয়েছে।
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">নাম <span className="text-destructive">*</span></label>
                <Input {...registerDetails('firstName')} error={errorsDetails.firstName?.message as string} disabled={!!existingCustomer} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">বংশনাম <span className="text-destructive">*</span></label>
                <Input {...registerDetails('lastName')} error={errorsDetails.lastName?.message as string} disabled={!!existingCustomer} />
              </div>
            </div>

            <div className="space-y-2">
               <label className="text-sm font-medium">ইমেইল</label>
               <Input {...registerDetails('email')} error={errorsDetails.email?.message as string} disabled={!!existingCustomer} />
            </div>

            <div className="space-y-2">
               <label className="text-sm font-medium">ঠিকানা</label>
               <Input {...registerDetails('address')} disabled={!!existingCustomer} />
            </div>
             <div className="space-y-2">
               <label className="text-sm font-medium">শহর</label>
               <Input {...registerDetails('city')} disabled={!!existingCustomer} />
            </div>

            <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>পেছনে</Button>
                <Button type="submit">পরবর্তী</Button>
            </div>
          </form>
        )}

        {/* Step 3: Service */}
        {step === 3 && (
          <form onSubmit={handleSubmitService(onFinalSubmit)} className="space-y-4">
            
            <div className="grid grid-cols-2 gap-4">
               {/* Vehicle Type Radio/Select */}
               <div className="col-span-2 space-y-2">
                 <label className="text-sm font-medium">যানবাহনের ধরন <span className="text-destructive">*</span></label>
                 <div className="flex gap-4">
                    <label className="flex items-center gap-2 border p-3 rounded-md cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                        <input type="radio" value="CAR" {...registerService('vehicleType')} className="accent-primary" />
                        <Car className="w-5 h-5" /> কার
                    </label>
                    <label className="flex items-center gap-2 border p-3 rounded-md cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                        <input type="radio" value="BIKE" {...registerService('vehicleType')} className="accent-primary" />
                        <Bike className="w-5 h-5" /> বাইক
                    </label>
                 </div>
               </div>

               <div className="col-span-2 md:col-span-1 space-y-2">
                 <label className="text-sm font-medium">মডেল <span className="text-destructive">*</span></label>
                 <Input {...registerService('vehicleModel')} placeholder="Ex: Toyota Corolla, Yamaha R15" error={errorsService.vehicleModel?.message as string} />
               </div>

               <div className="col-span-2 md:col-span-1 space-y-2">
                 <label className="text-sm font-medium">সেবার ধরন <span className="text-destructive">*</span></label>
                 <select {...registerService('serviceType')} className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm">
                    <option value="SERVICING">সার্ভিসিং</option>
                    <option value="ENGINE_WORK">ইঞ্জিন কাজ</option>
                    <option value="WASH">ওয়াশ</option>
                    <option value="PAINT">পেইন্ট</option>
                    <option value="OTHER">অন্যান্য</option>
                 </select>
               </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">সমস্যার বিবরণ <span className="text-destructive">*</span></label>
                <Textarea {...registerService('description')} placeholder="আপনার সমস্যার বিস্তারিত লিখুন..." error={errorsService.description?.message as string} />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">অ্যাপয়েন্টমেন্ট তারিখ (ঐচ্ছিক)</label>
                <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="date" className="pl-9" {...registerService('appointmentDate')} />
                </div>
            </div>

            {error && <p className="text-destructive text-sm">{error}</p>}

            <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={() => setStep(2)} disabled={isLoading}>পেছনে</Button>
                <Button type="submit" disabled={isLoading} variant="action">
                    {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
                    বুকিং নিশ্চিত করুন
                </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
