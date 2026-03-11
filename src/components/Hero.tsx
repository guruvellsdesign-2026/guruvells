"use client";

import Image from "next/image";

export function Hero({ data }: { data?: any }) {
    // Dynamic Data Fallbacks
    const hasData = !!data;
    
    // Safely use CMS data or original fallbacks
    const line1 = hasData ? (data.line1 ?? "") : "Timeless";
    const subtitle = hasData ? (data.subtitle ?? "") : "Tailored"; 
    const line2 = hasData ? (data.line2 ?? "") : "Spaces";
    const bgUrl = hasData ? (data.backgroundImageUrl ?? "/hero.png") : "/hero.png";
    const buttonText = hasData ? (data.buttonText ?? "") : "Explore Philosophy";

    // Style Mappings
    const titleSize = data?.titleSize || 'default';

    let fontStyleStr = 'clamp(2.5rem, 8vw, 10rem)';
    if (titleSize === 'small') fontStyleStr = 'clamp(1.75rem, 5vw, 6rem)';
    if (titleSize === 'medium') fontStyleStr = 'clamp(2rem, 6.5vw, 8rem)';
    if (titleSize === 'xlarge') fontStyleStr = 'clamp(3rem, 10vw, 13rem)';

    return (
        <section className="relative w-full h-screen overflow-hidden bg-[#111]">
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes bgParallax {
                    0% { transform: scale(1.2); opacity: 0.5; }
                    50% { opacity: 1; }
                    100% { transform: scale(1); opacity: 0.6; }
                }

                @keyframes textReveal {
                    0% { opacity: 0; transform: translateY(50px) scale(0.95); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }

                @keyframes buttonReveal {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }

                .animate-bg-parallax {
                    animation: bgParallax 4s cubic-bezier(0.25, 1, 0.5, 1) forwards;
                    will-change: transform, opacity;
                }
            `}} />

            {/* Background Image with Parallax & Darken Effect */}
            <div className="absolute inset-0 z-0 bg-[#111]">
                <Image
                    src={bgUrl}
                    alt="Hero Background"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover animate-bg-parallax"
                />
            </div>

            {/* Phase 4: Final Typography Reveal */}
            <div className="absolute top-[40%] sm:top-[42%] md:top-1/2 -translate-y-1/2 left-[5%] md:left-[12%] z-10 flex flex-col items-start gap-0 max-w-[90vw] md:max-w-[80vw]">
                <h1 
                    className="font-serif text-white leading-[1.05] tracking-wide max-w-[90vw] md:max-w-none break-words whitespace-normal"
                    style={{ textShadow: '0 10px 40px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.5)', fontSize: fontStyleStr }}
                >
                    {line1 && <span className="block opacity-0" style={{ animation: 'textReveal 1s cubic-bezier(0.2, 0.8, 0.2, 1) 3.2s forwards', willChange: 'transform, opacity' }}>{line1}</span>}
                    {subtitle && <span className="block opacity-0" style={{ animation: 'textReveal 1s cubic-bezier(0.2, 0.8, 0.2, 1) 3.5s forwards', willChange: 'transform, opacity' }}>{subtitle}</span>}
                    {line2 && <span className="block opacity-0" style={{ animation: 'textReveal 1s cubic-bezier(0.2, 0.8, 0.2, 1) 3.8s forwards', willChange: 'transform, opacity' }}>{line2}</span>}
                </h1>
                
                {buttonText && (
                    <div className="mt-8 md:mt-12 overflow-hidden opacity-0" style={{ animation: 'buttonReveal 0.8s ease-out 4.2s forwards', willChange: 'transform, opacity' }}>
                        <button 
                            className="font-serif text-white/70 text-[10px] md:text-[13px] tracking-[0.3em] md:tracking-[0.4em] uppercase hover:text-white transition-colors duration-500 border-b border-white/20 hover:border-white/60 pb-2"
                            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            {buttonText}
                        </button>
                    </div>
                )}
            </div>
            
        </section>
    );
}
