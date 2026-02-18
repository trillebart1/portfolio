'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const greetings = [
    "Merhaba",
    "Welcome"
];

export default function SiteLoginPage() {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [greetingIndex, setGreetingIndex] = useState(0);
    const router = useRouter();

    useEffect(() => {
        if (isSuccess) {
            // Cycle through greetings
            const interval = setInterval(() => {
                setGreetingIndex((prev) => {
                    if (prev === greetings.length - 1) {
                        clearInterval(interval);
                        return prev;
                    }
                    return prev + 1;
                });
            }, 1200); // Change every 1.2s (Slower)

            // Redirect after all greetings + some delay
            const totalDuration = (greetings.length * 1200) + 1000;
            const redirectTimer = setTimeout(() => {
                window.location.href = '/';
            }, totalDuration);

            return () => {
                clearInterval(interval);
                clearTimeout(redirectTimer);
            };
        }
    }, [isSuccess]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/site-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code }),
            });

            if (res.ok) {
                setIsSuccess(true);
            } else {
                const data = await res.json();
                setError(data.error || 'Invalid code');
                setIsLoading(false);
            }
        } catch (err) {
            setError('Something went wrong');
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen relative flex items-center justify-center bg-black text-white isolate overflow-hidden">
            {/* Background Texture/Image */}
            <div className="absolute inset-0 bg-[#050505] -z-20"></div>

            <AnimatePresence mode="wait">
                {!isSuccess ? (
                    <motion.div
                        key="login-form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="relative z-10 p-8 md:p-12 w-full max-w-lg text-center"
                    >
                        {/* Branding */}
                        <h1 className="text-3xl md:text-5xl font-light uppercase tracking-[0.2em] mb-4 font-serif">
                            Tolgahan Tokatli
                        </h1>
                        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-16">
                            Architect & Interior Designer
                        </p>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                                    placeholder="ENTER ACCESS CODE"
                                    className="w-full bg-transparent border-b border-neutral-700 py-3 text-center text-xl font-mono tracking-widest focus:border-white focus:outline-none transition-colors uppercase placeholder:text-neutral-800"
                                    maxLength={6}
                                />

                                {error && (
                                    <div className="text-red-500 text-xs tracking-widest uppercase animate-pulse">
                                        {error}
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-white text-black px-8 py-3 text-xs font-bold uppercase tracking-[0.25em] hover:bg-neutral-200 transition-colors disabled:opacity-50"
                            >
                                {isLoading ? 'Verifying...' : 'Enter Portfolio'}
                            </button>
                        </form>
                    </motion.div>
                ) : (
                    <motion.div
                        key="success-message"
                        className="absolute inset-0 flex items-center justify-center z-50 bg-black"
                    >
                        <AnimatePresence mode="wait">
                            <motion.h2
                                key={greetings[greetingIndex]}
                                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="text-4xl md:text-6xl font-serif italic tracking-wide text-white"
                            >
                                {greetings[greetingIndex]}
                            </motion.h2>
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>

            {!isSuccess && (
                <div className="absolute bottom-8 text-[10px] text-neutral-800 uppercase tracking-widest">
                    Restricted Access
                </div>
            )}
        </main>
    );
}
