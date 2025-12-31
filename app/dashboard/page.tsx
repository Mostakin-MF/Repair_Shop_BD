import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Ticket, Users, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { db } from '@/lib/db/client';
import { tickets, customers } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { formatRelativeTime } from '@/lib/utils/formatting';
import TicketStatusBadge from '@/components/tickets/TicketStatusBadge';

export default async function DashboardPage() {
  try {
    // Fetch stats
    const allTickets = await db.select().from(tickets);
    const openTickets = allTickets.filter(t => t.status === 'OPEN');
    const completedToday = allTickets.filter(t => {
      if (!t.completedAt) return false;
      const today = new Date();
      const completed = new Date(t.completedAt);
      return completed.toDateString() === today.toDateString();
    });

    const allCustomers = await db.select().from(customers);

    // Fetch recent tickets with customer info
    const recentTickets = await db
      .select({
        id: tickets.id,
        title: tickets.title,
        status: tickets.status,
        priority: tickets.priority,
      createdAt: tickets.createdAt,
      customerName: customers.firstName,
      customerLastName: customers.lastName,
    })
    .from(tickets)
    .leftJoin(customers, eq(tickets.customerId, customers.id))
    .orderBy(desc(tickets.createdAt))
    .limit(5);

  const stats = [
    {
      title: 'মোট টিকেট',
      value: allTickets.length,
      icon: Ticket,
      color: 'text-royal-blue',
      bgColor: 'bg-royal-blue/10',
    },
    {
      title: 'খোলা টিকেট',
      value: openTickets.length,
      icon: Clock,
      color: 'text-service-yellow',
      bgColor: 'bg-service-yellow/10',
    },
    {
      title: 'আজ সম্পন্ন',
      value: completedToday.length,
      icon: CheckCircle,
      color: 'text-emerald-green',
      bgColor: 'bg-emerald-green/10',
    },
    {
      title: 'মোট গ্রাহক',
      value: allCustomers.length,
      icon: Users,
      color: 'text-sky-blue',
      bgColor: 'bg-sky-blue/10',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">ড্যাশবোর্ড</h1>
          <p className="text-muted-foreground mt-1">আপনার কাজের সংক্ষিপ্ত বিবরণ</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/tickets/new">
            <Button variant="action">নতুন টিকেট</Button>
          </Link>
          <Link href="/dashboard/customers/new">
            <Button variant="outline">নতুন গ্রাহক</Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Tickets */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>সাম্প্রতিক টিকেট</CardTitle>
            <Link href="/dashboard/tickets">
              <Button variant="outline" size="sm">সব দেখুন</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {recentTickets.length === 0 ? (
            <div className="text-center py-12">
              <Ticket className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">কোনো টিকেট নেই</p>
              <Link href="/dashboard/tickets/new" className="inline-block mt-4">
                <Button variant="action" size="sm">প্রথম টিকেট তৈরি করুন</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentTickets.map((ticket) => (
                <Link
                  key={ticket.id}
                  href={`/dashboard/tickets/${ticket.id}`}
                  className="block p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">{ticket.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {ticket.customerName} {ticket.customerLastName}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <TicketStatusBadge status={ticket.status} />
                      <span className="text-xs text-muted-foreground">
                        {formatRelativeTime(ticket.createdAt)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>দ্রুত কাজ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/dashboard/tickets">
              <div className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
                <Ticket className="w-8 h-8 text-royal-blue mb-2" />
                <h4 className="font-semibold text-foreground mb-1">টিকেট পরিচালনা</h4>
                <p className="text-sm text-muted-foreground">সব টিকেট দেখুন এবং পরিচালনা করুন</p>
              </div>
            </Link>
            <Link href="/dashboard/customers">
              <div className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
                <Users className="w-8 h-8 text-emerald-green mb-2" />
                <h4 className="font-semibold text-foreground mb-1">গ্রাহক তালিকা</h4>
                <p className="text-sm text-muted-foreground">সব গ্রাহক দেখুন এবং অনুসন্ধান করুন</p>
              </div>
            </Link>
            <Link href="/dashboard/profile">
              <div className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
                <CheckCircle className="w-8 h-8 text-service-yellow mb-2" />
                <h4 className="font-semibold text-foreground mb-1">প্রোফাইল</h4>
                <p className="text-sm text-muted-foreground">আপনার প্রোফাইল দেখুন এবং আপডেট করুন</p>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
  } catch (error) {
    console.error('Dashboard error:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">ত্রুটি ঘটেছে</h1>
          <p className="text-muted-foreground mb-4">
            {error instanceof Error ? error.message : 'অজানা ত্রুটি'}
          </p>
          <Link href="/login">
            <Button variant="action">লগইন পৃষ্ঠায় ফিরুন</Button>
          </Link>
        </div>
      </div>
    );
  }
}
