import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { getProject, updateProject } from '@/lib/projects';
import sharp from 'sharp';

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

        // Ensure directory exists
        const fs = require('fs');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const newImagePaths: string[] = [];

        for (const file of files) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const filename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_'); // Sanitize
            const filepath = path.join(uploadDir, filename);

            // Save original
            await writeFile(filepath, buffer);
            newImagePaths.push(`/projects/${slug}/${filename}`);

            // Generate and save thumbnail
            // Format: originalname_thumb.ext
            const ext = path.extname(filename);
            const name = path.basename(filename, ext);
            const thumbFilename = `${name}_thumb${ext}`;
            const thumbFilepath = path.join(uploadDir, thumbFilename);

            try {
                await sharp(buffer)
                    .resize(800) // Resize to 800px width, auto height
                    .jpeg({ quality: 80 }) // Compress slightly
                    .toFile(thumbFilepath);
            } catch (err) {
                console.error('Thumbnail generation failed for', filename, err);
                // Continue even if thumbnail fails, just won't have it
            }
        }

        // Update project data
        const updatedImages = [...project.images, ...newImagePaths];
        await updateProject(slug, { images: updatedImages });

        return NextResponse.json({ success: true, savedFiles: newImagePaths });
    } catch (error: any) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
