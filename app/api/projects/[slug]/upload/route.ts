import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { getProject } from '@/lib/projects';

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;
        const project = await getProject(slug);

        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        const formData = await request.formData();
        const files = formData.getAll('files') as File[];

        if (!files || files.length === 0) {
            return NextResponse.json({ error: 'No files provided' }, { status: 400 });
        }

        const uploadDir = path.join(process.cwd(), 'public', 'projects', slug);

        const savedFiles = [];

        for (const file of files) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const filename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_'); // Sanitize
            const filepath = path.join(uploadDir, filename);

            await writeFile(filepath, buffer);
            savedFiles.push(filename);
        }

        return NextResponse.json({ success: true, savedFiles });
    } catch (error: any) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
