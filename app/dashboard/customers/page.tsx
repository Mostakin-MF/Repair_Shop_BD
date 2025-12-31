import { db } from '@/lib/db/client';
import { customers } from '@/lib/db/schema';
import { desc, sql, or, ilike } from 'drizzle-orm';
import Link from 'next/link';
import Pagination from '@/components/common/Pagination';
import Search from '@/components/common/Search';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Mail, Phone, MapPin, Plus } from 'lucide-react';

export default async function CustomersPage({
  searchParams,
}: {
  searchParams?: { page?: string; query?: string };
}) {
  const page = Number(searchParams?.page) || 1;
  const query = searchParams?.query || '';
  const pageSize = 10;
  const offset = (page - 1) * pageSize;

  const [customersData] = await Promise.all([
    db
      .select()
      .from(customers)
      .where(
        query
          ? or(
              ilike(customers.firstName, `%${query}%`),
              ilike(customers.lastName, `%${query}%`),
              ilike(customers.email, `%${query}%`),
              ilike(customers.phone, `%${query}%`)
            )
          : undefined
      )
      .orderBy(desc(customers.createdAt))
      .limit(pageSize)
      .offset(offset),
  ]);

  const countResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(customers)
    .where(
        query
          ? or(
              ilike(customers.firstName, `%${query}%`),
              ilike(customers.lastName, `%${query}%`),
              ilike(customers.email, `%${query}%`),
              ilike(customers.phone, `%${query}%`)
            )
          : undefined
      );
  const totalCustomers = Number(countResult[0]?.count) || 0;
  const totalPages = Math.ceil(totalCustomers / pageSize);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">গ্রাহক তালিকা</h1>
          <p className="text-muted-foreground mt-1">সব গ্রাহক দেখুন এবং পরিচালনা করুন</p>
        </div>
        <Link href="/dashboard/customers/new">
          <Button variant="action" className="gap-2">
            <Plus className="w-4 h-4" />
            নতুন গ্রাহক
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <Search placeholder="গ্রাহক খুঁজুন..." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customersData.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">কোনো গ্রাহক পাওয়া যায়নি</p>
              <Link href="/dashboard/customers/new">
                <Button variant="action">প্রথম গ্রাহক যোগ করুন</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            {customersData.map((customer) => (
              <Link key={customer.id} href={`/dashboard/customers/${customer.id}`}>
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-4">
                      {customer.firstName} {customer.lastName}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <span className="truncate">{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <span>{customer.phone}</span>
                      </div>
                      <div className="flex items-start gap-3 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mt-0.5" />
                        <span className="line-clamp-2">
                          {customer.address}, {customer.city}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
            
            <div className="col-span-full">
              <Pagination 
                currentPage={page} 
                totalPages={totalPages} 
                baseUrl="/dashboard/customers" 
                searchParams={searchParams}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
