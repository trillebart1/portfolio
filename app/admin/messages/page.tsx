'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Calendar, User } from 'lucide-react';

interface Message {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
    read: boolean;
}

export default function MessagesPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        const res = await fetch('/api/contact');
        if (res.ok) {
            const data = await res.json();
            setMessages(data);
        }
        setLoading(false);
    };

    if (loading) return <div className="p-16 text-white">Loading...</div>;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-8 md:p-16">
            <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-4">
                    <Link href="/admin" className="text-neutral-500 hover:text-white transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-3xl font-light uppercase tracking-widest">Inbox</h1>
                </div>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
                {messages.length === 0 ? (
                    <div className="text-center text-neutral-500 py-20 bg-neutral-900/30 rounded border border-neutral-800">
                        <Mail size={48} className="mx-auto mb-4 opacity-20" />
                        <p>No messages yet.</p>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <div key={msg.id} className="bg-neutral-900 border border-neutral-800 rounded p-6 hover:border-neutral-700 transition-colors">
                            <div className="flex flex-col md:flex-row justify-between md:items-start mb-4 gap-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-neutral-800 rounded-full text-neutral-400">
                                        <User size={16} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{msg.name}</h3>
                                        <a href={`mailto:${msg.email}`} className="text-emerald-500 hover:underline text-sm font-mono">{msg.email}</a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-neutral-500 text-xs font-mono">
                                    <Calendar size={12} />
                                    <span>{new Date(msg.createdAt).toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="pl-0 md:pl-12">
                                <p className="text-neutral-300 leading-relaxed whitespace-pre-wrap text-sm border-l-2 border-neutral-700 pl-4 py-1">
                                    {msg.message}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
