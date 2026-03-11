"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/*
 * Elicyon-Style Scroll Parallax — Performance Optimized
 */

const TEXT_LAYERS = [
    { text: "WE TRANSLATE", speedClass: "speed-1", yTarget: -800, style: "font-serif font-light text-[clamp(1.5rem,3.5vw,4.5rem)] uppercase tracking-wide" },
    { text: "DREAMS into tangible", speedClass: "speed-2", yTarget: -650, style: "font-serif font-light text-[clamp(1.5rem,3.5vw,4.5rem)] text-dark/80" },
    { text: "structures, CURATING", speedClass: "speed-3", yTarget: -500, style: "font-sans font-light text-[clamp(1.5rem,3.5vw,4.5rem)] tracking-widest text-dark" },
    { text: "EXCEPTIONAL LIFESTYLES", speedClass: "speed-4", yTarget: -350, style: "font-serif font-light text-[clamp(1.5rem,3.5vw,4.5rem)] uppercase tracking-wide text-dark" },
    { text: "through ARTISTRY,", speedClass: "speed-5", yTarget: -200, style: "font-serif font-light text-[clamp(1.5rem,3.5vw,4.5rem)] text-dark/80" },
    { text: "INTUITION, and rigorous", speedClass: "speed-6", yTarget: -50, style: "font-sans font-light text-[clamp(1.5rem,3.5vw,4.5rem)] tracking-wide text-dark" },
    { text: "DESIGN EXPERTISE.", speedClass: "speed-7", yTarget: 0, style: "font-serif font-normal text-[clamp(1.5rem,3.5vw,4.5rem)] uppercase tracking-widest" },
];

const FLOATING_IMAGES = [
    { src: "/project1.png", wrapperClass: "bottom-[15%] left-[-2%] w-[25vw] md:bottom-[5%] md:left-[8%] md:w-[16vw] aspect-[3/4] rounded-sm overflow-hidden", speed: -600 },
    { src: "/project2.png", wrapperClass: "top-[-2%] right-[-2%] w-[22vw] md:top-[10%] md:right-[5%] md:w-[20vw] aspect-[4/5] rounded-sm overflow-hidden", speed: -800 },
    { src: "/hero.png", wrapperClass: "top-[110%] left-[5%] w-[35vw] md:top-[110%] md:left-[15%] md:w-[24vw] aspect-[16/9] rounded-sm overflow-hidden opacity-90", speed: -1200 },
    { src: "/project1.png", wrapperClass: "top-[130%] right-[-2%] w-[20vw] md:top-[130%] md:right-[12%] md:w-[15vw] aspect-[3/4] rounded-sm overflow-hidden opacity-80", speed: -1500 },
];

export function ParallaxPhilosophy({ data }: { data?: any }) {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRefs = useRef<(HTMLDivElement | null)[]>([]);
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Merge Sanity Data with Fallbacks
    const hasData = !!data;
    const textLayers = hasData && data.textLayers
        ? data.textLayers.map((text: string, i: number) => ({
            ...TEXT_LAYERS[Math.min(i, TEXT_LAYERS.length - 1)],
            text,
        }))
        : TEXT_LAYERS;

    const urls = data?.floatingImageUrls || data?.imageUrls;
    const floatingImages = hasData && urls
        ? urls.map((url: string, i: number) => ({
            ...FLOATING_IMAGES[Math.min(i, FLOATING_IMAGES.length - 1)],
            src: url,
        }))
        : FLOATING_IMAGES;

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        // Scale down yTarget values on mobile for smoother animation
        const mobileScale = isMobile ? 0.5 : 1;

        const ctx = gsap.context(() => {
            
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "center center", 
                    end: isMobile ? "+=180%" : "+=250%",
                    pin: true,
                    scrub: isMobile ? 0.5 : 1,
                    fastScrollEnd: true,
                    preventOverlaps: true,
                }
            });

            // 1. Vertical Shatter & Fade Out — scaled for mobile
            textRefs.current.forEach((layer, i) => {
                if (!layer) return;
                
                const styleData = textLayers[i];
                const isAnchor = i >= textLayers.length - 2;
                
                tl.to(layer, {
                    y: styleData.yTarget * mobileScale,
                    opacity: isAnchor ? 1 : 0, 
                    ease: "power1.inOut"
                }, 0);
            });

            // 2. Image Parallax — scaled for mobile
            imageRefs.current.forEach((img, i) => {
                if (!img) return;
                
                const styleData = floatingImages[i];
                tl.to(img, {
                    y: styleData.speed * mobileScale,
                    ease: "none",
                }, 0);
            });

        }, sectionRef);

        return () => ctx.revert();
    }, [textLayers, floatingImages]);

    return (
        <section
            ref={sectionRef}
            className="relative bg-cream min-h-[120vh] md:min-h-screen overflow-hidden flex items-center justify-center py-[10vh] md:py-[20vh]"
        >
            {/* Background Texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

            {/* Floating Portal Images */}
            {floatingImages.map((img: any, i: number) => (
                <div
                    key={i}
                    ref={(el) => { imageRefs.current[i] = el; }}
                    className={`absolute z-[1] overflow-hidden mix-blend-multiply will-change-transform ${img.wrapperClass}`}
                >
                    <Image src={img.src} alt="" fill sizes="(max-width: 768px) 35vw, 24vw" className="object-cover" />
                </div>
            ))}

            {/* Container */}
            <div 
                ref={containerRef}
                className="relative z-[10] w-full max-w-[90vw] md:max-w-[70vw] mx-auto text-center flex flex-col items-center justify-center transition-all duration-700 leading-[1.2] md:leading-[1.1]"
            >
                {textLayers.map((layer: any, i: number) => (
                    <div
                        key={i}
                        ref={(el) => { textRefs.current[i] = el; }}
                        className={`will-change-transform pt-1 md:pt-2 ${layer.style}`}
                    >
                        {layer.text}
                    </div>
                ))}
            </div>
            
            {/* Vignettes */}
            <div className="absolute top-0 inset-x-0 h-[20vh] bg-gradient-to-b from-cream to-transparent z-[20] pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-[20vh] bg-gradient-to-t from-cream to-transparent z-[20] pointer-events-none" />
        </section>
    );
}
