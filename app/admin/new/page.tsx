'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewProjectPage() {
    const [formData, setFormData] = useState({
        slug: '',
        title: '',
        year: new Date().getFullYear().toString(),
        location: '',
        software: '',
        description: '',
    });
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!formData.slug || !formData.title) {
            setError('Title and Slug are required');
            return;
        }

        const res = await fetch('/api/projects', {
            method: 'POST',
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            router.push('/admin');
        } else {
            const data = await res.json();
            setError(data.error || 'Failed to create project');
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        // Auto-generate slug from title if slug is empty or matches previous auto-gen
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        setFormData(prev => ({ ...prev, title, slug }));
    };

    return (
        <div className="min-h-screen bg-black text-white p-8 md:p-16">
            <Link href="/admin" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white mb-8">
                <ArrowLeft size={16} />
                Back to Dashboard
            </Link>

            <h1 className="text-3xl font-light uppercase tracking-widest mb-8">New Project</h1>

            <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
                {error && <div className="bg-red-500/10 text-red-500 p-4 rounded border border-red-500/20">{error}</div>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm text-neutral-400">Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={handleTitleChange}
                            className="w-full bg-neutral-900 border border-neutral-800 p-3 rounded focus:border-white focus:outline-none transition-colors"
                            placeholder="e.g. Villa Horizon"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm text-neutral-400">Slug (URL)</label>
                        <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            className="w-full bg-neutral-900 border border-neutral-800 p-3 rounded focus:border-white focus:outline-none transition-colors font-mono text-sm"
                            placeholder="villa-horizon"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm text-neutral-400">Year</label>
                        <input
                            type="text"
                            value={formData.year}
                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                            className="w-full bg-neutral-900 border border-neutral-800 p-3 rounded focus:border-white focus:outline-none transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm text-neutral-400">Location</label>
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full bg-neutral-900 border border-neutral-800 p-3 rounded focus:border-white focus:outline-none transition-colors"
                            placeholder="City, Country"
                        />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="block text-sm text-neutral-400">Software Used</label>
                        <input
                            type="text"
                            value={formData.software}
                            onChange={(e) => setFormData({ ...formData, software: e.target.value })}
                            className="w-full bg-neutral-900 border border-neutral-800 p-3 rounded focus:border-white focus:outline-none transition-colors"
                            placeholder="3ds Max, Corona, etc."
                        />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="block text-sm text-neutral-400">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full bg-neutral-900 border border-neutral-800 p-3 rounded focus:border-white focus:outline-none transition-colors h-32"
                            placeholder="Project description..."
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="px-8 py-3 bg-white text-black font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors"
                >
                    Create Project
                </button>
            </form>
        </div>
    );
}
