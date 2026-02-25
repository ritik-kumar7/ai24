import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
    const cursorRef = useRef(null);

    useEffect(() => {
        const updateCursorPosition = (e) => {
            if (cursorRef.current) {
                cursorRef.current.style.left = `${e.clientX}px`;
                cursorRef.current.style.top = `${e.clientY}px`;
            }
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
                cursorRef.current?.classList.add('hovering');
            } else {
                cursorRef.current?.classList.remove('hovering');
            }
        };

        window.addEventListener('mousemove', updateCursorPosition);
        document.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateCursorPosition);
            document.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return <div ref={cursorRef} className="custom-cursor" />;
};
