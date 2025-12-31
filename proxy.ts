import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
    // Kinde handles authentication through its own routes
    // The /api/auth/* routes manage login/logout/callback
    // Protected pages will handle auth checks via getAuthUser() in components
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
