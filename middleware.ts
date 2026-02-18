import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Admin Protection
    if (pathname.startsWith('/admin')) {
        if (pathname === '/admin/login') {
            return NextResponse.next();
        }

        const session = request.cookies.get('admin_session');
        if (!session || session.value !== 'true') {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    // 2. Site Protection (Client Access)
    // Exclude login, api, static files, and admin routes (handled above)
    const isPublicAsset = pathname.includes('.') || pathname.startsWith('/_next');
    const isLogin = pathname === '/login';
    const isApi = pathname.startsWith('/api');
    const isAdmin = pathname.startsWith('/admin');

    if (!isPublicAsset && !isLogin && !isApi && !isAdmin) {
        const siteAccess = request.cookies.get('site_access');
        if (!siteAccess || siteAccess.value !== 'true') {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
