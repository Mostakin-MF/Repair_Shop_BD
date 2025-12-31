import { ReactNode } from 'react';
import { getAuthUser } from '@/lib/auth/kinde';
import { redirect } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getAuthUser();

  if (!user) {
    redirect('/login');
  }

  if (!user.isActive) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">অ্যাক্সেস নিষিদ্ধ</h1>
          <p className="text-muted-foreground">
            আপনার অ্যাকাউন্ট নিষ্ক্রিয় করা হয়েছে। অনুগ্রহ করে প্রশাসকের সাথে যোগাযোগ করুন।
          </p>
        </div>
      </div>
    );
  }

  const userName = `${user.firstName} ${user.lastName}`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar userRole={user.role} userName={userName} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
