import { getAuthUser } from '@/lib/auth/kinde';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { formatDate } from '@/lib/utils/formatting';
import { Badge } from '@/components/ui/Badge';
import { User, Mail, Shield, Calendar } from 'lucide-react';

export default async function ProfilePage() {
  const user = await getAuthUser();

  if (!user) {
    return null;
  }

  const roleLabels = {
    EMPLOYEE: 'কর্মচারী',
    MANAGER: 'ম্যানেজার',
    ADMIN: 'প্রশাসক',
  };

  const roleVariant = {
    EMPLOYEE: 'secondary' as const,
    MANAGER: 'warning' as const,
    ADMIN: 'success' as const,
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">আমার প্রোফাইল</h1>
        <p className="text-muted-foreground mt-1">আপনার অ্যাকাউন্ট তথ্য দেখুন</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-royal-blue/10 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-royal-blue" />
            </div>
            <div>
              <CardTitle className="text-2xl">
                {user.firstName} {user.lastName}
              </CardTitle>
              <Badge variant={roleVariant[user.role as keyof typeof roleVariant]} className="mt-2">
                <Shield className="w-3 h-3 mr-1" />
                {roleLabels[user.role as keyof typeof roleLabels]}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm font-medium text-muted-foreground">ইমেইল</p>
              </div>
              <p className="text-foreground">{user.email}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm font-medium text-muted-foreground">যোগদানের তারিখ</p>
              </div>
              <p className="text-foreground">{formatDate(user.createdAt)}</p>
            </div>

            {user.lastLoginAt && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm font-medium text-muted-foreground">শেষ লগইন</p>
                </div>
                <p className="text-foreground">{formatDate(user.lastLoginAt)}</p>
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm font-medium text-muted-foreground">অ্যাকাউন্ট স্থিতি</p>
              </div>
              <Badge variant={user.isActive ? 'success' : 'danger'}>
                {user.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
