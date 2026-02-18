import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProject } from '@/lib/projects';
import { ArrowLeft } from 'lucide-react';

interface ProjectPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Ensure correct type for params in Next.js 15 (it might be a Promise in future versions, currently object in 14)
// But to be safe and strictly typed:
export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = await getProject(slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-8 mix-blend-difference text-white">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm uppercase tracking-widest hover:opacity-70 transition-opacity"
                >
                    <ArrowLeft size={16} />
                    Back to Portfolio
                </Link>
            </nav>

            {/* Header / Hero */}
            <header className="pt-32 pb-16 px-6 md:px-16 md:pt-48 max-w-screen-xl mx-auto">
                <h1 className="text-4xl md:text-6xl lg:text-8xl font-serif italic text-white mb-6">
                    {project.title}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-neutral-400 font-sans text-sm tracking-wider border-t border-white/20 pt-8">
                    <div>
                        <span className="block text-white mb-1 uppercase text-xs tracking-widest">Year</span>
                        {project.year}
                    </div>
                    <div>
                        <span className="block text-white mb-1 uppercase text-xs tracking-widest">Location</span>
                        {project.location}
                    </div>
                    <div>
                        <span className="block text-white mb-1 uppercase text-xs tracking-widest">Software</span>
                        {project.software}
                    </div>
                    <div className="md:col-span-1">
                        <span className="block text-white mb-1 uppercase text-xs tracking-widest">Description</span>
                        <p className="leading-relaxed whitespace-pre-wrap font-light">{project.description}</p>
                    </div>
                </div>
            </header>

            {/* Image Gallery */}
            <section className="flex flex-col gap-4 md:gap-8 pb-32">
                {project.images.length > 0 ? (
                    project.images.map((image, index) => (
                        <div key={index} className="w-full bg-neutral-900">
                            {/* Using standard img tag to preserve exact aspect ratio without cropping */}
                            <img
                                src={image}
                                alt={`${project.title} - View ${index + 1}`}
                                className="w-full h-auto block"
                                loading={index === 0 ? "eager" : "lazy"}
                            />
                        </div>
                    ))
                ) : (
                    <div className="w-full h-[50vh] flex items-center justify-center text-neutral-600 font-mono">
                        No images upload yet
                    </div>
                )}
            </section>

            {/* Footer Navigation */}
            <footer className="px-6 md:px-16 pb-16">
                <Link href="/" className="text-neutral-500 hover:text-white transition-colors">
                    Next Project &rarr;
                </Link>
            </footer>
        </main>
    );
}
