import { pgTable, uuid, varchar, text, timestamp, boolean, pgEnum, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['EMPLOYEE', 'MANAGER', 'ADMIN']);
export const ticketStatusEnum = pgEnum('ticket_status', ['OPEN', 'COMPLETED']);
export const priorityEnum = pgEnum('priority', ['LOW', 'MEDIUM', 'HIGH']);

// Users Table
export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    kindeId: varchar('kinde_id', { length: 255 }).notNull().unique(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    firstName: varchar('first_name', { length: 100 }).notNull(),
    lastName: varchar('last_name', { length: 100 }).notNull(),
    profileImageUrl: varchar('profile_image_url', { length: 500 }),
    role: userRoleEnum('role').notNull().default('EMPLOYEE'),
    isActive: boolean('is_active').notNull().default(true),
    lastLoginAt: timestamp('last_login_at'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Customers Table
export const customers = pgTable('customers', {
    id: uuid('id').defaultRandom().primaryKey(),
    firstName: varchar('first_name', { length: 100 }).notNull(),
    lastName: varchar('last_name', { length: 100 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    phone: varchar('phone', { length: 20 }).notNull(),
    address: varchar('address', { length: 500 }).notNull(),
    city: varchar('city', { length: 100 }).notNull(),
    state: varchar('state', { length: 100 }),
    zipCode: varchar('zip_code', { length: 20 }),
    notes: text('notes'),
    createdBy: uuid('created_by').notNull().references(() => users.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Tickets Table
export const tickets = pgTable('tickets', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description').notNull(),
    notes: text('notes'),
    status: ticketStatusEnum('status').notNull().default('OPEN'),
    customerId: uuid('customer_id').notNull().references(() => customers.id, { onDelete: 'cascade' }),
    assignedTo: uuid('assigned_to').references(() => users.id),
    priority: priorityEnum('priority').notNull().default('MEDIUM'),
    createdBy: uuid('created_by').notNull().references(() => users.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    completedAt: timestamp('completed_at'),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Audit Logs Table
export const auditLogs = pgTable('audit_logs', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id),
    action: varchar('action', { length: 100 }).notNull(),
    entity: varchar('entity', { length: 50 }).notNull(),
    entityId: varchar('entity_id', { length: 255 }).notNull(),
    changes: jsonb('changes'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
    createdCustomers: many(customers, { relationName: 'createdBy' }),
    createdTickets: many(tickets, { relationName: 'createdBy' }),
    assignedTickets: many(tickets, { relationName: 'assignedTo' }),
    auditLogs: many(auditLogs),
}));

export const customersRelations = relations(customers, ({ one, many }) => ({
    createdBy: one(users, {
        fields: [customers.createdBy],
        references: [users.id],
        relationName: 'createdBy',
    }),
    tickets: many(tickets),
}));

export const ticketsRelations = relations(tickets, ({ one }) => ({
    customer: one(customers, {
        fields: [tickets.customerId],
        references: [customers.id],
    }),
    assignedTo: one(users, {
        fields: [tickets.assignedTo],
        references: [users.id],
        relationName: 'assignedTo',
    }),
    createdBy: one(users, {
        fields: [tickets.createdBy],
        references: [users.id],
        relationName: 'createdBy',
    }),
}));

export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
    user: one(users, {
        fields: [auditLogs.userId],
        references: [users.id],
    }),
}));

// Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Customer = typeof customers.$inferSelect;
export type NewCustomer = typeof customers.$inferInsert;

export type Ticket = typeof tickets.$inferSelect;
export type NewTicket = typeof tickets.$inferInsert;

export type AuditLog = typeof auditLogs.$inferSelect;
export type NewAuditLog = typeof auditLogs.$inferInsert;
