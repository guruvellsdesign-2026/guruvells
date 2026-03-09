import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { aboutPageQuery } from "@/sanity/lib/queries";

export const revalidate = 0;

export default async function AboutPage() {
    const data = await client.fetch(aboutPageQuery).catch((err) => {
        console.error("ABOUT FETCH ERROR:", err);
        return null;
    });

    console.log("SANITY SYNC CHECK (About):", { hasData: !!data });

    const heroHeading = data?.introHeading || "Who We Are";
    const heroHeadingSize = data?.introHeadingSize || "text-4xl md:text-6xl lg:text-[5.5rem]";
    
    const bodyParagraphs = data?.introParagraphs && data.introParagraphs.length > 0 ? data.introParagraphs : [
        "Guruvells Architecture is a new, visionary design startup based in Tamil Nadu, India. We focus exclusively on environments through the lens of modern Indian architecture—a radical approach blending vernacular heritage with contemporary tectonic logic.",
        "We are highly connected agents of change, committed to creativity, innovation, sustainable growth, & our local communities."
    ];
    const introParagraphSize = data?.introParagraphSize || "text-xl md:text-2xl lg:text-[2rem]";
    
    const studioImageUrl = data?.heroImageUrl || "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop";
    const secondaryImageUrl = data?.secondaryImageUrl || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop";

    // Commitment
    const commitmentHeading = data?.commitmentHeading || "Our Commitment";
    const commitmentHeadingSize = data?.commitmentHeadingSize || "text-3xl md:text-5xl lg:text-5xl";
    const commitmentText = data?.commitmentText || "The ways in which we develop, design, and construct our built environment has a tremendous impact on our world. Guruvells is committed to building a better quality of life and a more sustainable planet through the work we do for our clients, and the industry-leading standards to which we adhere.";
    const commitmentTextSize = data?.commitmentTextSize || "text-base md:text-xl";

    return (
        <main className="w-full bg-white text-black selection:bg-black selection:text-white pt-[14vh] md:pt-24 pb-32 overflow-x-hidden font-sans">
            
            {/* 1. Hero Image Full Width */}
            <section className="w-full px-4 md:px-12 lg:px-16 mt-4 md:mt-8">
                <div className="relative w-full h-[40vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
                    <Image 
                        src={studioImageUrl} 
                        alt="Guruvells Studio" 
                        fill 
                        priority
                        unoptimized
                        className="object-cover"
                    />
                </div>
            </section>

            {/* 2. "Who We Are" Header & Intro */}
            <section className="w-full max-w-[90rem] mx-auto px-6 mt-16 md:mt-32 text-center flex flex-col items-center">
                <h1 className={`${heroHeadingSize} font-bold tracking-tight mb-8 md:mb-12`}>
                    {heroHeading}
                </h1>
                
                <div className="flex flex-col gap-6 md:gap-8 max-w-5xl">
                    {bodyParagraphs.map((para: string, idx: number) => (
                        <p key={idx} className={`${introParagraphSize} text-black/85 font-medium leading-[1.5] md:leading-[1.4]`}>
                            {para}
                        </p>
                    ))}
                </div>
            </section>

            {/* 3. Secondary Full Width Image */}
            <section className="w-full px-4 md:px-12 lg:px-16 mt-16 md:mt-40">
                <div className="relative w-full h-[40vh] md:h-[75vh] overflow-hidden">
                    <Image 
                        src={secondaryImageUrl} 
                        alt="Guruvells Culture" 
                        fill 
                        unoptimized
                        className="object-cover"
                    />
                </div>
            </section>

            {/* 4. Our Commitment Section */}
            <section className="w-full max-w-6xl mx-auto px-6 mt-16 md:mt-32 text-center flex flex-col items-center">
                <h2 className={`${commitmentHeadingSize} font-bold tracking-tight mb-10`}>
                    {commitmentHeading}
                </h2>
                
                <p className={`${commitmentTextSize} text-black/70 leading-[1.8] max-w-5xl mb-12 lg:mb-20 font-light whitespace-pre-wrap`}>
                    {commitmentText}
                </p>
            </section>

        </main>
    );
}
