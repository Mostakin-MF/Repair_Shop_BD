import { db } from '@/lib/db/client';
import { tickets, customers } from '@/lib/db/schema';
import { desc, eq, sql, or, ilike } from 'drizzle-orm';
import Link from 'next/link';
import Pagination from '@/components/common/Pagination';
import Search from '@/components/common/Search';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import TicketStatusBadge from '@/components/tickets/TicketStatusBadge';
import { formatRelativeTime } from '@/lib/utils/formatting';
import { Plus } from 'lucide-react';

export default async function TicketsPage({
  searchParams,
}: {
  searchParams?: { page?: string; query?: string };
}) {
  const page = Number(searchParams?.page) || 1;
  const query = searchParams?.query || '';
  const pageSize = 10;
  const offset = (page - 1) * pageSize;

  const [ticketsData] = await Promise.all([
    db
      .select({
        id: tickets.id,
        title: tickets.title,
        description: tickets.description,
        status: tickets.status,
        priority: tickets.priority,
        createdAt: tickets.createdAt,
        customerName: customers.firstName,
        customerLastName: customers.lastName,
      })
      .from(tickets)
      .leftJoin(customers, eq(tickets.customerId, customers.id))
      .where(
        query
          ? or(
              ilike(tickets.title, `%${query}%`),
              ilike(tickets.description, `%${query}%`),
              ilike(customers.firstName, `%${query}%`),
              ilike(customers.lastName, `%${query}%`)
            )
          : undefined
      )
      .orderBy(desc(tickets.createdAt))
      .limit(pageSize)
      .offset(offset),
  ]);

  const countResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(tickets)
    .leftJoin(customers, eq(tickets.customerId, customers.id))
    .where(
      query
        ? or(
            ilike(tickets.title, `%${query}%`),
            ilike(tickets.description, `%${query}%`),
            ilike(customers.firstName, `%${query}%`),
            ilike(customers.lastName, `%${query}%`)
          )
        : undefined
    );
  const totalTickets = Number(countResult[0]?.count) || 0;
  const totalPages = Math.ceil(totalTickets / pageSize);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">টিকেট তালিকা</h1>
          <p className="text-muted-foreground mt-1">সব মেরামত টিকেট দেখুন এবং পরিচালনা করুন</p>
        </div>
        <Link href="/dashboard/tickets/new">
          <Button variant="action" className="gap-2">
            <Plus className="w-4 h-4" />
            নতুন টিকেট
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <Search placeholder="টিকেট খুঁজুন..." />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {ticketsData.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">কোনো টিকেট পাওয়া যায়নি</p>
              <Link href="/dashboard/tickets/new">
                <Button variant="action">প্রথম টিকেট তৈরি করুন</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            {ticketsData.map((ticket) => (
              <Link key={ticket.id} href={`/dashboard/tickets/${ticket.id}`}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {ticket.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {ticket.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-muted-foreground">
                            গ্রাহক: {ticket.customerName} {ticket.customerLastName}
                          </span>
                          <span className="text-muted-foreground">
                            {formatRelativeTime(ticket.createdAt)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <TicketStatusBadge status={ticket.status} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
            
            <Pagination 
              currentPage={page} 
              totalPages={totalPages} 
              baseUrl="/dashboard/tickets" 
              searchParams={searchParams}
            />
          </>
        )}
      </div>
    </div>
  );
}
