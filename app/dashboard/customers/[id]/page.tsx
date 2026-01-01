import { db } from '@/lib/db/client';
import { customers, tickets } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { formatDate } from '@/lib/utils/formatting';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import TicketStatusBadge from '@/components/tickets/TicketStatusBadge';
import { ArrowLeft, Mail, Phone, MapPin, Edit } from 'lucide-react';

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [customer] = await db
    .select()
    .from(customers)
    .where(eq(customers.id, id));

  if (!customer) {
    notFound();
  }

  const customerTickets = await db
    .select()
    .from(tickets)
    .where(eq(tickets.customerId, id))
    .orderBy(desc(tickets.createdAt));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/customers">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              ফিরে যান
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">গ্রাহক বিস্তারিত</h1>
        </div>
        <Link href={`/dashboard/customers/${customer.id}/edit`}>
          <Button variant="outline" className="gap-2">
            <Edit className="w-4 h-4" />
            সম্পাদনা
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>গ্রাহক তথ্য</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-1">
                {customer.firstName} {customer.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">যোগদানের তারিখ: {formatDate(customer.createdAt)}</p>
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-muted-foreground mt-1" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">ইমেইল</p>
                  <p className="text-sm text-foreground">{customer.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-muted-foreground mt-1" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">ফোন</p>
                  <p className="text-sm text-foreground">{customer.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">ঠিকানা</p>
                  <p className="text-sm text-foreground">
                    {customer.address}<br />
                    {customer.city}, {customer.state} {customer.zipCode}
                  </p>
                </div>
              </div>
            </div>

            {customer.notes && (
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">নোট</p>
                <p className="text-sm text-foreground whitespace-pre-wrap">{customer.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>টিকেট ইতিহাস ({customerTickets.length})</CardTitle>
              <Link href={`/dashboard/tickets/new?customerId=${customer.id}`}>
                <Button size="sm" variant="action">নতুন টিকেট</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {customerTickets.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">এই গ্রাহকের জন্য কোনো টিকেট নেই</p>
                <Link href={`/dashboard/tickets/new?customerId=${customer.id}`}>
                  <Button variant="action" size="sm">প্রথম টিকেট তৈরি করুন</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {customerTickets.map((ticket) => (
                  <Link
                    key={ticket.id}
                    href={`/dashboard/tickets/${ticket.id}`}
                    className="block p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">{ticket.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {ticket.description}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2 ml-4">
                        <TicketStatusBadge status={ticket.status} />
                        <span className="text-xs text-muted-foreground">
                          {formatDate(ticket.createdAt)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
