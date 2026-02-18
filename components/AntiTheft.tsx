'use client';

import { useEffect, useState } from 'react';
import { ShieldAlert } from 'lucide-react';

export default function AntiTheft() {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // 1. Block Right Click & Trigger Shake
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            document.body.classList.add('shake-active');
            setTimeout(() => document.body.classList.remove('shake-active'), 500);
        };

        // 2. Prevent Dragging Images
        const handleDragStart = (e: DragEvent) => {
            e.preventDefault();
        };

        // 3. Screenshot Countermeasures
        const handleScreenshotKey = (e: KeyboardEvent) => {
            if (e.key === 'PrintScreen' ||
                (e.ctrlKey && e.key === 'p') ||
                (e.ctrlKey && e.shiftKey && e.key === 'S') ||
                (e.metaKey && e.shiftKey && e.key === '3') || // Mac
                (e.metaKey && e.shiftKey && e.key === '4')    // Mac
            ) {
                // Show Modal
                setShowModal(true);

                // Attempt to overwrite clipboard (silently fail if denied)
                try {
                    navigator.clipboard.writeText('© Tolgahan Tokatlı Portfolio - Protected Content');
                } catch (err) {
                    // Ignore clipboard errors
                }

                // Hide after 3 seconds
                setTimeout(() => {
                    setShowModal(false);
                }, 3000);
            }
        };

        window.addEventListener('keydown', handleScreenshotKey);
        window.addEventListener('keyup', handleScreenshotKey); // Catch both to be sure
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('dragstart', handleDragStart);

        return () => {
            window.removeEventListener('keydown', handleScreenshotKey);
            window.removeEventListener('keyup', handleScreenshotKey);
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('dragstart', handleDragStart);
        };
    }, []);

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-[#1c1c1e] border border-white/10 p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-6 max-w-sm text-center transform scale-100 animate-in zoom-in-95 duration-200">
                <div className="p-4 rounded-full bg-red-500/10 text-red-500">
                    <ShieldAlert size={48} strokeWidth={1.5} />
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-medium text-white tracking-wide">Protected Content</h3>
                    <p className="text-sm text-gray-400 font-light leading-relaxed">
                        © Tolgahan Tokatlı Portfolio<br />
                        Screenshots and recording are disabled.
                    </p>
                </div>
            </div>
        </div>
    );
}
