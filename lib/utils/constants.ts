export const USER_ROLES = {
    EMPLOYEE: 'EMPLOYEE',
    MANAGER: 'MANAGER',
    ADMIN: 'ADMIN',
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

export const TICKET_STATUS = {
    OPEN: 'OPEN',
    COMPLETED: 'COMPLETED',
} as const;

export type TicketStatus = typeof TICKET_STATUS[keyof typeof TICKET_STATUS];

export const PRIORITY = {
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    HIGH: 'HIGH',
} as const;

export type Priority = typeof PRIORITY[keyof typeof PRIORITY];

// Permission action types
export const ACTIONS = {
    CREATE: 'CREATE',
    READ: 'READ',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    COMPLETE: 'COMPLETE',
} as const;

export type Action = typeof ACTIONS[keyof typeof ACTIONS];

// Resource types
export const RESOURCES = {
    TICKET: 'ticket',
    CUSTOMER: 'customer',
    USER: 'user',
    ADMIN: 'admin',
} as const;

export type Resource = typeof RESOURCES[keyof typeof RESOURCES];

// Permission matrices
export const PERMISSIONS = {
    EMPLOYEE: {
        ticket: ['CREATE', 'READ', 'UPDATE'], // Can only update assigned tickets
        customer: ['CREATE', 'READ', 'UPDATE'],
        user: ['READ'], // Can only read own profile
        admin: [],
    },
    MANAGER: {
        ticket: ['CREATE', 'READ', 'UPDATE', 'DELETE', 'COMPLETE'],
        customer: ['CREATE', 'READ', 'UPDATE', 'DELETE'],
        user: ['READ'], // Can view employees
        admin: [],
    },
    ADMIN: {
        ticket: ['CREATE', 'READ', 'UPDATE', 'DELETE', 'COMPLETE'],
        customer: ['CREATE', 'READ', 'UPDATE', 'DELETE'],
        user: ['CREATE', 'READ', 'UPDATE', 'DELETE'],
        admin: ['CREATE', 'READ', 'UPDATE', 'DELETE'],
    },
} as const;

// Maximum days between logins
export const MAX_DAYS_BETWEEN_LOGINS = 7;

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// Search debounce delay (ms)
export const SEARCH_DEBOUNCE_MS = 300;
