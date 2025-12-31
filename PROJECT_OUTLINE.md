# Repair Shop App - Project Outline
## Next.js 15 & React 19 Full Stack Application

---

## 1. Tech Stack Overview

### Frontend
- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **Component Library**: ShadCN/ui
- **Language**: TypeScript
- **Form Management**: React Hook Form + Zod validation
- **State Management**: TanStack Query (React Query) + Zustand
- **Date/Time**: date-fns
- **Icons**: Lucide React

### Backend
- **API**: Next.js API Routes (Route Handlers)
- **ORM**: Drizzle ORM
- **Database**: Neon PostgreSQL
- **Authentication**: Kinde Auth
- **Error Tracking**: Sentry
- **Email**: Resend (for notifications)
- **Rate Limiting**: Upstash Redis (optional)

### DevOps & Tools
- **Deployment**: Vercel
- **Version Control**: Git
- **Environment Variables**: .env.local
- **Database Migrations**: Drizzle Kit
- **Testing**: Vitest + React Testing Library (optional)
- **Linting**: ESLint + Prettier

---

## 2. Project Structure

```
repair-shop-app/
├── app/
│   ├── (auth)/                          # Auth group layout
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── callback/
│   │   │   └── route.ts
│   │   └── layout.tsx
│   │
│   ├── (dashboard)/                     # Protected dashboard routes
│   │   ├── layout.tsx
│   │   ├── page.tsx                     # Dashboard home
│   │   ├── tickets/
│   │   │   ├── page.tsx                 # Tickets list
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx             # Ticket detail
│   │   │   │   └── edit/
│   │   │   │       └── page.tsx
│   │   │   └── new/
│   │   │       └── page.tsx
│   │   ├── customers/
│   │   │   ├── page.tsx                 # Customers list
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx             # Customer detail
│   │   │   │   └── edit/
│   │   │   │       └── page.tsx
│   │   │   └── new/
│   │   │       └── page.tsx
│   │   ├── admin/                       # Admin only
│   │   │   ├── page.tsx
│   │   │   ├── employees/
│   │   │   │   └── page.tsx
│   │   │   ├── users/
│   │   │   │   └── page.tsx
│   │   │   └── settings/
│   │   │       └── page.tsx
│   │   └── profile/
│   │       └── page.tsx
│   │
│   ├── public/                          # Public facing pages
│   │   ├── page.tsx                     # Home/Landing page
│   │   └── contact/
│   │       └── page.tsx
│   │
│   ├── api/
│   │   ├── auth/
│   │   │   ├── callback/
│   │   │   │   └── route.ts
│   │   │   └── logout/
│   │   │       └── route.ts
│   │   │
│   │   ├── tickets/
│   │   │   ├── route.ts                 # GET (list), POST (create)
│   │   │   └── [id]/
│   │   │       ├── route.ts             # GET, PUT (update), DELETE
│   │   │       └── complete/
│   │   │           └── route.ts
│   │   │
│   │   ├── customers/
│   │   │   ├── route.ts                 # GET (list), POST (create)
│   │   │   └── [id]/
│   │   │       ├── route.ts             # GET, PUT (update), DELETE
│   │   │       └── search/
│   │   │           └── route.ts
│   │   │
│   │   ├── admin/
│   │   │   ├── users/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts         # Disable user access
│   │   │   ├── employees/
│   │   │   │   └── route.ts
│   │   │   └── stats/
│   │   │       └── route.ts
│   │   │
│   │   ├── search/
│   │   │   └── route.ts                 # Global search (customers & tickets)
│   │   │
│   │   └── webhooks/
│   │       └── kinde/
│   │           └── route.ts             # Kinde webhook for user sync
│   │
│   ├── layout.tsx                       # Root layout
│   ├── page.tsx                         # Redirect to public or dashboard
│   └── error.tsx                        # Error boundary
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── MobileNav.tsx
│   │
│   ├── dashboard/
│   │   ├── StatsCard.tsx
│   │   ├── RecentTickets.tsx
│   │   ├── RecentCustomers.tsx
│   │   └── ActivityFeed.tsx
│   │
│   ├── tickets/
│   │   ├── TicketList.tsx
│   │   ├── TicketCard.tsx
│   │   ├── TicketForm.tsx
│   │   ├── TicketDetail.tsx
│   │   ├── TicketStatusBadge.tsx
│   │   └── TicketFilters.tsx
│   │
│   ├── customers/
│   │   ├── CustomerList.tsx
│   │   ├── CustomerCard.tsx
│   │   ├── CustomerForm.tsx
│   │   ├── CustomerDetail.tsx
│   │   └── CustomerSearch.tsx
│   │
│   ├── admin/
│   │   ├── UserManagement.tsx
│   │   ├── EmployeeManagement.tsx
│   │   ├── PermissionsTable.tsx
│   │   └── SystemSettings.tsx
│   │
│   ├── common/
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── ConfirmDialog.tsx
│   │   ├── SearchBar.tsx
│   │   └── Pagination.tsx
│   │
│   └── auth/
│       ├── LoginForm.tsx
│       ├── ProtectedRoute.tsx
│       └── RoleGuard.tsx
│
├── lib/
│   ├── db/
│   │   ├── schema.ts                    # Drizzle schema
│   │   ├── client.ts                    # Database client
│   │   └── seed.ts                      # Seed data
│   │
│   ├── auth/
│   │   ├── kinde.ts                     # Kinde client config
│   │   ├── middleware.ts                # Auth middleware
│   │   ├── session.ts                   # Session utils
│   │   └── permissions.ts               # Permission checks
│   │
│   ├── utils/
│   │   ├── api.ts                       # API helpers
│   │   ├── validation.ts                # Zod schemas
│   │   ├── formatting.ts                # Date, currency formatters
│   │   └── constants.ts                 # App constants
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useTickets.ts
│   │   ├── useCustomers.ts
│   │   ├── useTheme.ts
│   │   └── useDebounce.ts
│   │
│   ├── actions/
│   │   ├── tickets.ts                   # Server actions for tickets
│   │   ├── customers.ts                 # Server actions for customers
│   │   ├── users.ts                     # Server actions for users
│   │   └── admin.ts                     # Server actions for admin
│   │
│   └── sentry/
│       └── config.ts                    # Sentry configuration
│
├── styles/
│   ├── globals.css
│   └── variables.css
│
├── public/
│   ├── favicon.ico
│   ├── logo.svg
│   └── images/
│
├── middleware.ts                        # Next.js middleware for auth
├── sentry.client.config.ts              # Sentry client config
├── sentry.server.config.ts              # Sentry server config
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── drizzle.config.ts
├── package.json
├── .env.local.example
└── README.md
```

