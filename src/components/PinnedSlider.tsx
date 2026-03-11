"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Slide {
    title: string;
    location: string;
    status: string;
    image: string;
    slug?: string;
}

interface PinnedSliderProps {
    slides: Slide[];
}

export function PinnedSlider({ slides }: PinnedSliderProps) {
    const containerRef = useRef<HTMLElement>(null);
    const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
    const counterRef = useRef<HTMLSpanElement>(null);
    const router = useRouter();

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!containerRef.current || slidesRef.current.length < 2) return;

        const ctx = gsap.context(() => {
            const totalSlides = slides.length;

            ScrollTrigger.matchMedia({
                // Desktop: full pinned clip-path slider
                "(min-width: 769px)": () => {
                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top top",
                            end: `+=${totalSlides * 100}%`,
                            pin: true,
                            scrub: 0.8,
                            fastScrollEnd: true,
                            onUpdate: (self) => {
                                if (counterRef.current) {
                                    const idx = Math.min(
                                        Math.floor(self.progress * totalSlides),
                                        totalSlides - 1
                                    );
                                    counterRef.current.textContent = String(idx + 1).padStart(2, "0");
                                }
                            },
                        },
                    });

                    // Each subsequent slide reveals via clip-path from top
                    for (let i = 1; i < totalSlides; i++) {
                        const slide = slidesRef.current[i];
                        if (slide) {
                            gsap.set(slide, { clipPath: "inset(100% 0 0 0)" });

                            tl.to(slide, {
                                clipPath: "inset(0% 0 0 0)",
                                duration: 1,
                                ease: "power2.inOut",
                            });

                            tl.to({}, { duration: 0.3 });
                        }
                    }
                },

                // Mobile: simple vertical stack, no pinning
                "(max-width: 768px)": () => {
                    // No pinning — slides are already stacked vertically via CSS
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, [slides]);

    return (
        <section
            ref={containerRef}
            className="section-dark relative w-full"
        >
            {/* Progress counter — desktop only */}
            <div className="hidden md:flex absolute top-8 right-8 lg:right-16 z-20 items-center gap-3">
                <span className="text-[9px] tracking-[0.3em] font-sans uppercase text-cream/30">
                    (
                </span>
                <span
                    ref={counterRef}
                    className="font-sans text-sm tracking-[0.15em] text-cream/60 tabular-nums"
                >
                    01
                </span>
                <span className="text-cream/20 font-sans text-sm">/</span>
                <span className="font-sans text-sm tracking-[0.15em] text-cream/30 tabular-nums">
                    {String(slides.length).padStart(2, "0")}
                </span>
                <span className="text-[9px] tracking-[0.3em] font-sans uppercase text-cream/30">
                    )
                </span>
            </div>

            {/* Slides */}
            <div className="relative w-full h-screen md:h-screen">
                {slides.map((slide, i) => {
                    const slug = slide.slug || slide.title.toLowerCase().replace(/\s+/g, '-');
                    return (
                        <div
                            key={i}
                            ref={(el) => { slidesRef.current[i] = el; }}
                            className={`
                                ${i === 0 ? "relative" : "absolute inset-0"}
                                w-full h-screen flex items-end cursor-pointer group
                            `}
                            style={{ zIndex: i + 1 }}
                            onClick={() => router.push(`/projects/${slug}`)}
                        >
                            {/* Background image — full bleed */}
                            <div className="absolute inset-0 w-full h-full overflow-hidden">
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    sizes="100vw"
                                />
                                {/* Dark overlay for text legibility */}
                                <div className="absolute inset-0 bg-dark/50" />
                            </div>

                            {/* Slide content */}
                            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-8 lg:px-16 pb-12 md:pb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 md:gap-8">
                                {/* Left: project info */}
                                <div className="flex flex-col gap-2 md:gap-4">
                                    <span className="text-[10px] tracking-[0.3em] font-sans uppercase text-cream/40">
                                        ( {String(i + 1).padStart(2, "0")} )
                                    </span>
                                    <h3 className="font-serif heading-xl text-cream whitespace-pre-line">
                                        {slide.title}
                                    </h3>
                                </div>

                                {/* Right: meta */}
                                <div className="flex flex-col items-start md:items-end gap-2 text-left md:text-right">
                                    <span className="text-[10px] tracking-[0.2em] font-sans uppercase text-cream/50">
                                        {slide.location}
                                    </span>
                                    <span className="text-[9px] tracking-[0.2em] font-sans uppercase text-cream/30">
                                        {slide.status}
                                    </span>
                                    <button className="pill-button mt-4 text-cream border-cream/30 group-hover:bg-cream group-hover:text-dark transition-colors">
                                        View Project →
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Section label */}
            <div className="hidden md:block absolute bottom-8 left-8 lg:left-16 z-20">
                <span className="text-[9px] tracking-[0.3em] font-sans uppercase text-cream/20">
                    Featured Projects — Scroll to Explore
                </span>
            </div>
        </section>
    );
}
