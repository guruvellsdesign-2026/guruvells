"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isAnimating, setIsAnimating] = useState(true);

    const isStudio = pathname?.startsWith("/studio");

    // Re-trigger animation on every route change
    useEffect(() => {
        if (isStudio) {
            setIsAnimating(false);
            return;
        }
        
        setIsAnimating(true);
        // The animation duraton is roughly 7s total, but the mask clears by ~4.5s.
        // We'll unmount the heavy SVG from the DOM after 7s to restore click interactivity to the page below.
        const timer = setTimeout(() => {
            setIsAnimating(false);
        }, 7000);

        return () => clearTimeout(timer);
    }, [pathname, isStudio]);

    if (isStudio) {
        return <>{children}</>;
    }

    return (
        <div className="relative w-full min-h-screen">
            
            {/* The actual page content stays mounted below the mask */}
            {children}

            {/* Global Page Transition Mask */}
            {isAnimating && (
                <div className="fixed inset-0 z-[999] pointer-events-none">
                    <style dangerouslySetInnerHTML={{ __html: `
                        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&display=swap');

                        .font-cinzel { font-family: 'Cinzel', serif; }

                        @keyframes introTextAnim {
                            0% { opacity: 0; filter: blur(20px); transform: scale(0.85) translateY(20px); }
                            25% { opacity: 1; filter: blur(0px); transform: scale(1) translateY(0); }
                            75% { opacity: 1; filter: blur(0px); transform: scale(1.05) translateY(0); }
                            100% { opacity: 0; filter: blur(20px); transform: scale(1.2) translateY(-20px); }
                        }

                        @keyframes globalVelMaster {
                            0% { opacity: 0; transform: scale(1); }
                            40% { /* 2.8s */
                                opacity: 0;
                                transform: scale(1);
                                animation-timing-function: ease-out;
                            }
                            48% { /* ~3.3s */
                                opacity: 1;
                                transform: scale(1);
                                animation-timing-function: cubic-bezier(0.3, 0, 0.2, 1);
                            }
                            60% { /* 4.2s */
                                opacity: 1;
                                transform: scale(0.75);
                                animation-timing-function: cubic-bezier(0.9, 0, 0.1, 1);
                            }
                            100% { /* 7s */
                                opacity: 1;
                                transform: scale(500);
                            }
                        }

                        .animate-global-vel {
                            animation: globalVelMaster 7s forwards;
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

                    {/* Phase 1: Intro GURUVELLS Text (Fades out completely by 3.5s) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
                        <div className="font-cinzel text-white text-[clamp(1.5rem,5vw,6rem)] tracking-[0.2em] md:tracking-[0.8em] font-medium uppercase pl-[0.2em] md:pl-[0.8em] flex">
                            {"GURUVELLS".split("").map((letter, index) => (
                                <span 
                                    key={index} 
                                    style={{ 
                                        animation: 'introTextAnim 3.2s forwards',
                                        animationDelay: `${index * 0.08}s`,
                                        opacity: 0
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
