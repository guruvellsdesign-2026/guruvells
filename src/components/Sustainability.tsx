"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { RevealText } from "@/components/animations/RevealText";
import { ParallaxImage } from "@/components/animations/ParallaxImage";

export function Sustainability({ data }: { data?: any }) {
    const sectionRef = useRef<HTMLElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);

    // CMS data with fallbacks
    const hasData = !!data;
    const sectionLabel = hasData ? (data.sectionLabel ?? "") : "( 03 ) — Sustainability";
    const headingLines = hasData && data.headingLines ? data.headingLines : ["Designs That", "Sustain Life"];
    const bodyParagraphs = hasData && data.bodyParagraphs ? data.bodyParagraphs : [
        "Guruvells is committed to revolutionizing architecture through sustainability. Each project embodies our dedication to environmental stewardship, leveraging innovative technologies and green practices that set new standards for the industry.",
        "We embrace the spirit of unity, recognizing that each project presents a unique opportunity to create something exceptional that harmonizes with nature.",
    ];
    const imageUrl = hasData ? (data.imageUrl ?? "") : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop";
    const buttonText = hasData ? (data.buttonText ?? "") : "Sustainability";

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.fromTo(bodyRef.current, { y: 40, opacity: 0 }, {
                y: 0, opacity: 1, duration: 1, ease: "power3.out",
                scrollTrigger: { trigger: bodyRef.current, start: "top 85%" },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="section-light relative w-full py-32 md:py-48 px-8 lg:px-16 overflow-hidden bg-cream"
        >
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                {/* Left: Image — constrained size with scale reveal */}
                <div className="w-[85%] mx-auto lg:w-full lg:max-w-lg lg:mx-0">
                    <ParallaxImage
                        src={imageUrl}
                        alt="Sustainable Design"
                        containerClassName="relative w-full aspect-[3/4] overflow-hidden"
                        scaleReveal
                    />
                </div>

                {/* Right: Text */}
                <div className="flex flex-col gap-8">
                    <span className="section-label text-dark/40">
                        {sectionLabel}
                    </span>
                    <RevealText
                        lines={headingLines}
                        className="font-serif text-[clamp(2rem,6vw,4rem)] md:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.02em] text-dark"
                    />
                    <div ref={bodyRef} className="flex flex-col gap-6 opacity-0">
                        {bodyParagraphs.map((para: string, idx: number) => (
                            <p key={idx} className="font-sans text-sm md:text-base leading-[1.8] text-dark/60 max-w-lg">
                                {para}
                            </p>
                        ))}
                        <div className="mt-4">
                            <button className="pill-button">
                                {buttonText}
                                <span className="text-bronze">→</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
