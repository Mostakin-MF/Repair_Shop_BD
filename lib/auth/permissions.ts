import { User, Ticket } from '../db/schema';
import { PERMISSIONS, Action, Resource, UserRole } from '../utils/constants';

export function hasPermission(
    user: User,
    action: Action,
    resource: Resource
): boolean {
    const rolePermissions = PERMISSIONS[user.role as UserRole];
    if (!rolePermissions) {
        return false;
    }

    const resourcePermissions = rolePermissions[resource] as readonly string[];
    return resourcePermissions.includes(action);
}

export function canEditTicket(user: User, ticket: Ticket): boolean {
    // Admins and managers can edit all tickets
    if (user.role === 'ADMIN' || user.role === 'MANAGER') {
        return true;
    }

    // Employees can only edit tickets assigned to them
    if (user.role === 'EMPLOYEE') {
        return ticket.assignedTo === user.id;
    }

    return false;
}

export function canCompleteTicket(user: User, ticket: Ticket): boolean {
    // Admins and managers can complete any ticket
    if (user.role === 'ADMIN' || user.role === 'MANAGER') {
        return true;
    }

    // Employees can complete tickets assigned to them
    if (user.role === 'EMPLOYEE') {
        return ticket.assignedTo === user.id;
    }

    return false;
}

export function canAccessAdmin(user: User): boolean {
    return user.role === 'ADMIN';
}

export function canManageUsers(user: User): boolean {
    return user.role === 'ADMIN';
}

export function canDeleteTicket(user: User): boolean {
    return user.role === 'ADMIN' || user.role === 'MANAGER';
}

export function canDeleteCustomer(user: User): boolean {
    return user.role === 'ADMIN' || user.role === 'MANAGER';
}
