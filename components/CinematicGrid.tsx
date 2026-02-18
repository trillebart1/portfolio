'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/lib/types';
import { motion } from 'framer-motion';

interface CinematicGridProps {
    projects: Project[];
}

export default function CinematicGrid({ projects }: CinematicGridProps) {
    const [filter, setFilter] = useState('All');

    const filteredProjects = projects.filter(p => {
        if (filter === 'All') return true;
        return p.category?.toLowerCase() === filter.toLowerCase();
    });

    const categories = ['All', 'Residential', 'Retail', 'Office'];

    const handleViewAll = () => {
        setFilter('All');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="w-full max-w-[1920px] mx-auto px-6 md:px-16 pt-40 pb-20">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
                <div>
                    <h2 className="text-3xl md:text-5xl font-light tracking-wide text-white mb-3 font-serif italic">
                        Selected Projects
                    </h2>
                    <p className="text-gray-500 font-light text-sm max-w-lg leading-relaxed">
                        A curated selection of architectural visualizations, blending atmospheric lighting with structural precision.
                    </p>
                </div>

                {/* Filter Buttons */}
                <div className="flex items-center gap-8 border-b border-white/10 pb-2 pr-4 overflow-x-auto">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`text-[10px] font-medium uppercase tracking-[0.15em] transition-all shrink-0 ${filter === cat
                                ? "text-white font-semibold relative after:content-[''] after:absolute after:-bottom-2.5 after:left-0 after:w-full after:h-[1px] after:bg-white"
                                : "text-gray-600 hover:text-white"
                                }`}
                        >
                            {cat === 'All' ? 'All Work' : cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 min-h-[50vh]">
                {filteredProjects.map((project, index) => (
                    <Link
                        key={project.slug}
                        href={`/projects/${project.slug}`}
                        className={`group relative cursor-pointer block ${index % 2 !== 0 ? 'md:mt-24' : ''}`}
                    >
                        <div className="aspect-[16/9] w-full overflow-hidden bg-[#121212] relative isolate">
                            {(project.coverImage || project.images?.[0]) ? (
                                <Image
                                    src={project.coverImage || project.images[0]}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100 will-change-transform"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    quality={100}
                                    unoptimized
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-neutral-700">No Image</div>
                            )}

                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700"></div>

                            {/* Desktop Hover Reveal */}
                            <div className="absolute inset-0 hidden md:flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                                <h3 className="text-3xl font-serif italic text-white mb-1">{project.title}</h3>
                                <p className="text-xs tracking-widest uppercase text-gray-300">{project.category || project.year} — {project.location}</p>
                            </div>
                        </div>

                        {/* Mobile Title */}
                        <div className="md:hidden mt-4">
                            <h3 className="text-xl font-serif italic text-white">{project.title}</h3>
                            <p className="text-[10px] tracking-widest uppercase text-gray-500 mt-1">{project.category || project.year} — {project.location}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Footer / More Link */}
            <div className="mt-32 flex justify-center">
                {filteredProjects.length > 0 && (
                    <button
                        onClick={handleViewAll}
                        className="group flex items-center gap-4 text-gray-500 hover:text-white transition-colors duration-500"
                    >
                        <span className="h-[1px] w-12 bg-gray-700 group-hover:bg-white transition-colors duration-500"></span>
                        <span className="text-[10px] font-medium tracking-[0.25em] uppercase">View All Projects</span>
                        <span className="h-[1px] w-12 bg-gray-700 group-hover:bg-white transition-colors duration-500"></span>
                    </button>
                )}
                {filteredProjects.length === 0 && (
                    <div className="text-neutral-500">No projects found in this category.</div>
                )}
            </div>

        </div>
    );
}
