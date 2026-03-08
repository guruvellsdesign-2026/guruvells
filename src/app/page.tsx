import { client, projectId } from "@/sanity/lib/client";
import { Hero } from "@/components/Hero";
import { ParallaxPhilosophy } from "@/components/ParallaxPhilosophy";
import { Projects } from "@/components/Portfolio";
import { Sustainability } from "@/components/Sustainability";
import { Contact } from "@/components/Contact";
import { ParallaxCta } from "@/components/animations/ParallaxCta";
import { CustomCursor } from "@/components/CustomCursor";
import {
  heroSectionQuery,
  philosophySectionQuery,
  sustainabilitySectionQuery,
  ctaSectionQuery,
  footerSectionQuery,
  portfolioProjectsQuery,
} from "@/sanity/lib/queries";

export const revalidate = 0;

const isSanityReady = Boolean(projectId && projectId !== 'dummyProjectId');

export default async function HomePage() {
  // Fetch all homepage section data from Sanity (server-side)
  let heroData = null;
  let philosophyData = null;
  let sustainabilityData = null;
  let ctaData = null;
  let footerData = null;
  let projectsData: any[] = [];

  if (isSanityReady) {
    try {
      [heroData, philosophyData, sustainabilityData, ctaData, footerData, projectsData] =
        await Promise.all([
          client.fetch(heroSectionQuery).catch((err) => { console.error("HERO FETCH ERROR:", err); return null; }),
          client.fetch(philosophySectionQuery).catch(() => null),
          client.fetch(sustainabilitySectionQuery).catch(() => null),
          client.fetch(ctaSectionQuery).catch(() => null),
          client.fetch(footerSectionQuery).catch(() => null),
          client.fetch(portfolioProjectsQuery).catch(() => []),
        ]);
        
      console.log("SANITY HERO DATA IN PAGE:", heroData);
    } catch {
      // Gracefully degrade — all fallbacks will be used
      console.log("SANITY PROMISE ALL CAUGHT ERROR");
    }
  }

  // Map Sanity project data to the format the slider expects
  const projects = projectsData?.length > 0
    ? projectsData.map((p: any) => ({
        title: p.title,
        location: p.location,
        status: p.status,
        image: p.heroImageUrl || p.imageUrl || '',
        slug: p.slug,
        description: p.description,
      }))
    : [
        {
          title: "THE NANDI\nPAVILION",
          location: "Bangalore",
          status: "Under Construction",
          image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
        },
        {
          title: "CHOLA\nHERITAGE",
          location: "Thanjavur",
          status: "Design Phase",
          image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1931&auto=format&fit=crop",
        },
        {
          title: "MARINA\nRESIDENCES",
          location: "Chennai",
          status: "Under Construction",
          image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2165&auto=format&fit=crop",
        },
        {
          title: "SHIZUKA\nGARDENS",
          location: "Kyoto",
          status: "Design Phase",
          image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
        },
        {
          title: "TEMPLE\nCOURT",
          location: "Kumbakonam",
          status: "Under Construction",
          image: "https://images.unsplash.com/photo-1541888086431-bbfc4412803c?q=80&w=2070&auto=format&fit=crop",
        },
        {
          title: "DRAVIDIAN\nTOWERS",
          location: "Madurai",
          status: "Foundation Phase",
          image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
        },
      ];

  return (
    <main className="w-full relative">
      <CustomCursor />

      {/* 1. HERO */}
      <div id="home">
        <Hero data={heroData} />
      </div>

      {/* 2. PHILOSOPHY PARALLAX */}
      <div id="about">
        <ParallaxPhilosophy data={philosophyData} />
      </div>

      {/* 3. SUSTAINABILITY */}
      <div id="services">
        <Sustainability data={sustainabilityData} />
      </div>

      {/* 4. PROJECTS */}
      <div id="projects">
        <Projects projects={projects} />
      </div>

      {/* 5. CTA */}
      <div id="cta">
        <ParallaxCta data={ctaData} />
      </div>

      {/* 6. FOOTER */}
      <div id="contact">
        <Contact data={footerData} />
      </div>
    </main>
  );
}
