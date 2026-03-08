"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export interface ProjectSlide {
    title: string;
    location: string;
    status: string;
    image: string;
    year: string;
    discipline: string;
    slug?: string;
}

interface ProjectFullscreenSliderProps {
    projects: ProjectSlide[];
}

export function ProjectFullscreenSlider({ projects }: ProjectFullscreenSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const router = useRouter();

    const animatingRef = useRef(false);
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);

    const slide = projects[currentIndex];
    const slug = slide.slug || slide.title.toLowerCase().replace(/\s+/g, '-');

    const paginate = useCallback((newDirection: number) => {
        if (animatingRef.current) return;
        animatingRef.current = true;

        setDirection(newDirection);
        let nextIndex = currentIndex + newDirection;
        if (nextIndex < 0) nextIndex = projects.length - 1;
        if (nextIndex >= projects.length) nextIndex = 0;
        setCurrentIndex(nextIndex);

        setTimeout(() => {
            animatingRef.current = false;
        }, 1200); // 1.2s cooldown to prevent trackpad scroll spam
    }, [currentIndex, projects.length]);

    const handleWheel = (e: React.WheelEvent) => {
        if (Math.abs(e.deltaY) > 30 || Math.abs(e.deltaX) > 30) {
            const dir = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
            paginate(dir > 0 ? 1 : -1);
        }
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;

        const deltaX = touchStartX.current - touchEndX;
        const deltaY = touchStartY.current - touchEndY;

        if (Math.abs(deltaX) > 40 || Math.abs(deltaY) > 40) {
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                paginate(deltaX > 0 ? 1 : -1);
            } else {
                paginate(deltaY > 0 ? 1 : -1);
            }
        }
    };

    const variants: Variants = {
        enter: (direction: number) => {
            return {
                x: direction > 0 ? 100 : -100,
                opacity: 0,
                scale: 0.95
            };
        },
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
                scale: { duration: 0.5, ease: "easeOut" }
            }
        },
        exit: (direction: number) => {
            return {
                zIndex: 0,
                x: direction < 0 ? 100 : -100,
                opacity: 0,
                scale: 0.95,
                transition: {
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.4 },
                    scale: { duration: 0.4 }
                }
            };
        }
    };

    return (
        <div
            className="relative w-full h-[100svh] bg-dark text-cream overflow-hidden selection:bg-bronze selection:text-cream"
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >

            {/* Soft Ambient Background Blur */}
            <div className="absolute inset-0 z-0 opacity-20 transition-opacity duration-1000 blur-3xl scale-125 pointer-events-none">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="w-full h-full"
                    >
                        <Image
                            src={slide.image}
                            alt="ambient background"
                            fill
                            unoptimized
                            className="object-cover"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Main Central Image Slider */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 md:p-12 lg:p-24 pb-32">
                <div
                    className="relative w-full max-w-2xl lg:max-w-4xl aspect-[4/3] md:aspect-video lg:aspect-[16/10] overflow-hidden cursor-pointer group"
                    onClick={() => router.push(`/projects/${slug}`)}
                >
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="absolute inset-0 w-full h-full"
                        >
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                priority
                                unoptimized
                                className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors duration-500" />
                        </motion.div>
                    </AnimatePresence>

                    {/* Hover Explore Label */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <span className="font-serif text-sm tracking-[0.3em] uppercase bg-dark/80 px-6 py-3 border border-cream/20 backdrop-blur-sm rounded-full">
                            Explore Project
                        </span>
                    </div>
                </div>

                {/* Title & Under-Image Meta */}
                <div className="mt-8 text-center z-20 relative">
                    <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl uppercase tracking-widest mb-3">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={currentIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="inline-block"
                            >
                                {slide.title}
                            </motion.span>
                        </AnimatePresence>
                    </h2>
                    <div className="flex items-center justify-center gap-4 text-[10px] uppercase font-sans tracking-[0.2em] text-cream/50">
                        <span>{slide.location}</span>
                        <span className="w-1 h-1 bg-cream/30 rounded-full"></span>
                        <span>{slide.discipline}</span>
                        <span className="text-cream/30">— {slide.year}</span>
                    </div>
                </div>
            </div>

            {/* --- Corner Metadata Overlay --- */}

            {/* Top Left: Discipline & Label */}
            <div className="absolute top-8 left-6 md:top-12 md:left-12 z-20 pointer-events-none">
                <span className="block font-serif text-2xl md:text-3xl mb-1 uppercase">{slide.discipline}</span>
                <span className="metadata-label !text-cream/50">SELECTED PROJECT</span>
            </div>

            {/* Top Right: Counter */}
            <div className="absolute top-8 right-6 md:top-12 md:right-12 z-20 font-serif text-xl md:text-2xl pointer-events-none">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {currentIndex + 1}
                    </motion.span>
                </AnimatePresence>
                <span className="text-cream/30 mx-2">/</span>
                <span className="text-cream/50">{projects.length}</span>
            </div>

            {/* Bottom Left: Pagination Controls */}
            <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 z-20 flex gap-6">
                <button
                    onClick={() => paginate(-1)}
                    className="metadata-label !text-cream/50 hover:!text-cream transition-colors duration-300 pointer-events-auto"
                >
                    PREV
                </button>
                <button
                    onClick={() => paginate(1)}
                    className="metadata-label !text-cream/50 hover:!text-cream transition-colors duration-300 pointer-events-auto"
                >
                    NEXT
                </button>
            </div>

            {/* Bottom Right: Bar Chart Indicator */}
            <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 z-20 flex items-end gap-[6px] md:gap-2 h-8 pointer-events-none">
                {projects.map((_, i) => (
                    <div
                        key={i}
                        className={`w-px transition-all duration-500 rounded-full ${i === currentIndex
                            ? "h-8 bg-cream"
                            : "h-4 bg-cream/20"
                            }`}
                    />
                ))}
            </div>

        </div>
    );
}
