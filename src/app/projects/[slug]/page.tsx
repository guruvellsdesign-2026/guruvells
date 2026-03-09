import { notFound } from "next/navigation";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { client, projectId } from "@/sanity/lib/client";
import { projectDetailQuery } from "@/sanity/lib/queries";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
const isSanityReady = Boolean(projectId);

// Font size mappings
const titleSizeMap: Record<string, string> = {
    default: "text-5xl md:text-7xl lg:text-6xl xl:text-7xl",
    medium: "text-4xl md:text-5xl lg:text-5xl",
    small: "text-3xl md:text-4xl",
    xlarge: "text-6xl md:text-8xl lg:text-7xl xl:text-8xl",
};

const descSizeMap: Record<string, string> = {
    default: "text-[14px] md:text-[15px] leading-[1.9]",
    small: "text-[12px] md:text-[13px] leading-[1.8]",
    large: "text-[16px] md:text-[17px] leading-[2.0]",
};

interface ProjectPageProps {
    params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
    const { slug } = await params;

    // Fetch from Sanity
    let sanityProject: any = null;
    if (isSanityReady) {
        try {
            sanityProject = await client.fetch(projectDetailQuery, { slug }, { next: { revalidate: 0 } });
        } catch {
            sanityProject = null;
        }
    }

    // Build the final data object — Sanity first, then fallback
    const p = {
        title: sanityProject?.title || slug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        location: sanityProject?.location || "Okinawa, Japan",
        year: sanityProject?.year || "2023",
        discipline: sanityProject?.discipline || "Residential",
        size: sanityProject?.size || "32,670 sqft",
        description: sanityProject?.description || `${slug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} is a luxury retreat designed by Guruvells Architecture. Completed recently, it seamlessly integrates modern amenities with traditional design elements, creating a serene and light-filled environment.`,
        heroImage: sanityProject?.heroImageUrl || sanityProject?.imageUrl || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2675&auto=format&fit=crop",
        gallery: sanityProject?.galleryUrls?.length
            ? sanityProject.galleryUrls
            : [
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1600607687931-cebf004fcfd3?q=80&w=2670&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1600566753086-00f18efc2291?q=80&w=2670&auto=format&fit=crop",
            ],
        titleFontSize: sanityProject?.titleFontSize || "default",
        descriptionFontSize: sanityProject?.descriptionFontSize || "default",
    };

    const titleClasses = titleSizeMap[p.titleFontSize] || titleSizeMap.default;
    const descClasses = descSizeMap[p.descriptionFontSize] || descSizeMap.default;

    return (
        <main className="min-h-screen bg-cream text-dark selection:bg-bronze selection:text-cream">
            <div className="w-full flex flex-col lg:flex-row relative">

                {/* 1. The Left Hemisphere (Sticky Canvas) */}
                <div className="w-full lg:w-1/2 lg:sticky lg:top-0 h-[50vh] md:h-[60vh] lg:h-screen flex z-0">
                    <div className="relative w-full h-full overflow-hidden bg-dark/5">
                        <img
                            src={p.heroImage}
                            alt={`${p.title} Primary View`}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* 2. The Right Hemisphere (Scrolling Archive) */}
                <div className="w-full lg:w-1/2 flex flex-col px-6 md:px-12 lg:pl-[6vw] lg:pr-[8vw] pt-16 md:pt-24 lg:pt-[30vh] pb-24 bg-cream z-10 relative">

                    {/* Title & Location Header */}
                    <div className="mb-16 md:mb-24">
                        <h1 className={`${titleClasses} font-serif text-dark lg:text-left leading-[0.9] mb-4 md:mb-6`}>
                            {p.title}
                        </h1>
                        <div className="font-sans text-[11px] md:text-[13px] tracking-[0.2em] uppercase text-dark/50 border-l border-dark/20 pl-4 mt-4">
                            {p.location}
                        </div>
                    </div>

                    {/* Metadata Spec Sheet */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-4 pb-16 mb-16 border-b border-dark/10">
                        <div>
                            <span className="metadata-label">Year</span>
                            <span className="metadata-value">{p.year}</span>
                        </div>
                        <div>
                            <span className="metadata-label">Discipline</span>
                            <span className="metadata-value">{p.discipline}</span>
                        </div>
                        <div>
                            <span className="metadata-label">Scale</span>
                            <span className="metadata-value">{p.size}</span>
                        </div>
                    </div>

                    {/* The Narrative */}
                    <div className="mb-24 md:mb-32">
                        <p className={`font-sans ${descClasses} text-dark/80 tracking-wide text-justify md:text-left`}>
                            {p.description}
                        </p>
                    </div>

                    {/* The Vertical Image Stack */}
                    <div className="flex flex-col gap-12 md:gap-24">
                        {p.gallery.map((imgUrl: string, idx: number) => {
                            const isPortrait = idx % 2 !== 0;
                            const containerClasses = isPortrait
                                ? "relative w-[85%] md:w-[70%] self-end aspect-[3/4] overflow-hidden bg-dark/5"
                                : "relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-dark/5";

                            return (
                                <ParallaxImage
                                    key={idx}
                                    src={imgUrl}
                                    alt={`${p.title} Detail ${idx + 1}`}
                                    containerClassName={containerClasses}
                                />
                            );
                        })}
                    </div>

                </div>

            </div>
        </main>
    );
}
