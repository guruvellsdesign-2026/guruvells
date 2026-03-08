"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { useRouter } from "next/navigation";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface Slide {
    title: string;
    location: string;
    status: string;
    image: string;
    agency?: string;
    client?: string;
    description?: string;
    slug?: string;
}

interface HorizontalProjectSliderProps {
    slides?: Slide[];
    data?: any;
}

export function HorizontalProjectSlider({ slides, data }: HorizontalProjectSliderProps) {
    const displaySlides = data?.projects || slides || [];
    
    const containerRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLDivElement>(null);
    const progressLineRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (!containerRef.current || !trackRef.current || displaySlides.length < 2) return;

        const ctx = gsap.context(() => {
            const track = trackRef.current!;
            const endScroll = window.innerWidth * (displaySlides.length - 1);

            // Tween moving the entire track wrapper to the left
            const hTween = gsap.to(track, {
                x: () => -endScroll,
                ease: "none"
            });

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: () => `+=${endScroll}`,
                pin: true,
                animation: hTween,
                scrub: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    // 1. Safe Counter Update
                    if (counterRef.current) {
                        const currentSlide = Math.min(
                            displaySlides.length,
                            Math.floor(self.progress * displaySlides.length) + 1
                        );
                        counterRef.current.textContent = `[${currentSlide}/${displaySlides.length}]`;
                    }
                }
            });

            // 2. Safe Scoped Progress Line animation
            if (progressLineRef.current) {
                gsap.to(progressLineRef.current, {
                    width: "100%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: () => `+=${endScroll}`,
                        scrub: 1,
                        invalidateOnRefresh: true
                    }
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, [displaySlides]);

    return (
        <section
            ref={containerRef}
            className="h-screen w-full bg-black overflow-hidden relative"
        >
            <div
                ref={trackRef}
                className="flex h-full"
                style={{ width: `${displaySlides.length * 100}vw` }}
            >
                {displaySlides.map((slide: any, i: number) => {
                    const titleWords = slide.title.split(' ');
                    const titleFirstHalf = titleWords.slice(0, Math.ceil(titleWords.length / 2)).join(' ');
                    const titleSecondHalf = titleWords.slice(Math.ceil(titleWords.length / 2)).join(' ');

                    return (
                        <div
                            key={i}
                            className="w-screen h-screen flex flex-col md:flex-row items-center justify-center flex-shrink-0 px-6 md:px-[6vw] relative pt-16 md:pt-0"
                        >
                            {/* Layout refactored to Flex instead of Absolute for robustness */}
                            
                            {/* 1. Left Column (Title & Project Number) */}
                            <div className="w-full md:w-[35%] flex flex-col z-20 mb-3 md:mb-0 pointer-events-none md:pr-[2vw]">
                                <p className="text-[0.65rem] md:text-[0.7rem] tracking-widest text-white/50 font-medium uppercase font-sans mb-3 md:mb-8">
                                    PROJECT {String(i + 1).padStart(2, "0")}
                                </p>
                                <h2 className="text-[clamp(1.5rem,4vw,4.5rem)] leading-[1.05] md:leading-[1.1] tracking-tight text-white font-sans flex flex-col">
                                    {/* Pure solid white top half */}
                                    <span className="relative z-20 whitespace-normal break-words">
                                        {titleFirstHalf}
                                    </span>
                                    {/* Transparent outlined bottom half */}
                                    <span 
                                        className="relative z-20 text-transparent whitespace-normal break-words block mt-[-2%]" 
                                        style={{ WebkitTextStroke: "1px rgba(255, 255, 255, 0.7)" }}
                                    >
                                        {titleSecondHalf}
                                    </span>
                                </h2>
                            </div>

                            {/* 2. Center Column (Image Artwork) */}
                            <div 
                                className="w-full h-[30vh] sm:h-[38vh] md:w-[45vw] md:h-[55vh] relative z-10 cursor-pointer group flex-shrink-0 overflow-hidden"
                                onClick={() => router.push(`/projects/${slide.slug || slide.title.toLowerCase().replace(/\s+/g, '-')}`)}
                            >
                                <Image
                                    src={slide.image || slide.imageUrl || ''}
                                    alt={slide.title}
                                    fill
                                    unoptimized
                                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                    sizes="(max-width: 768px) 100vw, 45vw"
                                    priority={i === 0}
                                />
                                {/* Overlay gradient & Hover Pill */}
                                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-30">
                                    <div className="px-6 py-2.5 bg-white text-black rounded-full font-sans text-[0.65rem] uppercase tracking-widest font-bold shadow-2xl">
                                        Explore
                                    </div>
                                </div>
                            </div>

                            {/* 3. Right Column (Categories & Description) */}
                            <div className="w-full md:w-[25%] z-20 flex flex-col items-start mt-4 md:mt-0 md:pl-12 lg:pl-16">
                                <ul className="flex flex-row flex-wrap items-start gap-x-4 gap-y-2 md:flex-col md:gap-2 mb-4 md:mb-8">
                                    <li className="text-[0.65rem] md:text-[0.7rem] uppercase tracking-widest font-medium text-white border-b border-white hover:border-white/50 pb-[2px] transition-colors cursor-pointer">
                                        PRODUCTION
                                    </li>
                                    <li className="text-[0.65rem] md:text-[0.7rem] uppercase tracking-widest font-medium text-white border-b border-white hover:border-white/50 pb-[2px] transition-colors cursor-pointer">
                                        {slide.location || 'INDIA'}
                                    </li>
                                    <li className="text-[0.65rem] md:text-[0.7rem] uppercase tracking-widest font-medium text-white border-b border-white hover:border-white/50 pb-[2px] transition-colors cursor-pointer">
                                        {slide.status || 'ACTIVE'}
                                    </li>
                                </ul>
                                <p className="hidden md:block text-[0.8rem] md:text-[0.85rem] leading-[1.6] text-white/70 font-light font-sans max-w-full">
                                    {slide.description || "A masterfully crafted space seamlessly blending tradition with tomorrow's innovations."}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Bottom Progress Bar & Counter */}
            <div className="absolute bottom-[4vh] md:bottom-[6vh] left-[6vw] right-[6vw] md:left-[8vw] md:right-[8vw] flex flex-col z-30 pointer-events-none">
                {/* Thin progress track */}
                <div className="w-full h-[1px] bg-white/15 flex items-center mb-4 md:mb-5 relative">
                    <div ref={progressLineRef} className="absolute left-0 top-0 bottom-0 bg-white w-0" />
                </div>

                {/* Bottom UI text */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-white/90 text-[0.65rem] md:text-[0.7rem] font-medium tracking-[0.15em] uppercase pointer-events-auto font-sans">
                    <div ref={counterRef} className="font-mono tracking-widest">
                        [1/{displaySlides.length}]
                    </div>
                    <div
                        className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors tracking-widest"
                        onClick={() => router.push('/projects')}
                    >
                        VIEW ALL PROJECTS ↗
                    </div>
                </div>
            </div>
        </section>
    );
}
