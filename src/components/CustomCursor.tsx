"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        // Only show custom cursor on non-touch devices
        if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
            return;
        }

        const cursor = cursorRef.current;
        if (!cursor) return;

        // Make sure it's visible initially when script runs
        gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 1 });

        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.15,
                ease: "power2.out",
            });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Expand cursor on interactive elements
            if (
                target.tagName.toLowerCase() === "button" ||
                target.tagName.toLowerCase() === "a" ||
                target.closest("button") ||
                target.closest("a") ||
                target.classList.contains("interactive")
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-4 h-4 rounded-full bg-bronze mix-blend-difference pointer-events-none z-[100] hidden md:block"
            style={{
                transform: `scale(${isHovering ? 3 : 1})`,
                opacity: isHovering ? 0.6 : 1,
                transition: 'transform 0.3s ease, opacity 0.3s ease',
            }}
        />
    );
}
