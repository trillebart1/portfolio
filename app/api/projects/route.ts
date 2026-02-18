import { NextResponse } from 'next/server';
import { createProject } from '@/lib/projects';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { slug, title, ...rest } = body;

        if (!slug || !title) {
            return NextResponse.json({ error: 'Slug and Title are required' }, { status: 400 });
        }

        const newProject = await createProject(slug, { title, ...rest });
        return NextResponse.json(newProject);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
