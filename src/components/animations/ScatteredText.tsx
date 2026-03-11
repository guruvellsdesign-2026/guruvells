"use client";

import { useEffect, useRef } from "react";
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

    // Split into words, then characters, to prevent mid-word wrapping
    const words = text.split(" ").map(word => {
        return word.split("").map(char => ({ char, isSpace: false }));
    });

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (containerRef.current && charsRef.current.length > 0) {
            const isMobile = window.matchMedia("(max-width: 768px)").matches;
            const scatterRange = isMobile ? 120 : 500;

            const ctx = gsap.context(() => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: startPos,
                        end: endPos,
                        scrub: isMobile ? 0.5 : 1,
                        fastScrollEnd: true,
                    },
                });

                // Spec: each character gets random x, y, rotation.
                // Animate FROM scattered state TO natural DOM position.
                charsRef.current.forEach((charEl) => {
                    if (charEl) {
                        tl.fromTo(
                            charEl,
                            {
                                x: gsap.utils.random(-scatterRange, scatterRange),
                                y: gsap.utils.random(-scatterRange, scatterRange),
                                rotation: gsap.utils.random(-90, 90),
                                opacity: 0,
                            },
                            {
                                x: 0,
                                y: 0,
                                rotation: 0,
                                opacity: 1,
                                ease: "power1.inOut",
                            },
                            0 // All characters animate simultaneously on the timeline
                        );
                    }
                });
            }, containerRef);

            return () => ctx.revert();
        }
    }, [startPos, endPos]);

    let charIndex = 0;

    return (
        <div
            ref={containerRef}
            className={containerClassName}
            style={{ minHeight: typeof window !== 'undefined' && window.innerWidth < 768 ? '120vh' : '150vh' }}
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
                                    className="inline-block will-change-transform"
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
