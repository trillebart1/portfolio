'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, UploadCloud } from 'lucide-react';
import Link from 'next/link';

import { useParams } from 'next/navigation';

export default function UploadPage() {
    const params = useParams();
    const slug = params.slug as string;
    const [uploading, setUploading] = useState(false);
    const router = useRouter();

    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUploading(true);

        const form = e.currentTarget;
        const fileInput = form.elements.namedItem('files') as HTMLInputElement;

        if (!fileInput.files || fileInput.files.length === 0) {
            setUploading(false);
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < fileInput.files.length; i++) {
            formData.append('files', fileInput.files[i]);
        }

        try {
            const res = await fetch(`/api/projects/${slug}/upload`, {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                router.push(`/admin/projects/${slug}`); // Or back to dashboard
            } else {
                alert('Upload failed');
            }
        } catch (error) {
            console.error(error);
            alert('Upload error');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-8 md:p-16">
            <Link href="/admin" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white mb-8">
                <ArrowLeft size={16} />
                Back to Dashboard
            </Link>

            <h1 className="text-3xl font-light uppercase tracking-widest mb-2">Upload Images</h1>
            <p className="text-neutral-500 font-mono mb-8">Project: {slug}</p>

            <form onSubmit={handleUpload} className="max-w-xl border-2 border-dashed border-neutral-800 rounded-lg p-12 text-center hover:border-neutral-600 transition-colors">
                <input
                    type="file"
                    name="files"
                    multiple
                    accept="image/*"
                    className="hidden"
                    id="file-upload"
                    onChange={(e) => {
                        // Optional logic to show preview
                    }}
                />
                <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-4">
                    <UploadCloud size={48} className="text-neutral-500" />
                    <span className="text-lg">Click to select files</span>
                    <span className="text-sm text-neutral-500">JPG, PNG, WEBP supported</span>
                </label>

                <button
                    type="submit"
                    disabled={uploading}
                    className="mt-8 px-8 py-3 bg-white text-black font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors disabled:opacity-50"
                >
                    {uploading ? 'Uploading...' : 'Start Upload'}
                </button>
            </form>
        </div>
    );
}