---

## 3. Database Schema (Drizzle ORM)

### Tables

#### `users`
- `id` (UUID, PK)
- `kindeId` (String, unique)
- `email` (String, unique)
- `firstName` (String)
- `lastName` (String)
- `profileImageUrl` (String, nullable)
- `role` (Enum: EMPLOYEE, MANAGER, ADMIN)
- `isActive` (Boolean)
- `lastLoginAt` (DateTime)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

#### `customers`
- `id` (UUID, PK)
- `firstName` (String)
- `lastName` (String)
- `email` (String)
- `phone` (String)
- `address` (String)
- `city` (String)
- `state` (String)
- `zipCode` (String)
- `notes` (Text, nullable)
- `createdBy` (UUID, FK → users)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

#### `tickets`
- `id` (UUID, PK)
- `title` (String)
- `description` (Text)
- `notes` (Text, nullable)
- `status` (Enum: OPEN, COMPLETED)
- `customerId` (UUID, FK → customers)
- `assignedTo` (UUID, FK → users, nullable)
- `priority` (Enum: LOW, MEDIUM, HIGH)
- `createdBy` (UUID, FK → users)
- `createdAt` (DateTime)
- `completedAt` (DateTime, nullable)
- `updatedAt` (DateTime)

#### `audit_logs`
- `id` (UUID, PK)
- `userId` (UUID, FK → users)
- `action` (String)
- `entity` (String)
- `entityId` (String)
- `changes` (JSON)
- `createdAt` (DateTime)

---

## 4. Authentication & Authorization

