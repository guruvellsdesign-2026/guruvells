"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { RevealText } from "@/components/animations/RevealText";
import { ParallaxImage } from "@/components/animations/ParallaxImage";

interface AboutProps {
    heading: string;
    body: string;
    images: { src: string; alt: string }[];
}

export function About({ heading, body, images }: AboutProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Body text reveal
            gsap.fromTo(
                bodyRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: bodyRef.current, start: "top 85%" },
                }
            );

            // Horizontal divider line draw
            if (dividerRef.current) {
                gsap.fromTo(
                    dividerRef.current,
                    { scaleX: 0 },
                    {
                        scaleX: 1, duration: 1.5, ease: "power3.inOut",
                        scrollTrigger: { trigger: dividerRef.current, start: "top 90%" },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Split heading into lines for RevealText
    const headingLines = heading.split("\n");

    return (
        <section
            ref={sectionRef}
            className="section-light relative w-full py-24 md:py-48 px-6 md:px-8 lg:px-16"
        >
            <div className="max-w-7xl mx-auto">
                {/* Section Index + Divider Line */}
                <div className="flex items-center gap-6 mb-16 md:mb-24">
                    <span className="metadata-label !mb-0 !opacity-60">( 01 )</span>
                    <div
                        ref={dividerRef}
                        className="flex-1 h-[1px] bg-dark/10 origin-left"
                    />
                    <span className="metadata-label !mb-0 !opacity-60">About</span>
                </div>

                {/* Editorial Grid: Text Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 mb-20 md:mb-32">
                    {/* Left: Large Heading with RevealText — 7 cols */}
                    <div className="lg:col-span-7 lg:border-r lg:border-dark/8 lg:pr-16">
                        <RevealText
                            lines={headingLines}
                            className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.02em] text-dark"
                        />
                    </div>

                    {/* Right: Body + Button + Metadata — 5 cols */}
                    <div ref={bodyRef} className="lg:col-span-5 lg:pl-16 flex flex-col justify-end gap-8 opacity-0">
                        <p className="font-sans text-sm md:text-base leading-[1.8] text-dark/60 max-w-lg">
                            {body}
                        </p>

                        {/* Metadata row */}
                        <div className="flex gap-12 pt-6 border-t border-dark/8">
                            <div>
                                <span className="metadata-label">Discipline</span>
                                <span className="metadata-value">Architecture</span>
                            </div>
                            <div>
                                <span className="metadata-label">Scope</span>
                                <span className="metadata-value">Design & Build</span>
                            </div>
                            <div>
                                <span className="metadata-label">Practice</span>
                                <span className="metadata-value">Since 2024</span>
                            </div>
                        </div>

                        <div>
                            <button className="pill-button">
                                About Us
                                <span className="text-bronze">→</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Staggered Image Pair — editorial offset with structural borders */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start max-w-6xl mx-auto">
                    {/* Image 1 — full bleed, with scale reveal */}
                    <div className="border border-dark/5 p-2">
                        <ParallaxImage
                            src={images[0]?.src || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1931&auto=format&fit=crop"}
                            alt={images[0]?.alt || "Architecture"}
                            containerClassName="relative w-full aspect-[4/5] overflow-hidden"
                            scaleReveal
                        />
                        <div className="mt-3 px-1">
                            <span className="metadata-label">Fig. 01</span>
                            <span className="metadata-value text-dark/40">Material & Form</span>
                        </div>
                    </div>

                    {/* Image 2 — offset down for editorial asymmetry */}
                    <div className="md:mt-20 lg:mt-32 border border-dark/5 p-2">
                        <ParallaxImage
                            src={images[1]?.src || "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2165&auto=format&fit=crop"}
                            alt={images[1]?.alt || "Architecture"}
                            containerClassName="relative w-full aspect-[4/5] overflow-hidden"
                            scaleReveal
                        />
                        <div className="mt-3 px-1">
                            <span className="metadata-label">Fig. 02</span>
                            <span className="metadata-value text-dark/40">Light & Structure</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
