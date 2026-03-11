"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";

export function Navigation({ navData }: { navData?: any }) {
    const router = useRouter();
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const rafRef = useRef<number>(0);

    // RAF-debounced scroll handler to prevent layout thrashing
    const handleScroll = useCallback(() => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
            setScrolled(window.scrollY > 50);
        });
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [handleScroll]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [menuOpen]);

    // Close menu on route change
    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    const handleLogoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setMenuOpen(false);
        router.push("/");
    };

    const links = navData?.links || [
        { label: "PROJECTS", href: "/projects" },
        { label: "ABOUT", href: "/about" },
        { label: "SERVICES", href: "/services" },
    ];
    
    const contactBtnText = navData?.contactButtonText || "CONTACT US";
    const contactBtnHref = navData?.contactButtonHref || "/contact";

    // Only apply text inversion logic when the menu is CLOSED.
    // When the menu is open, the background is dark, so text must be light.
    const isDarkPage = pathname.startsWith("/projects") || pathname.startsWith("/studio");
    const isLightText = menuOpen ? true : (isDarkPage && !scrolled);

    // Dynamic Theme Variables based on light/dark context
    const textColorClass = isLightText ? "text-white" : "text-dark";
    const mutedTextClass = isLightText ? "text-white/60 hover:text-white" : "text-dark/50 hover:text-dark";
    const buttonClass = isLightText 
        ? "text-white border-white/20 hover:bg-white hover:text-dark" 
        : "text-dark border-dark/10 hover:bg-dark hover:text-white";

    return (
        <LazyMotion features={domAnimation}>
            <header 
                className={`fixed top-0 left-0 w-full px-4 md:px-12 py-4 md:py-6 z-[100] transition-all duration-700 grid grid-cols-3 items-center ${
                    scrolled && !menuOpen ? "bg-cream/90 backdrop-blur-xl py-3 md:py-4 shadow-sm" : "bg-transparent"
                }`}
            >
                {/* Left Side: Desktop Links & Mobile Menu Button */}
                <div className="flex items-center flex-1">
                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex gap-10">
                        {links.map((link: any) => (
                            <button
                                key={link.label}
                                onClick={() => router.push(link.href)}
                                className={`font-sans text-[10px] tracking-[0.25em] transition-all duration-500 hover:tracking-[0.3em] bg-transparent border-none cursor-pointer ${mutedTextClass}`}
                            >
                                {link.label}
                            </button>
                        ))}
                    </nav>

                    {/* Mobile Hamburger Button */}
                    <button 
                        className="flex md:hidden flex-col justify-center items-center w-8 h-8 z-[101]"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`block w-6 h-[1.5px] transition-all duration-300 ${menuOpen ? `rotate-45 translate-y-[1.5px] bg-white` : `bg-current ${textColorClass}`}`} />
                        <span className={`block w-6 h-[1.5px] transition-all duration-300 mt-1.5 ${menuOpen ? `-rotate-45 -translate-y-[6px] bg-white` : `bg-current ${textColorClass}`}`} />
                    </button>
                </div>

                {/* Center: Logo — Text Only */}
                <div className="flex justify-center justify-self-center z-[101]">
                    <button
                        onClick={handleLogoClick}
                        className="group relative flex items-center justify-center interactive px-0 py-2 origin-center"
                        aria-label="Guruvells Logo"
                    >
                        {/* Editorial Typography Stack */}
                        <div className="flex flex-col items-center transition-transform duration-700 group-hover:scale-105">
                            <span className={`font-sans text-[13px] md:text-[15px] font-bold tracking-[0.25em] uppercase leading-none ${textColorClass}`}>
                                Guruvells
                            </span>
                            <span className={`hidden md:block font-serif italic text-[10px] tracking-[0.1em] mt-1.5 opacity-60 ${textColorClass}`}>
                                Design Consultants
                            </span>
                        </div>
                    </button>
                </div>

                {/* Right Side: Contact Button */}
                <div className="flex justify-end items-center justify-self-end z-[101]">
                    <button
                        onClick={() => {
                            setMenuOpen(false);
                            router.push(contactBtnHref);
                        }}
                        className={`font-sans text-[8px] md:text-[10px] tracking-[0.15em] md:tracking-[0.2em] border px-3 md:px-7 py-2 md:py-2.5 rounded-full transition-all duration-500 whitespace-nowrap ${buttonClass}`}
                    >
                        {contactBtnText}
                    </button>
                </div>
            </header>

            {/* Mobile Fullscreen Menu Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <m.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[99] bg-dark flex flex-col items-center justify-center min-h-[100svh]"
                    >
                        <nav className="flex flex-col items-center gap-10 mt-12">
                            {links.map((link: any, i: number) => (
                                <m.button
                                    key={link.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                                    onClick={() => router.push(link.href)}
                                    className="font-serif text-3xl md:text-5xl text-cream hover:text-bronze transition-colors flex flex-col items-center gap-2"
                                >
                                    {link.label}
                                    <span className="font-sans text-[9px] tracking-[0.3em] text-cream/30 uppercase block">0{i+1}</span>
                                </m.button>
                            ))}
                        </nav>
                        
                        {/* Mobile Footer Area inside Menu */}
                        <m.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="absolute bottom-12 flex flex-col items-center gap-6"
                        >
                            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-cream/40 px-6 text-center leading-relaxed">
                                Guruvells Design Consultants Pvt. Ltd.
                            </span>
                            <div className="flex gap-6">
                                {['Instagram', 'LinkedIn', 'Journal'].map(social => (
                                    <a href="#" key={social} className="font-sans text-[9px] tracking-[0.2em] uppercase text-cream/60 hover:text-cream transition-colors">
                                        {social}
                                    </a>
                                ))}
                            </div>
                        </m.div>
                    </m.div>
                )}
            </AnimatePresence>
        </LazyMotion>
    );
}
