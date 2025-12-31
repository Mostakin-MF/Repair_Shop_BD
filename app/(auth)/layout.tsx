import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-royal-blue via-sky-blue to-soft-blue p-4">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
