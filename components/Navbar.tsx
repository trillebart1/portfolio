'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Don't show navbar on login page, project detail pages, or admin pages
    if (pathname.includes('/login') || pathname.startsWith('/projects/') || pathname.startsWith('/admin')) return null;

    const links = [
        { href: '/', label: 'Projects' },
        { href: '/about', label: 'CV' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <header className="fixed top-0 z-50 w-full bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-white/5 transition-colors duration-300">
            <div className="max-w-[1920px] mx-auto px-6 md:px-16 h-24 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-4 group cursor-pointer text-white text-sm font-semibold tracking-[0.2em] z-50 mix-blend-difference uppercase">
                    Tolgahan Tokatlı <span className="font-light opacity-50 ml-1">PORTFOLIO</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-12">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${pathname === link.href ? 'text-white' : 'text-gray-500 hover:text-white'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-white hover:text-gray-400 transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Nav Overlay */}
                {isOpen && (
                    <div className="absolute top-24 left-0 w-full h-[calc(100vh-6rem)] bg-[#0a0a0a] flex flex-col items-center justify-center gap-8 md:hidden">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-lg font-medium uppercase tracking-[0.2em] text-white hover:text-gray-400"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </header>
    );
}
