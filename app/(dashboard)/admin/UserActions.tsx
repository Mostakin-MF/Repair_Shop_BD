'use client';

import Button from '@/components/ui/Button';
import { updateUserRole, toggleUserStatus } from '@/lib/actions/users';
import { User } from '@/lib/db/schema';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UserActions({ user }: { user: User }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRoleChange = async (newRole: string) => {
    if(!confirm(`Are you sure you want to change ${user.firstName}'s role to ${newRole}?`)) return;
    setLoading(true);
    await updateUserRole(user.id, newRole);
    setLoading(false);
    router.refresh();
  };

  const handleStatusToggle = async () => {
    const action = user.isActive ? 'deactivate' : 'activate';
    if(!confirm(`Are you sure you want to ${action} ${user.firstName}?`)) return;
    setLoading(true);
    await toggleUserStatus(user.id, !user.isActive);
    setLoading(false);
    router.refresh();
  };

  if (loading) return <Loader2 className="w-4 h-4 animate-spin ml-auto" />;

  return (
    <div className="flex justify-end gap-2">
      <select 
        className="h-8 rounded-md border border-border bg-background px-2 text-xs"
        value={user.role}
        onChange={(e) => handleRoleChange(e.target.value)}
        disabled={loading}
      >
        <option value="EMPLOYEE">Employee</option>
        <option value="MANAGER">Manager</option>
        <option value="ADMIN">Admin</option>
      </select>
      
      <Button 
        variant={user.isActive ? 'danger' : 'success'} 
        size="sm" 
        onClick={handleStatusToggle}
        disabled={loading}
        className="h-8 text-xs bg-opacity-90"
      >
        {user.isActive ? 'Disable' : 'Enable'}
      </Button>
    </div>
  );
}
