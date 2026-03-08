"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

interface ParallaxImageProps {
    src: string;
    alt: string;
    containerClassName?: string;
    imageClassName?: string;
    speed?: number;
    priority?: boolean;
    scaleReveal?: boolean;
}

export function ParallaxImage({
    src,
    alt,
    containerClassName = "relative w-full h-full",
    imageClassName = "object-cover",
    speed = 0.15,
    priority = false,
    scaleReveal = false,
}: ParallaxImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (containerRef.current && imageRef.current) {
            const ctx = gsap.context(() => {
                // Spec: Image parallax "window" effect
                // Inner image is scale(1.2), animate yPercent from -15 to 15
                gsap.fromTo(
                    imageRef.current,
                    { yPercent: -15 * speed / 0.15 },
                    {
                        yPercent: 15 * speed / 0.15,
                        ease: "none",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    }
                );

                // Spec: Scale-in reveal
                // Animate outer wrapper scale from 0.8 → 1, borderRadius from 20px → 0
                if (scaleReveal && wrapperRef.current) {
                    gsap.fromTo(
                        wrapperRef.current,
                        {
                            scale: 0.8,
                            opacity: 0.6,
                            borderRadius: "20px",
                        },
                        {
                            scale: 1,
                            opacity: 1,
                            borderRadius: "0px",
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: wrapperRef.current,
                                start: "top 90%",
                                end: "center center",
                                scrub: 1,
                            },
                        }
                    );
                }
            }, containerRef);

            return () => ctx.revert();
        }
    }, [speed, scaleReveal]);

    const inner = (
        <div ref={containerRef} className={`overflow-hidden ${containerClassName}`}>
            {/* Spec: inner image must be scale(1.2) to give room for parallax travel */}
            <div
                ref={imageRef}
                className="absolute inset-0 w-full h-full"
                style={{ transform: "scale(1.2)" }}
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={imageClassName}
                    priority={priority}
                />
            </div>
        </div>
    );

    if (scaleReveal) {
        return (
            <div ref={wrapperRef} className="will-change-transform overflow-hidden">
                {inner}
            </div>
        );
    }

    return inner;
}
