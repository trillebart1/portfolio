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

    // 2. Site Protection (REMOVED: Public Access Allowed)
    // visitors can access site without login

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
