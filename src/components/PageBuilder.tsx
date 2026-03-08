import { Hero } from "./Hero";
import { ParallaxPhilosophy } from "./ParallaxPhilosophy";
import { HorizontalProjectSlider } from "./HorizontalProjectSlider";
import { Contact } from "./Contact";
import { ComponentProps } from "react";

// The PageBuilder receives an array of mixed block objects from Sanity
export function PageBuilder({ blocks }: { blocks: any[] }) {
    if (!blocks || blocks.length === 0) return null;

    return (
        <div className="w-full flex flex-col min-h-screen">
            {blocks.map((block: any, index: number) => {
                switch (block._type) {
                    case "blockHero":
                        return <Hero key={block._key || index} data={block} />;
                    case "blockTextParallax":
                        return <ParallaxPhilosophy key={block._key || index} data={block} />;
                    case "blockProjectSlider":
                        return <HorizontalProjectSlider key={block._key || index} data={block} />;
                    // For Editorial/Contact etc. we will map them here as we build them out
                    // case "blockEditorial":
                    //     return <Editorial key={block._key || index} data={block} />;
                    case "blockContact":
                        return <Contact key={block._key || index} data={block} />;
                    default:
                        // Fallback warning for unknown block types
                        if (process.env.NODE_ENV === "development") {
                            console.warn(`Unknown block type generated: ${block._type}`);
                        }
                        return null;
                }
            })}
        </div>
    );
}