### Kinde Auth Integration
- **Login Method**: OAuth via Kinde
- **Session Management**: Kinde session token
- **Role-Based Access Control (RBAC)**:
  - **EMPLOYEE**: Can create/view tickets, create/edit/view customers, edit only assigned tickets
  - **MANAGER**: Can create/view/edit all tickets, create/edit/view customers, view employees
  - **ADMIN**: Full access including user management and system settings

### Weekly Login Requirement
- Track `lastLoginAt` in users table
- Middleware checks if last login > 7 days
- Redirect to login if expired
- Implement session refresh mechanism

### Quick Access Removal
- Admin can immediately deactivate user (`isActive = false`)
- Invalidate all active sessions immediately
- Use Kinde webhook to sync changes

---

## 5. Key Features Implementation

### 5.1 Dashboard
- **Stats Card**: Total tickets, open tickets, completed today, pending assignments
- **Real-time Updates**: TanStack Query with polling
- **Activity Feed**: Recent tickets and customer changes
- **Quick Actions**: New ticket, new customer, search

### 5.2 Ticket Management
- **List View**: Filterable by status, priority, assigned to, customer
- **Search**: Full-text search on title, description, customer name
- **Detail View**: Full ticket info, notes, assignment, status
- **Create/Edit**: Form with validation, customer selector, assignment
- **Bulk Actions**: Mark complete, reassign, delete
- **Real-time Status**: WebSocket or polling updates

### 5.3 Customer Management
- **List View**: Sortable, searchable, paginated
- **Detail View**: Customer info, all associated tickets, contact history
- **Create/Edit**: Form with address validation
- **Search**: Global search across all customers
- **Export**: CSV export of customer list (admin only)

### 5.4 Admin Panel
- **User Management**: List, disable, change roles
- **Employee Management**: View performance metrics
- **System Settings**: App configuration, theme settings
- **Audit Logs**: Track all changes

### 5.5 Theme & Responsive Design
- **Dark/Light Mode**: TailwindCSS built-in, Zustand state management
- **Responsive**: Mobile-first, priority on desktop (1920x1080, 2560x1440)
- **Tablet Support**: iPad breakpoints optimized
- **Accessibility**: WCAG 2.1 AA compliance with ShadCN/ui

---

## 6. API Routes & Actions

### Tickets API
- `GET /api/tickets` - List all (with filters, search)
- `POST /api/tickets` - Create ticket
- `GET /api/tickets/[id]` - Get ticket detail
- `PUT /api/tickets/[id]` - Update ticket
- `DELETE /api/tickets/[id]` - Delete ticket
- `POST /api/tickets/[id]/complete` - Mark complete

### Customers API
- `GET /api/customers` - List all
- `POST /api/customers` - Create customer
- `GET /api/customers/[id]` - Get customer detail
- `PUT /api/customers/[id]` - Update customer
- `DELETE /api/customers/[id]` - Delete customer
- `GET /api/customers/search` - Search customers

### Admin API
- `GET /api/admin/users` - List all users
- `PUT /api/admin/users/[id]` - Update user role
- `DELETE /api/admin/users/[id]` - Deactivate user
- `GET /api/admin/stats` - System statistics
- `GET /api/admin/audit-logs` - Audit trail

### Search API
- `GET /api/search` - Global search (customers + tickets)

---

## 7. Server Actions (Next.js)

For simplified data mutations without explicit API routes:
- `createTicket(data)`
- `updateTicket(id, data)`
- `completeTicket(id)`
- `createCustomer(data)`
- `updateCustomer(id, data)`
- `updateUserRole(userId, newRole)` - Admin only
- `disableUser(userId)` - Admin only

---

## 8. Validation & Error Handling

### Zod Schemas
- `TicketSchema` - Validation for ticket creation/update
- `CustomerSchema` - Validation for customer data
- `UserSchema` - Validation for user management
- `LoginSchema` - Validation for auth

### Error Handling
- Global error boundary with Sentry integration
- Specific error pages for 404, 500
- Toast notifications for user feedback
- API error responses with proper HTTP status codes

---

## 9. Performance Optimizations

