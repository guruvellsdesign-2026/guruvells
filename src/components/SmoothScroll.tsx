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

        // Enable GSAP lag smoothing to prevent frame drops during fast scrolls
        gsap.ticker.lagSmoothing(500, 33);

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
                lerp: isMobile ? 0.12 : 0.1,
                duration: isMobile ? 0.8 : 1.5,
                smoothWheel: true,
                touchMultiplier: 2.0,            // Snappier touch response
                syncTouch: false,                 // Use native iOS/Android momentum — no hijacking
                syncTouchLerp: 0.075,
                autoResize: true,
            }}
        >
            {children}
        </ReactLenis>
    );
}
