import type { Metadata } from "next";
import { Inter, Playfair_Display, Cinzel } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import { Navigation } from "@/components/Navigation";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { client, projectId } from "@/sanity/lib/client";
import { globalSettingsQuery, navigationQuery } from "@/sanity/lib/queries";
import "../globals.css";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Only try to fetch from Sanity if a real project ID is configured
const isSanityReady = Boolean(projectId);

export async function generateMetadata(): Promise<Metadata> {
  if (!isSanityReady) {
    return {
      title: "Guruvells Architecture",
      description: "Innovative Architecture & Sustainable Design Studio.",
    };
  }
  try {
    const settings = await client.fetch(globalSettingsQuery, {}, { next: { revalidate: 0 } });
    return {
      title: settings?.siteTitle || "Guruvells Architecture",
      description: settings?.siteDescription || "Innovative Architecture & Sustainable Design Studio.",
      openGraph: settings?.seoImageUrl ? { images: [settings.seoImageUrl] } : undefined,
    };
  } catch {
    return {
      title: "Guruvells Architecture",
      description: "Innovative Architecture & Sustainable Design Studio.",
    };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let navData = null;
  if (isSanityReady) {
    try {
      navData = await client.fetch(navigationQuery, {}, { next: { revalidate: 0 } });
    } catch {
      navData = null;
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${playfair.variable} ${cinzel.variable} antialiased`}
      >
        <Navigation navData={navData} />
        <ErrorBoundary>
          <SmoothScroll>{children}</SmoothScroll>
        </ErrorBoundary>
      </body>
    </html>
  );
}
