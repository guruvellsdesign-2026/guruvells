import { client } from "@/sanity/lib/client";
import { portfolioProjectsQuery } from "@/sanity/lib/queries";
import { ProjectFullscreenSlider } from "@/components/ProjectFullscreenSlider";

export const revalidate = 0;

export default async function ProjectsPage() {
    // Fetch individual projects from Sanity
    const sanityProjects = await client.fetch(portfolioProjectsQuery).catch(() => []);

    // Fallbacks if Sanity is empty
    const fallbackProjects = [
        {
            title: "The Nandi Pavilion",
            location: "Bangalore",
            status: "UNDER CONSTRUCTION",
            imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
            year: "2024",
            discipline: "Architecture",
        },
        {
            title: "Chola Heritage",
            location: "Thanjavur",
            status: "DESIGN PHASE",
            imageUrl: "https://images.unsplash.com/photo-1590483736622-398541ce1d66?q=80&w=2692&auto=format&fit=crop",
            year: "2025",
            discipline: "Cultural",
        },
        {
            title: "Marina Residences",
            location: "Chennai",
            status: "UNDER CONSTRUCTION",
            imageUrl: "https://images.unsplash.com/photo-1600607687975-980425c37494?q=80&w=2664&auto=format&fit=crop",
            year: "2024",
            discipline: "Residential",
        },
        {
            title: "Shizuka Gardens",
            location: "Kyoto",
            status: "DESIGN PHASE",
            imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2670&auto=format&fit=crop",
            year: "2026",
            discipline: "Landscape",
        },
        {
            title: "Temple Court",
            location: "Kumbakonam",
            status: "UNDER CONSTRUCTION",
            imageUrl: "https://images.unsplash.com/photo-1600566753086-00f18efc2291?q=80&w=2670&auto=format&fit=crop",
            year: "2024",
            discipline: "Masterplan",
        },
        {
            title: "Dravidian Towers",
            location: "Madurai",
            status: "FOUNDATION PHASE",
            imageUrl: "https://images.unsplash.com/photo-1600585154526-990dced4ea0d?q=80&w=2670&auto=format&fit=crop",
            year: "2025",
            discipline: "Commercial",
        },
    ];

    const displayProjects = sanityProjects.length > 0 
        ? sanityProjects.map((p: any) => ({
            ...p,
            image: p.heroImageUrl || p.imageUrl // Prioritize the uploaded image over the external URL string
          }))
        : fallbackProjects.map((p: any) => ({
            ...p,
            image: p.imageUrl
          }));

    return (
        <main className="min-h-screen bg-dark w-full overflow-hidden">
            <ProjectFullscreenSlider projects={displayProjects} />
        </main>
    );
}
