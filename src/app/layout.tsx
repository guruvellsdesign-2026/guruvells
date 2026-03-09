import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import { Navigation } from "@/components/Navigation";
import { client, projectId } from "@/sanity/lib/client";
import { globalSettingsQuery, navigationQuery } from "@/sanity/lib/queries";
import "./globals.css";

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
    const settings = await client.fetch(globalSettingsQuery, {}, { revalidate: 0 });
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
      navData = await client.fetch(navigationQuery);
    } catch {
      navData = null;
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        <Navigation navData={navData} />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
