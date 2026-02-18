'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        const handleMouseEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const tagName = target.tagName.toLowerCase();

            if (tagName === 'a' ||
                tagName === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                tagName === 'input' ||
                tagName === 'textarea') {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseEnter);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    scale: isHovered ? 1.5 : 1,
                    backgroundColor: isHovered ? 'white' : 'transparent',
                }}
            />
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    translateX: useSpring(cursorX, { damping: 40, stiffness: 1000 }), // Slightly delayed inner dot? No, actually let's just center it relative to the circle
                    translateY: useSpring(cursorY, { damping: 40, stiffness: 1000 }),
                    marginLeft: 12, // Offset to center within the 32px outer circle (16 - 4 = 12?) No, logic is x-16.
                    marginTop: 12,
                }}
            />
        </>
    );
}
