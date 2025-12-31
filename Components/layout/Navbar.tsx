'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import Button from '@/components/ui/Button';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { Zap, LayoutDashboard, Ticket, Users, Settings, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  userRole?: string;
  userName?: string;
}

export default function Navbar({ userRole, userName }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'ড্যাশবোর্ড' },
    { href: '/dashboard/tickets', icon: Ticket, label: 'টিকেট' },
    { href: '/dashboard/customers', icon: Users, label: 'গ্রাহক' },
  ];

  if (userRole === 'ADMIN') {
    navItems.push({ href: '/dashboard/admin', icon: Settings, label: 'অ্যাডমিন' });
  }

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-royal-blue/10 rounded-lg flex items-center justify-center group-hover:bg-royal-blue/20 transition-colors">
              <Zap className="w-6 h-6 text-royal-blue" />
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:block">
              RepairShop
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-royal-blue text-white'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            {userName && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-muted rounded-lg">
                <div className="w-8 h-8 bg-royal-blue/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-royal-blue">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium text-foreground">{userName}</span>
              </div>
            )}

            <LogoutLink>
              <Button variant="outline" size="sm" className="hidden md:flex gap-2">
                <LogOut className="w-4 h-4" />
                <span>লগআউট</span>
              </Button>
            </LogoutLink>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-royal-blue text-white'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
            <div className="pt-4 border-t border-border">
              <LogoutLink>
                <button className="flex items-center gap-3 px-4 py-3 w-full text-left text-muted-foreground hover:bg-muted rounded-lg">
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">লগআউট</span>
                </button>
              </LogoutLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