- **Image Optimization**: Next.js Image component
- **Code Splitting**: Dynamic imports for heavy components
- **Caching**: Next.js ISR + TanStack Query cache strategies
- **Database Indexing**: Composite indexes on frequently queried columns
- **Pagination**: Server-side pagination for lists
- **Debouncing**: Search and auto-save operations
- **Lazy Loading**: Modals, tables, complex components

---

## 10. Security Measures

- **Authentication**: Kinde OAuth 2.0
- **Authorization**: Role-based access control (RBAC)
- **CSRF Protection**: Next.js built-in
- **XSS Protection**: React built-in + CSP headers
- **SQL Injection**: Drizzle ORM parameterized queries
- **Rate Limiting**: Implement on sensitive endpoints
- **Audit Logging**: Track all user actions
- **Environment Variables**: Secure secrets management

---

## 11. Monitoring & Analytics

- **Sentry**: Error tracking and performance monitoring
- **Vercel Analytics**: Page performance metrics
- **Custom Dashboards**: User activity, system health
- **Logs**: Server logs via Vercel or external service

---

## 12. Deployment Strategy

### Development
```bash
npm run dev
# Local database via Neon
```

### Production
- **Hosting**: Vercel
- **Database**: Neon PostgreSQL
- **CI/CD**: GitHub Actions
- **Environment**: Separate dev, staging, production

### Pre-deployment Checklist
- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Sentry project created
- [ ] Kinde OAuth configured
- [ ] CDN configured (optional)

---

## 13. Development Roadmap

### Phase 1: Setup & Auth (Week 1)
- [ ] Initialize Next.js 15 project
- [ ] Configure TypeScript & Tailwind CSS
- [ ] Setup Kinde authentication
- [ ] Create database schema
- [ ] Implement login/logout flow
- [ ] Setup Sentry

### Phase 2: Core Features (Weeks 2-3)
- [ ] Dashboard page
- [ ] Ticket management (CRUD)
- [ ] Customer management (CRUD)
- [ ] Search functionality
- [ ] Role-based permissions

### Phase 3: Advanced Features (Week 4)
- [ ] Admin panel
- [ ] Audit logging
- [ ] Weekly login check
- [ ] Quick access removal
- [ ] Bulk actions

### Phase 4: Polish & Deploy (Week 5)
- [ ] Dark/Light mode
- [ ] Mobile optimization
- [ ] Performance testing
- [ ] Security audit
- [ ] Production deployment

---

## 14. Dependencies Summary

### Core
```json
{
  "next": "^15.0.0",
  "react": "^19.0.0",
  "typescript": "^5.3.0"
}
```

### UI & Styling
```json
{
  "tailwindcss": "^3.3.0",
  "@shadcn/ui": "latest",
  "lucide-react": "latest",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.0.0"
}
```

### Database & Auth
```json
{
  "drizzle-orm": "latest",
  "drizzle-kit": "latest",
  "postgres": "latest",
  "@kinde-oss/kinde-auth-nextjs": "latest",
  "uuid": "latest"
}
```

### State & Data
```json
{
  "@tanstack/react-query": "^5.0.0",
  "zustand": "^4.4.0",
  "react-hook-form": "^7.48.0",
  "zod": "^3.22.0"
}
```

### Utilities
```json
{
  "date-fns": "^2.30.0",
  "@sentry/nextjs": "latest"
}
```

---

## 15. Quick Start Commands

```bash
# Create project
npx create-next-app@latest repair-shop-app --typescript --tailwind --shadcn-ui

# Install dependencies
npm install

# Setup environment
cp .env.local.example .env.local
# Configure Neon, Kinde, Sentry in .env.local

# Generate database client
npm run db:generate

# Run migrations
npm run db:migrate

# Start development
npm run dev

# Open http://localhost:3000
```

---

## 16. Testing Strategy

- **Unit Tests**: Components, utilities, helpers
- **Integration Tests**: API routes, database operations
- **E2E Tests**: Critical user journeys (login, create ticket, etc.)
- **Tools**: Vitest, React Testing Library, Playwright (optional)

---

## Notes

- All user stories are addressed in this outline
- Architecture follows Next.js 15 best practices
- Focus on performance, security, and user experience
- Scale ready with proper database indexing and caching
- Error tracking and monitoring built-in from day one
