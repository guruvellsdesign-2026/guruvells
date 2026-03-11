"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";

export function ParallaxCta({ data }: { data?: any }) {
    const sectionRef = useRef<HTMLElement>(null);
    const ctaTlRef = useRef<gsap.core.Timeline | null>(null);
    const router = useRouter();

    // CMS data with fallbacks
    const hasData = !!data;
    const label = hasData ? (data.label ?? "") : "GET STARTED";
    const heading = hasData ? (data.heading ?? "") : "Let's make things happen.";
    const buttonText = hasData ? (data.buttonText ?? "") : "Make it happen";

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!sectionRef.current) return;

        const columns = sectionRef.current.querySelectorAll('.img-column');
        const wipe = sectionRef.current.querySelector('.white-wipe');
        const ctaText = sectionRef.current.querySelector('.cta-text');
        const isMobile = window.innerWidth < 768;

        const ctx = gsap.context(() => {
            ctaTlRef.current = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: isMobile ? "+=120%" : "+=200%",
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    scrub: isMobile ? 0.3 : 1,
                    invalidateOnRefresh: true,
                    fastScrollEnd: true,
                    preventOverlaps: true,
                    onToggle: (self) => {
                        const cols = sectionRef.current?.querySelectorAll('.img-column');
                        cols?.forEach(el => {
                            (el as HTMLElement).style.willChange = self.isActive ? 'transform' : 'auto';
                        });
                    },
                }
            });

            ctaTlRef.current.to(columns, {
                y: "-100vh",
                ease: "none",
                duration: 1,
                force3D: true,
                stagger: {
                    amount: isMobile ? 0.15 : 0.3,
                    from: "random"
                }
            });

            ctaTlRef.current.to(wipe, {
                height: "100%",
                ease: "power2.inOut",
                duration: 0.8
            }, ">")
                .to(ctaText, {
                    color: "var(--dark)",
                    ease: "none",
                    duration: 0.8
                }, "<");

            // Delay ScrollTrigger refresh to avoid layout thrashing
            requestAnimationFrame(() => {
                ScrollTrigger.refresh();
            });

        }, sectionRef);

        return () => {
            ctx.revert();
            if (ctaTlRef.current) {
                ctaTlRef.current.kill();
            }
        };
    }, []);

    // Use CMS images if available, or fallback to hardcoded
    const defaultImages = [
        [
            "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=400",
            ""
        ],
        [
            "",
            "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=400"
        ],
        [
            "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400",
            ""
        ],
        [
            "",
            "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=400"
        ],
        [
            "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?q=80&w=400",
            ""
        ]
    ];

    // If CMS provides column images, distribute them into the 5-column layout
    const images = data?.columnImageUrls?.length > 0
        ? data.columnImageUrls.reduce((acc: string[][], url: string, i: number) => {
            const colIdx = i % 5;
            const rowIdx = Math.floor(i / 5);
            if (!acc[colIdx]) acc[colIdx] = ["", ""];
            acc[colIdx][rowIdx % 2] = url;
            return acc;
        }, [["", ""], ["", ""], ["", ""], ["", ""], ["", ""]])
        : defaultImages;

    const paddings = ["20vh", "50vh", "10vh", "40vh", "25vh"];

    // Split heading into two lines at line break or midpoint
    const headingParts = heading.includes('\n')
        ? heading.split('\n')
        : [heading.slice(0, heading.lastIndexOf(' ')), heading.slice(heading.lastIndexOf(' ') + 1)];

    return (
        <section
            ref={sectionRef}
            className="h-screen w-full bg-dark relative overflow-hidden flex items-center justify-center -mt-[1px]"
        >
            {/* Image columns for parallax effect behind the wipe */}
            <div className="absolute top-0 left-0 w-full h-full flex justify-between gap-[1px] z-10 opacity-80">
                {images.map((col: string[], i: number) => (
                    <div
                        key={i}
                        className="img-column flex-1 flex flex-col gap-[10vh] border-r border-white/5 last:border-r-0 translate-y-[100vh]"
                        style={{ paddingTop: paddings[i] }}
                    >
                        {col.map((img: string, j: number) => (
                            <div
                                key={j}
                                className="w-full pt-[130%] bg-[#1a1a1a] bg-cover bg-center"
                                style={img ? { backgroundImage: `url(${img})` } : { backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)' }}
                            />
                        ))}
                    </div>
                ))}
            </div>

            {/* The white mask that wipes up */}
            <div className="white-wipe absolute bottom-0 left-0 w-full h-[0%] bg-cream z-20" />

            {/* CTA Text - Now Clickable */}
            <div
                className="cta-text absolute z-30 flex flex-col items-center justify-center text-center text-white text-[7vw] md:text-[5vw] leading-[1.1] font-light tracking-[-0.04em] cursor-pointer group"
                onClick={() => router.push('/contact')}
            >
                <span className="block text-[0.7rem] md:text-[0.8rem] font-medium uppercase tracking-[0.15em] mb-4 text-inherit transition-transform duration-300 group-hover:-translate-y-1">
                    {label}
                </span>
                <div className="relative pointer-events-none">
                    <span className="relative z-10 transition-opacity duration-300 group-hover:opacity-10">
                        {headingParts[0]}<br />{headingParts[1] || ''}
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                        <div className="px-6 py-2 border border-current rounded-full text-[0.85vw] font-medium uppercase tracking-widest bg-transparent mix-blend-difference pointer-events-auto">
                            {buttonText}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
