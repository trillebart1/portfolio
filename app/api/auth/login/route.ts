import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const { password } = await request.json();

        // In a real app, use a strong environment variable. 
        // For this requested "simple" setup, we check against process.env.ADMIN_PASSWORD
        const correctPassword = process.env.ADMIN_PASSWORD || 'admin123';

        if (password === correctPassword) {
            // Set HTTP-only cookie
            // Await cookies() in Next.js 15 (it's async), but in 14 it's sync usually.
            // Wait, in Next 15 `cookies()` IS async. In 14 it is sync. 
            // Since I installed `create-next-app@latest` which gave me Next 16.1.6 (React 19), 
            // I MUST treat `cookies()` as a Promise or wait for it.
            // However, `next/headers` cookies() returns a ReadonlyRequestCookies in 14.
            // In 15, it returns a Promise.
            // Use `await` to be safe for 15.

            const cookieStore = await cookies();
            cookieStore.set('admin_session', 'true', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: '/',
            });

            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
