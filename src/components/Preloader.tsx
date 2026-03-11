"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function Preloader() {
    const [isComplete, setIsComplete] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const logoTextRef = useRef<HTMLHeadingElement>(null);
    const taglineRef = useRef<HTMLSpanElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const yearRef = useRef<HTMLDivElement>(null);
    const locationRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const counter = { value: 0 };

        // Lock scroll during preloader
        document.body.style.overflow = "hidden";

        // Initial states
        gsap.set(logoTextRef.current, { yPercent: 100, opacity: 0 });
        gsap.set(taglineRef.current, { opacity: 0, y: 20 });
        gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(yearRef.current, { opacity: 0, x: -20 });
        gsap.set(locationRef.current, { opacity: 0, x: 20 });

        const tl = gsap.timeline({
            onComplete: () => {
                document.body.style.overflow = "";
                requestAnimationFrame(() => setIsComplete(true));
            },
        });

        // === PHASE 1: Reveal ===
        // Logo sweeps up from below
        tl.to(logoTextRef.current, {
            yPercent: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
        }, 0.3);

        // Tagline fades in
        tl.to(taglineRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
        }, 0.8);

        // Corner details slide in
        tl.to(yearRef.current, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }, 0.6);
        tl.to(locationRef.current, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }, 0.6);

        // === PHASE 2: Loading ===
        // Progress bar grows
        tl.to(progressBarRef.current, {
            scaleX: 1,
            duration: 2.2,
            ease: "power1.inOut",
        }, 1.0);

        // Counter ticks
        tl.to(counter, {
            value: 100,
            duration: 2.2,
            ease: "power1.inOut",
            onUpdate: () => {
                if (counterRef.current) {
                    counterRef.current.textContent = String(Math.floor(counter.value));
                }
            },
        }, 1.0);

        // === PHASE 3: Exit ===
        // Fade out all content
        tl.to([logoTextRef.current, taglineRef.current, yearRef.current, locationRef.current, progressBarRef.current?.parentElement], {
            opacity: 0,
            y: -30,
            duration: 0.5,
            ease: "power3.in",
            stagger: 0.05,
        }, "+=0.3");

        // Overlay curtain rises
        tl.to(overlayRef.current, {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut",
        }, "-=0.2");

        return () => {
            tl.kill();
            document.body.style.overflow = "";
        };
    }, []);

    if (isComplete) return null;

    return (
        <div ref={containerRef} className="fixed inset-0 z-[200] pointer-events-auto">
            {/* Main Dark Overlay */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-dark flex flex-col items-center justify-center"
            >
                {/* Center Content */}
                <div className="relative flex flex-col items-center gap-6">
                    {/* Logo Text / Icon — clipped for sweep reveal */}
                    <div className="overflow-hidden">
                        <div ref={logoTextRef} className="flex flex-col items-center">
                            <h1 className="font-sans text-cream text-[18px] md:text-[24px] font-bold tracking-[0.3em] uppercase">
                                Guruvells
                            </h1>
                        </div>
                    </div>

                    {/* Tagline */}
                    <span
                        ref={taglineRef}
                        className="text-cream/40 font-sans text-[9px] md:text-[11px] tracking-[0.5em] uppercase"
                    >
                        Architecture &amp; Design
                    </span>

                    {/* Progress Bar */}
                    <div className="w-48 md:w-64 h-[1px] bg-cream/10 mt-8 relative">
                        <div
                            ref={progressBarRef}
                            className="absolute inset-0 bg-cream/60"
                        />
                    </div>
                </div>

                {/* Corner Details */}
                <div
                    ref={yearRef}
                    className="absolute bottom-8 left-8 md:left-12 font-sans text-[10px] tracking-[0.2em] text-cream/25 uppercase"
                >
                    <div>EST. 2024</div>
                    <div className="mt-1 text-cream/50">
                        <span ref={counterRef}>0</span>%
                    </div>
                </div>
                <div
                    ref={locationRef}
                    className="absolute bottom-8 right-8 md:right-12 font-sans text-[10px] tracking-[0.2em] text-cream/25 uppercase text-right"
                >
                    <div>Tamil Nadu</div>
                    <div className="mt-1">India</div>
                </div>
            </div>
        </div>
    );
}
