import { db } from '@/lib/db/client';
import { tickets, customers, users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import TicketStatusBadge from '@/components/tickets/TicketStatusBadge';
import { formatDate, formatRelativeTime } from '@/lib/utils/formatting';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { ArrowLeft, User, Calendar, AlertCircle, Edit, Car, Wrench } from 'lucide-react';

export default async function TicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [ticket] = await db
    .select({
      id: tickets.id,
      title: tickets.title,
      description: tickets.description,
      notes: tickets.notes,
      status: tickets.status,
      priority: tickets.priority,
      createdAt: tickets.createdAt,
      completedAt: tickets.completedAt,
      updatedAt: tickets.updatedAt,
      vehicleType: tickets.vehicleType,
      vehicleModel: tickets.vehicleModel,
      serviceType: tickets.serviceType,
      appointmentDate: tickets.appointmentDate,
      customerName: customers.firstName,
      customerLastName: customers.lastName,
      customerId: customers.id,
      assignedToName: users.firstName,
      assignedToLastName: users.lastName,
    })
    .from(tickets)
    .leftJoin(customers, eq(tickets.customerId, customers.id))
    .leftJoin(users, eq(tickets.assignedTo, users.id))
    .where(eq(tickets.id, id));

  if (!ticket) {
    notFound();
  }

  const priorityVariant = {
    LOW: 'secondary' as const,
    MEDIUM: 'warning' as const,
    HIGH: 'danger' as const,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/tickets">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            ফিরে যান
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-foreground">টিকেট বিস্তারিত</h1>
      </div>
      <div className="flex justify-end">
        <Link href={`/dashboard/tickets/${ticket.id}/edit`}>
            <Button variant="outline" className="gap-2">
            <Edit className="w-4 h-4" />
            সম্পাদনা
            </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl mb-2">{ticket.title}</CardTitle>
              <div className="flex items-center gap-3">
                <TicketStatusBadge status={ticket.status} />
                <Badge variant={priorityVariant[ticket.priority]}>
                  {ticket.priority === 'HIGH' ? 'উচ্চ' : ticket.priority === 'MEDIUM' ? 'মাঝারি' : 'নিম্ন'}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold text-foreground mb-2">বিবরণ</h3>
            <p className="text-muted-foreground whitespace-pre-wrap">{ticket.description}</p>
          </div>

          {ticket.notes && (
            <div>
              <h3 className="font-semibold text-foreground mb-2">নোট</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{ticket.notes}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg">
             <div>
                <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                    <Car className="w-4 h-4" /> যানবহন
                </h3>
                <p className="text-sm">
                    <span className="badge badge-outline mr-2">{ticket.vehicleType}</span>
                    <span className="font-medium">{ticket.vehicleModel}</span>
                </p>
             </div>
             <div>
                <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                    <Wrench className="w-4 h-4" /> সেবা
                </h3>
                 <p className="text-sm">
                    <span className="badge badge-outline mr-2">{ticket.serviceType}</span>
                    {ticket.appointmentDate && (
                         <span className="text-muted-foreground block mt-1 text-xs">
                           অ্যাপয়েন্টমেন্ট: {formatDate(ticket.appointmentDate)}
                         </span>
                    )}
                </p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border">
            <div>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <User className="w-4 h-4" />
                গ্রাহক তথ্য
              </h3>
              <Link href={`/dashboard/customers/${ticket.customerId}`}>
                <p className="text-royal-blue hover:underline">
                  {ticket.customerName} {ticket.customerLastName}
                </p>
              </Link>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                নিয়োজিত কর্মচারী
              </h3>
              <p className="text-muted-foreground">
                {ticket.assignedToName ? `${ticket.assignedToName} ${ticket.assignedToLastName}` : 'নির্ধারিত নয়'}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                তারিখ
              </h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>তৈরি: {formatDate(ticket.createdAt)}</p>
                <p>আপডেট: {formatRelativeTime(ticket.updatedAt)}</p>
                {ticket.completedAt && (
                  <p>সম্পন্ন: {formatDate(ticket.completedAt)}</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
