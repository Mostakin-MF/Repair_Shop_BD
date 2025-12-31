import { db } from '@/lib/db/client';
import { users } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';
import { requireAdmin } from '@/lib/auth/kinde';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils/formatting';
import { Shield, UserX, CheckCircle, AlertTriangle } from 'lucide-react';
import { updateUserRole, toggleUserStatus } from '@/lib/actions/users';


// Client component wrapper for actions
import UserActions from './UserActions';

export default async function AdminPage() {
  await requireAdmin();

  const allUsers = await db
    .select()
    .from(users)
    .orderBy(desc(users.createdAt));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">অ্যাডমিন প্যানেল</h1>
        <p className="text-muted-foreground mt-1">ব্যবহারকারী এবং সিস্টেম সেটিংস পরিচালনা করুন</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ব্যবহারকারী ব্যবস্থাপনা ({allUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ব্যবহারকারী</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ইমেইল</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ভূমিকা</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">অবস্থা</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">শেষ লগইন</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((user) => (
                  <tr key={user.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="font-medium">{user.firstName} {user.lastName}</div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{user.email}</td>
                    <td className="py-3 px-4">
                      <Badge variant={
                        user.role === 'ADMIN' ? 'success' : 
                        user.role === 'MANAGER' ? 'warning' : 'secondary'
                      }>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={user.isActive ? 'default' : 'danger'}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {formatDate(user.lastLoginAt)}
                    </td>
                    <td className="py-3 px-4 text-right">
                       <UserActions user={user} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
