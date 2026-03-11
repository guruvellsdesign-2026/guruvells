"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

interface ScatteredTextProps {
    text: string;
    className?: string;
    containerClassName?: string;
    startPos?: string;
    endPos?: string;
}

export function ScatteredText({
    text,
    className = "",
    containerClassName = "relative w-full flex flex-wrap items-center justify-center px-4 md:px-8",
    startPos = "top 90%",
    endPos = "center center",
}: ScatteredTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    // Split into words, then characters, to prevent mid-word wrapping
    const words = text.split(" ").map(word => {
        return word.split("").map(char => ({ char, isSpace: false }));
    });

    // Detect mobile safely in useEffect (no SSR window access)
    useEffect(() => {
        setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    }, []);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (containerRef.current && charsRef.current.length > 0) {
            const scatterRange = isMobile ? 120 : 500;

            const ctx = gsap.context(() => {
                // Batch-set initial scattered state for all chars at once
                const validChars = charsRef.current.filter(Boolean) as HTMLSpanElement[];
                
                validChars.forEach((charEl) => {
                    gsap.set(charEl, {
                        x: gsap.utils.random(-scatterRange, scatterRange),
                        y: gsap.utils.random(-scatterRange, scatterRange),
                        rotation: gsap.utils.random(-90, 90),
                        opacity: 0,
                        force3D: true,
                    });
                });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: startPos,
                        end: endPos,
                        scrub: isMobile ? 0.3 : 1,
                        fastScrollEnd: true,
                    },
                });

                // Single timeline tween for all characters (more efficient)
                tl.to(validChars, {
                    x: 0,
                    y: 0,
                    rotation: 0,
                    opacity: 1,
                    ease: "power1.inOut",
                    force3D: true,
                    stagger: 0, // All at once on the timeline
                }, 0);
            }, containerRef);

            return () => ctx.revert();
        }
    }, [startPos, endPos, isMobile]);

    let charIndex = 0;

    return (
        <div
            ref={containerRef}
            className={containerClassName}
            style={{ minHeight: isMobile ? '120vh' : '150vh' }}
        >
            <div className={`flex flex-wrap items-center justify-center gap-x-[0.4em] gap-y-[0.1em] ${className}`}>
                {words.map((word, wordIdx) => (
                    <div key={`word-${wordIdx}`} className="inline-block whitespace-nowrap">
                        {word.map((item, charIdx) => {
                            const idx = charIndex++;
                            return (
                                <span
                                    key={`char-${charIdx}`}
                                    ref={(el) => {
                                        charsRef.current[idx] = el;
                                    }}
                                    className="inline-block"
                                    style={{ marginRight: charIdx === word.length - 1 ? 0 : "0.05em" }}
                                >
                                    {item.char}
                                </span>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
