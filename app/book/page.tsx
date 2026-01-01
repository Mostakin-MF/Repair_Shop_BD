import BookingForm from '@/components/booking/BookingForm';

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">অনলাইন অ্যাপয়েন্টমেন্ট বুকিং</h1>
        <p className="text-muted-foreground">আপনার সময় বাঁচাতে অনলাইনে বুকিং দিন</p>
      </div>
      <BookingForm />
    </div>
  );
}
