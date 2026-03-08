"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

interface RevealTextProps {
    lines: string[];
    className?: string;
    delay?: number;
    stagger?: number;
    triggerStart?: string;
}

export function RevealText({
    lines,
    className = "",
    delay = 0,
    stagger = 0.1,
    triggerStart = "top 85%",
}: RevealTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (containerRef.current) {
            const ctx = gsap.context(() => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: triggerStart,
                    },
                    delay: delay,
                });

                // Spec: yPercent: 100 → 0, power3.out, stagger: 0.1
                lineRefs.current.forEach((line, i) => {
                    if (line) {
                        const inner = line.querySelector(".reveal-line-inner");
                        if (inner) {
                            tl.fromTo(
                                inner,
                                { yPercent: 100 },
                                {
                                    yPercent: 0,
                                    duration: 1.2,
                                    ease: "power3.out",
                                },
                                i * stagger
                            );
                        }
                    }
                });
            }, containerRef);

            return () => ctx.revert();
        }
    }, [delay, stagger, triggerStart]);

    return (
        <div ref={containerRef} className={`flex flex-col ${className}`}>
            {lines.map((text, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        lineRefs.current[i] = el;
                    }}
                    className="overflow-hidden"
                >
                    <div className="reveal-line-inner inline-block w-full">
                        {text}
                    </div>
                </div>
            ))}
        </div>
    );
}
