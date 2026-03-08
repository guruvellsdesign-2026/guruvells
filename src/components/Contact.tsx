"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function Contact({ data }: { data?: any }) {
    const footerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!footerRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                footerRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
                }
            );
        });

        return () => ctx.revert();
    }, []);

    // CMS data with fallbacks
    const hasData = !!data;
    const navLinks = hasData && data.navLinks ? data.navLinks : [
        { label: "Home", number: "01" },
        { label: "About", number: "02" },
        { label: "Projects", number: "03" },
        { label: "Sustainability", number: "04" },
        { label: "Services", number: "05" },
        { label: "Contact", number: "06" },
    ];

    const email = hasData ? (data.email ?? "") : "studio@guruvells.com";
    const phone = hasData ? (data.phone ?? "") : "+91 44 2222 3333";
    const socialLinks = hasData && data.socialLinks ? data.socialLinks : [
        { platform: "Instagram", url: "#" },
        { platform: "LinkedIn", url: "#" },
        { platform: "Facebook", url: "#" },
    ];
    const studioName = hasData ? (data.studioName ?? "") : "Guruvells Design Consultants Pvt. Ltd.";
    const studioLocation = hasData ? (data.studioLocation ?? "") : "Tamil Nadu, India";
    const copyrightText = hasData ? (data.copyrightText ?? "") : `© ${new Date().getFullYear()} Guruvells Design Consultants Pvt. Ltd.`;

    return (
        <footer ref={footerRef} className="bg-[#4f8cd8] text-[#1a1b26] pt-16 pb-8 px-8 lg:px-16 opacity-0 relative z-10 w-full overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col justify-between">
                
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 pt-4 pb-12 border-b border-[#1a1b26]/10">
                    
                    {/* Column 1: Joint the World / Newsletter (Left aligned, 5 cols) */}
                    <div className="flex flex-col gap-4 md:col-span-5 md:pr-12">
                        <h2 className="font-serif text-[clamp(2rem,6vw,3rem)] md:text-4xl lg:text-5xl leading-[1.1] font-light tracking-tight text-[#1a1b26]">
                            JOIN the WORLD <br/>
                            of GURUVELLS
                        </h2>
                        <p className="font-sans text-xs leading-relaxed text-[#1a1b26]/70 max-w-sm mt-2">
                            Subscribe to join our community and stay up to date with the studio.
                        </p>

                        {/* Newsletter Form */}
                        <form className="mt-6 flex flex-col gap-6 max-w-md" onSubmit={(e) => e.preventDefault()}>
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="border-b border-[#1a1b26]/30 flex-1 relative">
                                    <input type="text" placeholder="FIRST NAME *" className="w-full bg-transparent text-[16px] md:text-[10px] tracking-widest uppercase placeholder:text-[#1a1b26]/50 focus:outline-none pb-2 font-sans" />
                                </div>
                                <div className="border-b border-[#1a1b26]/30 flex-1 relative">
                                    <input type="text" placeholder="LAST NAME *" className="w-full bg-transparent text-[16px] md:text-[10px] tracking-widest uppercase placeholder:text-[#1a1b26]/50 focus:outline-none pb-2 font-sans" />
                                </div>
                            </div>
                            <div className="border-b border-[#1a1b26]/30 relative mt-1">
                                <input type="email" placeholder="EMAIL *" className="w-full bg-transparent text-[16px] md:text-[10px] tracking-widest uppercase placeholder:text-[#1a1b26]/50 focus:outline-none pb-2 font-sans" />
                            </div>
                            
                            <label className="flex items-start gap-3 mt-4 cursor-pointer group">
                                <div className="min-w-3 w-3 h-3 border border-[#1a1b26]/50 mt-[2px] flex items-center justify-center group-hover:bg-[#1a1b26]/10 transition-colors">
                                    <input type="checkbox" className="opacity-0 absolute" />
                                </div>
                                <span className="text-[11px] leading-relaxed text-[#1a1b26]/80 font-sans cursor-pointer">
                                    I consent to my information being collected in accordance with the Guruvells privacy policy
                                </span>
                            </label>

                            <button type="submit" className="mt-4 text-[10px] font-sans tracking-[0.2em] uppercase border-b border-[#1a1b26] pb-1 w-max hover:text-white transition-colors duration-300 font-medium">
                                SUBMIT FORM
                            </button>
                        </form>
                    </div>

                    {/* Column 2: Center Navigation Links (4 cols) */}
                    <div className="flex flex-col items-start md:col-span-4 md:items-center">
                        <nav className="flex flex-col gap-3 mt-4 md:mt-0">
                            {navLinks.map((link: any, idx: number) => (
                                <a
                                    key={idx}
                                    href={link.href || "#"}
                                    className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-[#1a1b26]/90 hover:text-white transition-colors duration-300"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Column 3: Social & Contact (3 cols) */}
                    <div className="flex flex-col items-start md:col-span-3 md:items-end w-full mt-6 md:mt-0">
                        <a 
                            href={`mailto:${email}`}
                            className="font-sans text-[10px] tracking-[0.2em] uppercase border-b border-[#1a1b26]/30 pb-1 mb-8 hover:border-[#1a1b26] transition-colors font-medium text-[#1a1b26]/80"
                        >
                            CONTACT US
                        </a>

                        <div className="flex flex-col gap-3 items-start md:items-end">
                            {socialLinks.map((social: any, idx: number) => (
                                <a 
                                    key={idx} 
                                    href={social.url || "#"} 
                                    className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-[#1a1b26]/90 hover:text-white transition-colors duration-300"
                                >
                                    {social.platform}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="w-full pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <span className="text-[9px] tracking-[0.2em] font-sans uppercase text-[#1a1b26]/50">
                        {copyrightText}
                    </span>
                    <div className="flex gap-8">
                        <a href="#" className="text-[9px] tracking-[0.2em] font-sans uppercase text-[#1a1b26]/60 hover:text-[#1a1b26] transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-[9px] tracking-[0.2em] font-sans uppercase text-[#1a1b26]/60 hover:text-[#1a1b26] transition-colors">
                            Terms of Service
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
}
