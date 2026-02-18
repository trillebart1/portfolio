import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const CODES_FILE = path.join(DATA_DIR, 'access_codes.json');

// Interface for Access Code
interface AccessCode {
    code: string;
    createdAt: string;
}

// Ensure file exists
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(CODES_FILE)) fs.writeFileSync(CODES_FILE, '[]', 'utf-8');

function getCodes(): AccessCode[] {
    try {
        const data = fs.readFileSync(CODES_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function saveCodes(codes: AccessCode[]) {
    fs.writeFileSync(CODES_FILE, JSON.stringify(codes, null, 2));
}

export async function GET() {
    return NextResponse.json(getCodes());
}

export async function POST() {
    // Generate a random 6-character code
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const codes = getCodes();
    // Ensure uniqueness (extremely unlikely to collide but good practice)
    while (codes.some(c => c.code === code)) {
        code = '';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
    }

    const newCode: AccessCode = {
        code,
        createdAt: new Date().toISOString(),
    };

    codes.push(newCode);
    saveCodes(codes);

    return NextResponse.json(newCode);
}

export async function DELETE(request: Request) {
    const { code } = await request.json();
    let codes = getCodes();
    const initialLength = codes.length;

    codes = codes.filter(c => c.code !== code);

    if (codes.length === initialLength) {
        return NextResponse.json({ error: 'Code not found' }, { status: 404 });
    }

    saveCodes(codes);
    return NextResponse.json({ success: true });
}
