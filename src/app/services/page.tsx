import { client } from "@/sanity/lib/client";
import { servicesPageQuery } from "@/sanity/lib/queries";
import { RevealText } from "@/components/animations/RevealText";
import Image from "next/image";

export const revalidate = 0;

export default async function ServicesPage() {
    // Fetch Services page data from Sanity
    const data = await client.fetch(servicesPageQuery).catch((err) => {
        console.error("SERVICES FETCH ERROR:", err);
        return null;
    });

    console.log("SANITY SYNC CHECK (Services):", { hasData: !!data });

    // Fallbacks
    const heroLabel = data?.heroLabel || "( Disciplines )";
    const heroHeading = data?.heroHeading || ["PRACTICE", "AREAS"];
    
    // Ordered as specified for the Grid:
    // 0: Architecture (Anchor)
    // 1: Master Planning (Horizon)
    // 2: Interior Design (Detail 1)
    // 3: Landscape (Detail 2)
    const disciplines = data?.disciplines || [
        {
            number: "01",
            title: "Architecture",
            description: "Comprehensive architectural design tailored to cultural context, climate, and structural integrity. From conceptual massing to precise construction documentation, our approach fuses heritage spatial principles with advanced tectonic logic.",
            imageUrl: "/architecture-ph.jpg" // Abstract brutalist/concrete placeholder
        },
        {
            number: "02",
            title: "Master Planning",
            description: "Large-scale urban interventions and campus planning. We map environmental vectors, social infrastructure, and infrastructural networks to orchestrate cohesive, future-proof micro-cities.",
            imageUrl: "/planning-ph.jpg" // Wide urban view placeholder
        },
        {
            number: "03",
            title: "Interior Design",
            description: "Meticulous interior curation focusing on material authenticity, acoustic control, and bespoke detailing. We craft immersive environments where light, shadow, and texture define the human experience.",
            imageUrl: "/interior-ph.jpg" // Minimalist interior placeholder
        },
        {
            number: "04",
            title: "Landscape",
            description: "Integration of built form with indigenous ecology. We design resilient landscapes that actively manage water, restore local biomes, and blur the boundaries between shelter and nature.",
            imageUrl: "/landscape-ph.jpg" // Natural environment placeholder
        }
    ];

    // CSS Grid Span mapping array based on index out of exactly 4 items.
    // Index 0: Anchor (Left half, very tall)
    // Index 1: Horizon (Top Right, wide)
    // Index 2: Detail (Bottom Right - Left)
    // Index 3: Detail (Bottom Right - Right)
    const gridClasses = [
        "md:col-span-1 lg:col-span-2 lg:row-span-2 min-h-[600px] lg:min-h-[800px]", 
        "md:col-span-1 lg:col-span-2 lg:row-span-1 min-h-[400px]", 
        "md:col-span-1 lg:col-span-1 lg:row-span-1 min-h-[400px]", 
        "md:col-span-1 lg:col-span-1 lg:row-span-1 min-h-[400px]"
    ];

    // Placeholder image mapping using standard unsplash IDs (architecture focused) to make it look highly visual instantly
    const getImageUrl = (i: number) => {
        const fallbackUrls = [
            "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop", // Architecture
            "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2000&auto=format&fit=crop", // Master Planning
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop", // Interior
            "https://images.unsplash.com/photo-1598902108854-10e335adac99?q=80&w=1000&auto=format&fit=crop"  // Landscape
        ];
        return disciplines[i]?.imageUrl && disciplines[i].imageUrl.startsWith('http') ? disciplines[i].imageUrl : fallbackUrls[i];
    };

    return (
        <main className="min-h-screen bg-cream text-dark pt-32 md:pt-40 pb-24 px-6 md:px-8 lg:px-16 selection:bg-bronze selection:text-cream">
            <div className="max-w-[1600px] mx-auto">
                {/* Header Section */}
                <div className="mb-16 md:mb-24 mt-6 md:mt-12">
                    <span className="metadata-label mb-8 block text-dark/50">{heroLabel}</span>
                    <RevealText
                        lines={heroHeading}
                        className="font-serif text-[clamp(2rem,7vw,5rem)] uppercase tracking-[-0.02em] leading-[1.05]"
                    />
                </div>

                {/* The "Bento Box" Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {disciplines.slice(0, 4).map((d: any, idx: number) => {
                        const bgImage = getImageUrl(idx);
                        const isMainBlock = idx === 0;

                        return (
                            <div 
                                key={idx} 
                                className={`relative group overflow-hidden bg-dark cursor-pointer rounded-none ${gridClasses[idx]}`}
                            >
                                {/* Background Image with 105% Zoom transition */}
                                <Image 
                                    src={bgImage}
                                    alt={d.title}
                                    fill
                                    unoptimized
                                    className="object-cover scale-100 group-hover:scale-105 transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />

                                {/* Subtly deepening dark overlay */}
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-[1000ms] ease-out pointer-events-none" />

                                {/* Content Overlay Container */}
                                <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-end pointer-events-none">
                                    <div className="overflow-hidden">
                                        {/* Number */}
                                        <span className="metadata-label !text-cream/50 mb-4 block">
                                            {d.number} —
                                        </span>
                                        
                                        {/* Title (Always Visible) */}
                                        <h3 className={`font-serif text-cream leading-tight ${isMainBlock ? 'text-4xl lg:text-5xl' : 'text-3xl'}`}>
                                            {d.title}
                                        </h3>

                                        {/* Hover Content Wrapper (Slides UP) */}
                                        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                                            <div className="overflow-hidden">
                                                <div className="pt-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100 ease-[cubic-bezier(0.25,1,0.5,1)]">
                                                    
                                                    {/* Sans-Serif Description */}
                                                    <p className={`font-sans text-cream/80 text-sm md:text-base leading-relaxed ${isMainBlock ? 'max-w-md' : ''}`}>
                                                        {d.description}
                                                    </p>
                                                    
                                                    {/* Clickable Link */}
                                                    <div className="mt-8 pointer-events-auto">
                                                        <span className="metadata-label !lowercase !tracking-[0.2em] !text-cream hover:!text-bronze transition-colors flex items-center gap-4">
                                                            View Related Projects
                                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="rotate-45" xmlns="http://www.w3.org/2000/svg"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/></svg>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
