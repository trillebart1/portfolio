'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ password }),
        });

        if (res.ok) {
            router.push('/admin');
        } else {
            setError('Invalid Access Code');
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]">
            <div className="absolute inset-0 z-0 h-full w-full">
                <div className="absolute inset-0 bg-black/50 z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 z-10"></div>
                {/* Background Image logic - using a placeholder for now */}
                <div className="absolute inset-0 bg-[url('/projects/villa-horizon/cover.svg')] bg-cover bg-center opacity-60 blur-sm scale-105"></div>
            </div>

            <main className="relative z-20 flex w-full max-w-md flex-col items-center justify-center px-6 text-center">
                <div className="flex flex-col items-center gap-10 w-full py-12">
                    <div className="flex flex-col items-center gap-2">
                        <h1 className="text-white text-3xl md:text-4xl font-bold tracking-widest uppercase leading-tight">
                            Tolgahan Tokatlı
                        </h1>
                        <p className="text-white/70 text-xs md:text-sm font-light tracking-[0.3em] uppercase">
                            Architect & Interior Designer
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="flex flex-col w-full max-w-[280px] gap-5 mt-4">
                        <div className="relative group w-full">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full border border-white/20 bg-black/20 backdrop-blur-sm py-3 px-4 text-center text-white placeholder-white/30 focus:border-white/60 focus:bg-black/40 focus:outline-none focus:ring-0 transition-all duration-300 tracking-[0.15em] text-sm font-light rounded-sm"
                                placeholder="ENTER ACCESS CODE"
                                autoFocus
                            />
                        </div>

                        {error && <p className="text-red-400 text-xs tracking-widest uppercase">{error}</p>}

                        <button
                            type="submit"
                            className="group relative flex w-full items-center justify-center overflow-hidden bg-white px-8 py-3 transition-all duration-300 hover:bg-white/90 active:scale-[0.98] rounded-sm"
                        >
                            <span className="relative z-10 text-xs font-semibold uppercase tracking-[0.15em] text-black transition-colors">
                                Continue
                            </span>
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
