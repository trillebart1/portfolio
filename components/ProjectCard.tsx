'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Project } from '@/lib/types';

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <motion.div
            className="relative shrink-0 w-[80vw] md:w-[60vw] lg:w-[45vw] aspect-video group cursor-pointer overflow-hidden bg-neutral-900"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
        >
            <Link href={`/projects/${project.slug}`} className="block w-full h-full relative">
                {project.coverImage ? (
                    <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                        sizes="(max-width: 768px) 80vw, 45vw"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-700">
                        No Image
                    </div>
                )}

                {/* Cinematic Label Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white uppercase mb-1">
                        {project.title}
                    </h2>
                    <div className="flex items-center gap-3 text-sm text-neutral-300 font-mono tracking-wider">
                        <span>{project.location}</span>
                        <span className="w-1 h-1 bg-neutral-500 rounded-full" />
                        <span>{project.year}</span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
