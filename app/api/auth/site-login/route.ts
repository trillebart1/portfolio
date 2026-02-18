import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CODES_FILE = path.join(process.cwd(), 'data', 'access_codes.json');

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { code } = body;

        if (!code) {
            return NextResponse.json({ error: 'Code is required' }, { status: 400 });
        }

        // Read codes
        let codes: any[] = [];
        try {
            const data = fs.readFileSync(CODES_FILE, 'utf-8');
            codes = JSON.parse(data);
        } catch (error) {
            // If file doesn't exist or error, fail secure
            return NextResponse.json({ error: 'System error' }, { status: 500 });
        }

        // Validate code
        const isValid = codes.some((c: any) => c.code === code);

        if (isValid) {
            const response = NextResponse.json({ success: true });

            // Set HTTP-only cookie for site access
            // Expires in 30 days
            const expires = new Date();
            expires.setDate(expires.getDate() + 30);

            response.cookies.set('site_access', 'true', {
                httpOnly: true,
                secure: false, // process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                expires: expires,
            });

            return response;
        } else {
            return NextResponse.json({ error: 'Invalid access code' }, { status: 401 });
        }

    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
