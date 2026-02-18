import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;
        const { filename } = await request.json();

        if (!filename) {
            return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
        }

        const filepath = path.join(process.cwd(), 'public', 'projects', slug, filename);

        // Security check to prevent directory traversal
        if (!filepath.startsWith(path.join(process.cwd(), 'public', 'projects', slug))) {
            return NextResponse.json({ error: 'Invalid file path' }, { status: 403 });
        }

        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
