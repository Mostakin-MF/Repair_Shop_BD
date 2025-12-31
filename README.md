# RepairShop BD - Service Management Platform

A comprehensive B2B service booking platform for connecting repair shop technicians with customers in Bangladesh. Built with Next.js 15, React 19, and modern web technologies.

## Features

- 🔐 **Authentication**: Kinde OAuth with role-based access control
- 📊 **Dashboard**: Real-time stats and recent activity
- 🎫 **Ticket Management**: Create, track, and complete repair tickets
- 👥 **Customer Management**: Contact information and service history
- 🌓 **Dark/Light Mode**: Fully integrated theme system
- 🇧🇩 **Bengali Language**: All UI labels in বাংলা
- 📱 **Responsive Design**: Optimized for desktop and tablet

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: Neon PostgreSQL with Drizzle ORM
- **Auth**: Kinde Auth
- **State Management**: TanStack Query, Zustand
- **Forms**: React Hook Form + Zod

## Quick Start

See [SETUP.md](SETUP.md) for detailed setup instructions.

```bash
# Install dependencies
npm install

# Setup .env.local with your credentials
cp .env.local.example .env.local

# Push database schema
npm run db:push

# Run development server
npm run dev
```

## Documentation

- [SETUP.md](SETUP.md) - Setup instructions
- [walkthrough.md](C:/Users/USER/.gemini/antigravity/brain/c1de2c07-ff5d-4f38-b6be-12c3700d3144/walkthrough.md) - Implementation walkthrough
- [PROJECT_OUTLINE.md](PROJECT_OUTLINE.md) - Project specification

## License

MIT

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
