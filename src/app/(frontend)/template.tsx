"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isAnimating, setIsAnimating] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    const isStudio = pathname?.startsWith("/studio");

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    // Re-trigger animation on every route change — optimized timing
    useEffect(() => {
        if (isStudio) {
            setIsAnimating(false);
            return;
        }
        
        setIsAnimating(true);
        // Faster on mobile (1.5s), snappy on desktop (2s)
        const duration = isMobile ? 1500 : 2000;
        const timer = setTimeout(() => {
            setIsAnimating(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [pathname, isStudio, isMobile]);

    if (isStudio) {
        return <>{children}</>;
    }

    const animDuration = isMobile ? '1.5s' : '2s';

    return (
        <div className="relative w-full min-h-screen">
            
            {/* The actual page content stays mounted below the mask */}
            {children}

            {/* Global Page Transition Mask — GPU-optimized */}
            {isAnimating && (
                <div className="fixed inset-0 z-[999] pointer-events-none" style={{ contain: 'strict' }}>
                    <style dangerouslySetInnerHTML={{ __html: `
                        @keyframes introTextAnim {
                            0% { opacity: 0; transform: translate3d(0, 20px, 0); }
                            25% { opacity: 1; transform: translate3d(0, 0, 0); }
                            75% { opacity: 1; transform: translate3d(0, 0, 0); }
                            100% { opacity: 0; transform: translate3d(0, -20px, 0); }
                        }

                        @keyframes globalVelMaster {
                            0% { opacity: 0; transform: scale3d(1, 1, 1); }
                            30% { opacity: 0; transform: scale3d(1, 1, 1); }
                            40% { opacity: 1; transform: scale3d(1, 1, 1); }
                            55% { opacity: 1; transform: scale3d(0.75, 0.75, 1); }
                            100% { opacity: 1; transform: scale3d(500, 500, 1); }
                        }

                        .animate-global-vel {
                            animation: globalVelMaster ${animDuration} cubic-bezier(0.4, 0, 0.2, 1) forwards;
                            will-change: transform, opacity;
                            backface-visibility: hidden;
                            -webkit-backface-visibility: hidden;
                        }
                    `}} />

                    {/* Phases 2 & 3: Inline SVG Masking with Exact Vel Shape */}
                    <svg 
                        className="absolute inset-0 w-full h-full pointer-events-none" 
                        preserveAspectRatio="xMidYMid slice" 
                        viewBox="0 0 500 500"
                    >
                        <defs>
                            <mask id="global-vel-mask">
                                {/* White rect is the visible blue wall */}
                                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                                
                                {/* Black path punches the exact Vel hole. Centered in 500x500 viewBox */}
                                <g transform="translate(200, 137)">
                                    <g className="animate-global-vel" style={{ transformOrigin: '50px 113px' }}>
                                        <path 
                                            d="M 50 10 C 45 25, 25 45, 25 60 C 25 75, 40 80, 46 82 C 40 82, 35 84, 35 86 C 35 88, 40 90, 46 90 C 42 90, 38 92, 38 94 C 38 96, 42 98, 47 98 L 47 180 C 43 180, 40 182, 40 184 C 40 186, 43 188, 46 188 C 40 188, 35 191, 35 194 C 35 197, 40 200, 45 200 C 38 200, 30 203, 30 208 C 30 213, 38 216, 50 216 C 62 216, 70 213, 70 208 C 70 203, 62 200, 55 200 C 60 200, 65 197, 65 194 C 65 191, 60 188, 54 188 C 57 188, 60 186, 60 184 C 60 182, 57 180, 53 180 L 53 98 C 58 98, 62 96, 62 94 C 62 92, 58 90, 54 90 C 60 90, 65 88, 65 86 C 65 84, 60 82, 54 82 C 60 80, 75 75, 75 60 C 75 45, 55 25, 50 10 Z" 
                                            fill="black" 
                                        />
                                    </g>
                                </g>
                            </mask>
                        </defs>
                        {/* The Solid Blue Overlay covering screen until masked away */}
                        <rect x="0" y="0" width="100%" height="100%" fill="#4f8cd8" mask="url(#global-vel-mask)" />
                    </svg>

                    {/* Phase 1: Intro GURUVELLS Text (faster timing) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
                        <div className="font-serif text-white text-[clamp(1.5rem,5vw,6rem)] tracking-[0.2em] md:tracking-[0.8em] font-medium uppercase pl-[0.2em] md:pl-[0.8em] flex">
                            {"GURUVELLS".split("").map((letter, index) => (
                                <span 
                                    key={index} 
                                    style={{ 
                                        animation: `introTextAnim ${isMobile ? '1.2s' : '1.8s'} forwards`,
                                        animationDelay: `${index * (isMobile ? 0.04 : 0.06)}s`,
                                        opacity: 0,
                                        backfaceVisibility: 'hidden',
                                        WebkitBackfaceVisibility: 'hidden',
                                    }}
                                >
                                    {letter}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}
