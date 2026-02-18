'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Project } from '@/lib/types';
import ProjectCard from './ProjectCard';

interface HorizontalGalleryProps {
    projects: Project[];
}

export default function HorizontalGallery({ projects }: HorizontalGalleryProps) {
    // We can use native horizontal scroll with snap, or framer motion 
    // Native is smoother for trackpads. Let's use a simple flex container with overflow-x-auto.
    // For "cinematic", usually smooth scrolling or snap points are good.

    const containerRef = useRef<HTMLDivElement>(null);

    if (projects.length === 0) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center text-neutral-500">
                <p className="text-xl font-light">No projects found.</p>
                <p className="text-sm mt-2">Upload projects via the Admin panel.</p>
            </div>
        );
    }

    return (
        <div className="relative h-screen w-full flex flex-col justify-center overflow-hidden">
            {/* Background / Context (Optional) */}
            <div className="absolute top-8 left-8 z-10">
                <h1 className="text-xl font-bold tracking-widest uppercase">Portfolio</h1>
            </div>

            {/* Horizontal Scroll Container */}
            <div
                ref={containerRef}
                className="flex gap-4 md:gap-8 px-8 md:px-16 overflow-x-auto overflow-y-hidden items-center h-[70vh] no-scrollbar snap-x snap-mandatory"
            >
                {projects.map((project) => (
                    <div key={project.slug} className="snap-center">
                        <ProjectCard project={project} />
                    </div>
                ))}

                {/* Padding for last item */}
                <div className="w-8 shrink-0" />
            </div>

            <div className="absolute bottom-8 right-8 z-10 text-neutral-500 text-sm font-mono">
                SCROLL &rarr;
            </div>
        </div>
    );
}
