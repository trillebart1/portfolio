'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Eye, EyeOff, Edit, Upload, Mail } from 'lucide-react';
import { Project } from '@/lib/types';

export default function AdminDashboard() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [codes, setCodes] = useState<{ code: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchProjects();
        fetchCodes();
    }, []);

    const fetchProjects = async () => {
        const res = await fetch('/api/projects/list');
        if (res.ok) {
            const data = await res.json();
            setProjects(data);
        }
        setLoading(false);
    };

    const fetchCodes = async () => {
        const res = await fetch('/api/codes');
        if (res.ok) {
            const data = await res.json();
            setCodes(data);
        }
    };

    const handleGenerateCode = async () => {
        const res = await fetch('/api/codes', { method: 'POST' });
        if (res.ok) fetchCodes();
    };

    const handleDeleteCode = async (code: string) => {
        if (!confirm('Revoke this access code?')) return;
        const res = await fetch('/api/codes', {
            method: 'DELETE',
            body: JSON.stringify({ code }),
        });
        if (res.ok) fetchCodes();
    };

    const toggleVisibility = async (project: Project) => {
        const res = await fetch(`/api/projects/${project.slug}`, {
            method: 'PUT',
            body: JSON.stringify({ hidden: !project.hidden }),
        });
        if (res.ok) fetchProjects();
    };

    const handleDelete = async (slug: string) => {
        if (!confirm('Are you sure? This will delete the project and all images permanently.')) return;

        const res = await fetch(`/api/projects/${slug}`, {
            method: 'DELETE',
        });
        if (res.ok) fetchProjects();
    };

    if (loading) return <div className="p-8 text-white">Loading...</div>;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-8 md:p-16">
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-3xl font-light uppercase tracking-widest">Dashboard</h1>
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/messages"
                        className="flex items-center gap-2 bg-neutral-800 text-white px-4 py-2 rounded hover:bg-neutral-700 transition-colors"
                    >
                        <Mail size={18} />
                        <span>Messages</span>
                    </Link>
                    <Link
                        href="/admin/new"
                        className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded hover:bg-neutral-200 transition-colors"
                    >
                        <Plus size={18} />
                        <span>New Project</span>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                {/* Projects Section (Main Content) */}
                <div className="lg:col-span-2 space-y-8">
                    <h2 className="text-xl font-light uppercase tracking-widest border-b border-neutral-800 pb-4">Projects</h2>
                    <div className="grid gap-4">
                        {projects.map((project) => (
                            <div key={project.slug} className="flex items-center justify-between p-4 bg-neutral-900 border border-neutral-800 rounded">
                                <div>
                                    <h2 className="text-xl font-bold">{project.title}</h2>
                                    <div className="text-sm text-neutral-400 font-mono mt-1">
                                        /{project.slug} • {project.year}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => toggleVisibility(project)}
                                        className="p-2 text-neutral-400 hover:text-white transition-colors"
                                        title={project.hidden ? "Show Project" : "Hide Project"}
                                    >
                                        {project.hidden ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>

                                    <Link href={`/admin/projects/${project.slug}`} className="p-2 text-neutral-400 hover:text-white transition-colors">
                                        <Edit size={20} />
                                    </Link>

                                    <Link href={`/admin/projects/${project.slug}/upload`} className="p-2 text-neutral-400 hover:text-white transition-colors">
                                        <Upload size={20} />
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(project.slug)}
                                        className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {projects.length === 0 && (
                            <div className="text-center text-neutral-500 py-12">
                                No projects found. Create one to get started.
                            </div>
                        )}
                    </div>
                </div>

                {/* Access Codes Section (Sidebar) */}
                <div className="space-y-8">
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                        <h2 className="text-xl font-light uppercase tracking-widest">Access Codes</h2>
                        <button
                            onClick={handleGenerateCode}
                            className="text-xs bg-neutral-800 hover:bg-neutral-700 px-3 py-1 rounded transition-colors"
                        >
                            Generate New
                        </button>
                    </div>

                    <div className="space-y-4">
                        {codes.length === 0 ? (
                            <div className="text-neutral-500 text-sm">No active codes.</div>
                        ) : (
                            codes.map((c) => (
                                <div key={c.code} className="flex items-center justify-between p-3 bg-neutral-900 border border-neutral-800 rounded">
                                    <div className="font-mono text-lg tracking-widest text-emerald-400 select-all">
                                        {c.code}
                                    </div>
                                    <button
                                        onClick={() => handleDeleteCode(c.code)}
                                        className="text-neutral-500 hover:text-red-500 transition-colors"
                                        title="Revoke Code"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))
                        )}
                        <div className="text-xs text-neutral-600 mt-4 leading-relaxed">
                            These codes allow clients to access the portfolio. You can revoke them at any time.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
