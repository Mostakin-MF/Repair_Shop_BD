# Repair Shop BD - Setup Instructions

## Quick Start

### 1. Install Dependencies

Already done! Dependencies were installed during setup.

```bash
npm install
```

### 2. Setup External Services

#### Neon PostgreSQL Database

1. Go to [neon.tech](https://neon.tech) and create a free account
2. Create a new project
3. Copy the connection string (looks like: `postgresql://user:pass@host.neon.tech/dbname`)

#### Kinde Authentication

1. Go to [kinde.com](https://kinde.com) and create a free account
2. Create a new application
3. Configure settings:
   - **Allowed callback URLs**: `http://localhost:3000/api/auth/kinde_callback`
   - **Allowed logout redirect URLs**: `http://localhost:3000`
4. Copy your credentials:
   - Client ID
   - Client Secret  
   - Domain (e.g., `https://yourapp.kinde.com`)

### 3. Configure Environment Variables

```bash
# Copy the example file
cp .env.local.example .env.local
```

Edit `.env.local` and fill in:

```env
# Database (from Neon)
DATABASE_URL=postgresql://your_user:your_password@your_host.neon.tech/your_database?sslmode=require

# Kinde Auth
KINDE_CLIENT_ID=your_client_id_here
KINDE_CLIENT_SECRET=your_client_secret_here
KINDE_ISSUER_URL=https://yourapp.kinde.com
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/dashboard
```

### 4. Setup Database

```bash
# Push schema to database (creates tables)
npm run db:push

# (Optional) Add sample data
npm run db:seed
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## First Login

1. Click "কর্মচারী লগইন" (Employee Login)
2. Sign in with Kinde (create an account or use Google/GitHub)
3. Your user will be automatically created in the database with EMPLOYEE role
4. To make yourself an admin, update the database directly:

```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'your@email.com';
```

## Database Management

```bash
# View/edit database in browser
npm run db:studio

# Generate new migration
npm run db:generate

# Push schema changes
npm run db:push
```

## Features Available

✅ **Authentication**
- Login via Kinde OAuth
- Role-based access (Employee/Manager/Admin)
- Weekly login requirement

✅ **Dashboard**
- Stats overview
- Recent tickets
- Quick actions

✅ **Tickets**
- List all tickets
- View ticket details
- See customer information
- Status tracking (Open/Completed)

✅ **Customers**
- List all customers
- View customer details
- See ticket history

✅ **Profile**
- View user information
- See role and status

## Next Steps

To complete the application, you'll need to add:

1. **Forms**: Create/edit pages for tickets and customers
2. **Admin Panel**: User management interface
3. **Search**: Implement search functionality
4. **Pagination**: For large lists
5. **Email Notifications**: Using Resend

## Troubleshooting

**Database Connection Error**
- Verify `DATABASE_URL` in `.env.local`
- Check Neon dashboard for connection string
- Ensure the database exists

**Authentication Not Working**
- Verify all `KINDE_*` values
- Check callback URLs in Kinde dashboard
- Ensure URLs don't have trailing slashes

**Build Errors**
- Re-run `npm install`
- Delete `.next` folder and rebuild
- Check TypeScript errors: `npm run build`

## Support

For issues or questions:
- Check the [walkthrough.md](walkthrough.md) documentation
- Review the [implementation_plan.md](implementation_plan.md)
- Verify environment variables are correct

Happy repairing! 🔧
