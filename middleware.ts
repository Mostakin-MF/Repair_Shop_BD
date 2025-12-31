import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function middleware(request: NextRequest) {
    const { isAuthenticated } = getKindeServerSession();
    const authenticated = await isAuthenticated();

    // Protected dashboard routes
    if (request.nextUrl.pathname.startsWith('/dashboard') ||
        request.nextUrl.pathname.startsWith('/tickets') ||
        request.nextUrl.pathname.startsWith('/customers') ||
        request.nextUrl.pathname.startsWith('/admin') ||
        request.nextUrl.pathname.startsWith('/profile')) {

        if (!authenticated) {
            // Redirect to login if not authenticated
            const loginUrl = new URL('/api/auth/login', request.url);
            loginUrl.searchParams.set('post_login_redirect_url', request.nextUrl.pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    // Redirect authenticated users from login page to dashboard
    if (request.nextUrl.pathname === '/login' && authenticated) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/tickets/:path*',
        '/customers/:path*',
        '/admin/:path*',
        '/profile/:path*',
        '/login',
    ],
};
