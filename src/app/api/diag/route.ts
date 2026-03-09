import { projectId, dataset, client } from "@/sanity/lib/client";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Fetch one document as a test
        const testFetch = await client.fetch('*[0]', {}, { next: { revalidate: 0 } }).catch(e => ({ error: e.message }));

        const config = {
            code: {
                projectId,
                dataset,
                useCdn: client.config().useCdn,
                perspective: client.config().perspective,
            },
            env: {
                NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
                NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
                VERCEL_ENV: process.env.VERCEL_ENV,
                NODE_ENV: process.env.NODE_ENV,
            },
            testFetchResults: {
                success: !testFetch?.error,
                sampleDocId: testFetch?._id || null,
                sampleDocType: testFetch?._type || null,
            },
            time: new Date().toISOString(),
        };
        return Response.json(config);
    } catch (e: any) {
        return Response.json({ error: e.message });
    }
}
