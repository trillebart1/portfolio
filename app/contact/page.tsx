'use client';

import { useState } from 'react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 3000); // Reset status after 3s
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <main className="min-h-screen pt-24 pb-20 bg-[#1c1c1e] flex flex-col items-center justify-center relative overflow-hidden">
            <div className="w-full max-w-[900px] z-10 flex flex-col items-center text-center px-4">

                <div className="mb-20 flex flex-col items-center gap-6">
                    <span className="text-white/30 text-[10px] font-bold tracking-[0.3em] uppercase mb-4 block">Direct Inquiry</span>
                    <a className="text-3xl md:text-5xl lg:text-6xl font-extralight text-white tracking-tight hover:text-gray-300 transition-colors duration-300" href="mailto:bilgi@tolgahantokatli.com.tr">
                        bilgi@tolgahantokatli.com.tr
                    </a>
                    <a className="text-2xl md:text-4xl lg:text-5xl font-extralight text-white/70 tracking-tight hover:text-white transition-colors duration-300 mt-2" href="tel:+905433051318">
                        0543 305 13 18
                    </a>

                </div>

                <div className="w-full h-[1px] bg-white/5 mb-16 max-w-[200px]"></div>

                <div className="w-full max-w-[440px]">
                    <h3 className="text-white/30 text-[10px] font-medium tracking-[0.2em] uppercase mb-10 text-center">Or leave a note</h3>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="group text-left relative">
                            <label className="sr-only" htmlFor="name">Name</label>
                            <input
                                className="w-full bg-transparent border-0 border-b border-white/10 px-0 py-2 text-base text-white placeholder-white/20 focus:ring-0 focus:border-white/50 focus:outline-none transition-all duration-300 font-light"
                                id="name"
                                name="name"
                                placeholder="Name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="group text-left relative">
                            <label className="sr-only" htmlFor="email">Email</label>
                            <input
                                className="w-full bg-transparent border-0 border-b border-white/10 px-0 py-2 text-base text-white placeholder-white/20 focus:ring-0 focus:border-white/50 focus:outline-none transition-all duration-300 font-light"
                                id="email"
                                name="email"
                                placeholder="Email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="group text-left relative">
                            <label className="sr-only" htmlFor="message">Message</label>
                            <textarea
                                className="w-full bg-transparent border-0 border-b border-white/10 px-0 py-2 text-base text-white placeholder-white/20 focus:ring-0 focus:border-white/50 focus:outline-none transition-all duration-300 font-light resize-none min-h-[36px]"
                                id="message"
                                name="message"
                                placeholder="Message"
                                rows={1}
                                required
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className="pt-8 flex flex-col items-center gap-4">
                            <button
                                className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-500 disabled:opacity-50"
                                type="submit"
                                disabled={status === 'loading' || status === 'success'}
                            >
                                <span className="text-[10px] font-semibold tracking-[0.25em] uppercase">
                                    {status === 'loading' ? 'Sending...' : status === 'success' ? 'Sent Successfully' : 'Send Message'}
                                </span>
                                {status === 'idle' && <span className="text-sm font-light group-hover:translate-x-1 transition-transform duration-500">→</span>}
                            </button>

                            {status === 'error' && (
                                <p className="text-red-500 text-xs tracking-wider uppercase">Failed to send message. Please try again.</p>
                            )}
                        </div>
                    </form>
                </div>

            </div>

            <footer className="absolute bottom-0 w-full border-t border-white/5 py-8 px-6 bg-[#1c1c1e]">
                <div className="max-w-[1400px] mx-auto text-center md:text-left text-white/10 text-[10px] tracking-wider uppercase">
                    © 2024 Tolgahan Tokatlı.
                </div>
            </footer>
        </main>
    );
}
