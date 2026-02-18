'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Trash2, Upload } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/lib/types';

import { useParams } from 'next/navigation';

export default function EditProjectPage() {
    const params = useParams();
    const slug = params.slug as string;
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchProject();
    }, [slug]);

    const fetchProject = async () => {
        // We can fetch via the public API or reusing a server action, or just fetch the public endpoint
        // But since this is admin, we might want a specific admin endpoint. 
        // For now, let's use the public `getProject` logic via a new API route or existing one.
        // I haven't made a GET /api/projects/[slug] yet (only PUT/DELETE).
        // Let's create GET /api/projects/[slug] in the same route file I made earlier?
        // Wait, I made PUT and DELETE in `app/api/projects/[slug]/route.ts`.
        // I should add GET there.
        const res = await fetch(`/api/projects/${slug}`);
        if (res.ok) {
            const data = await res.json();
            setProject(data);
        }
        setLoading(false);
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!project) return;

        const res = await fetch(`/api/projects/${slug}`, {
            method: 'PUT',
            body: JSON.stringify(project),
        });

        if (res.ok) {
            alert('Project updated');
            router.refresh();
        } else {
            alert('Update failed');
        }
    };

    const deleteImage = async (imagePath: string) => {
        if (!confirm('Delete this image?')) return;

        // extract filename from path /projects/slug/filename.jpg
        const filename = imagePath.split('/').pop();

        const res = await fetch(`/api/projects/${slug}/images`, {
            method: 'DELETE',
            body: JSON.stringify({ filename }),
        });

        if (res.ok) {
            fetchProject(); // Refresh images
        } else {
            alert('Failed to delete image');
        }
    };

    if (loading) return <div className="p-16 text-white">Loading...</div>;
    if (!project) return <div className="p-16 text-white">Project not found</div>;

    return (
        <div className="min-h-screen bg-black text-white p-8 md:p-16">
            <div className="flex justify-between items-center mb-8">
                <Link href="/admin" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white">
                    <ArrowLeft size={16} />
                    Back to Dashboard
                </Link>

                <Link
                    href={`/admin/projects/${slug}/upload`}
                    className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded hover:bg-neutral-200 transition-colors"
                >
                    <Upload size={16} />
                    <span>Upload Images</span>
                </Link>
            </div>

            <h1 className="text-3xl font-light uppercase tracking-widest mb-8">Edit Project: {slug}</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Metadata Form */}
                <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm text-neutral-400">Title</label>
                        <input
                            type="text"
                            value={project.title}
                            onChange={(e) => setProject({ ...project, title: e.target.value })}
                            className="w-full bg-neutral-900 border border-neutral-800 p-3 rounded focus:border-white focus:outline-none transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm text-neutral-400">Year</label>
                        <input
                            type="text"
                            value={project.year}
                            onChange={(e) => setProject({ ...project, year: e.target.value })}
                            className="w-full bg-neutral-900 border border-neutral-800 p-3 rounded focus:border-white focus:outline-none transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm text-neutral-400">Location</label>
                        <input
                            type="text"
                            value={project.location}
                            onChange={(e) => setProject({ ...project, location: e.target.value })}
                            className="w-full bg-neutral-900 border border-neutral-800 p-3 rounded focus:border-white focus:outline-none transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm text-neutral-400">Software</label>
                        <input
                            type="text"
                            className="w-full bg-neutral-900 border border-neutral-800 p-3 rounded focus:border-white focus:outline-none transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm text-neutral-400">Category (Residential, Retail, Office, etc.)</label>
                        <input
                            type="text"
                            value={project.category || ''}
                            onChange={(e) => setProject({ ...project, category: e.target.value })}
                            className="w-full bg-neutral-900 border border-neutral-800 p-3 rounded focus:border-white focus:outline-none transition-colors"
                            placeholder="e.g. Residential, Retail, Office"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm text-neutral-400">Description</label>
                        <textarea
                            value={project.description}
                            onChange={(e) => setProject({ ...project, description: e.target.value })}
                            className="w-full bg-neutral-900 border border-neutral-800 p-3 rounded focus:border-white focus:outline-none transition-colors h-32"
                        />
                    </div>

                    <button
                        type="submit"
                        className="px-8 py-3 bg-white text-black font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors"
                    >
                        Save Changes
                    </button>
                </form>

                {/* Image Management */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold uppercase tracking-widest">Images</h2>

                    <div className="grid grid-cols-2 gap-4">
                        {project.images.map((img) => (
                            <div key={img} className="relative group aspect-video bg-neutral-900 border border-neutral-800">
                                <Image
                                    src={img}
                                    alt="Project Image"
                                    fill
                                    className={`object-cover ${project.coverImage === img ? 'opacity-100' : 'opacity-60 group-hover:opacity-100 transition-opacity'}`}
                                    sizes="25vw"
                                    quality={60}
                                />
                                {project.coverImage === img && (
                                    <div className="absolute top-2 left-2 px-2 py-1 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded">
                                        Cover
                                    </div>
                                )}
                                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        type="button"
                                        onClick={() => setProject({ ...project, coverImage: img })}
                                        className="p-2 bg-white text-black rounded hover:bg-neutral-200"
                                        title="Set as Cover"
                                    >
                                        <div className="w-4 h-4 border-2 border-black rounded-full"></div>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => deleteImage(img)}
                                        className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
                                        title="Delete Image"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {project.images.length === 0 && (
                            <div className="col-span-2 text-neutral-500 py-8 text-center bg-neutral-900/50 rounded border border-dashed border-neutral-800">
                                No images. Upload some!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
