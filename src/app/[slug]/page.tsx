import { client } from "@/sanity/lib/client";
import { pageQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { PageBuilder } from "@/components/PageBuilder";
import { Metadata } from "next";

type Props = {
    params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const page = await client.fetch(pageQuery, { slug: params.slug });
    if (!page) return {};

    return {
        title: `${page.title} | Guruvells`,
        description: page.seoDescription,
    };
}

export default async function DynamicSanityPage({ params }: Props) {
    // Fetch the page document by its slug
    const page = await client.fetch(pageQuery, { slug: params.slug });

    // If the page doesn't exist in Sanity, return a 404
    if (!page) {
        notFound();
    }

    return (
        <main className="w-full relative">
            <PageBuilder blocks={page.pageBuilder} />
        </main>
    );
}
