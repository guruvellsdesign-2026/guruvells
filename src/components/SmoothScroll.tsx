"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function SmoothScroll({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);

        // Detect mobile for optimized Lenis settings
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile, { passive: true });
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <ReactLenis
            root
            options={{
                lerp: isMobile ? 0.15 : 0.1,       // Snappier on mobile
                duration: isMobile ? 1.0 : 1.5,     // Shorter animation on mobile
                smoothWheel: true,
                touchMultiplier: 1.5,                // Better touch response
                syncTouch: true,                     // Sync touch events for smoother feel
                syncTouchLerp: 0.075,                // Smooth touch interpolation
            }}
        >
            {children}
        </ReactLenis>
    );
}
