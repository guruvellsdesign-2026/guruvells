import { projectId, dataset, client } from "@/sanity/lib/client";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const config = {
            projectId,
            dataset,
            useCdn: client.config().useCdn,
            perspective: client.config().perspective,
            time: new Date().toISOString(),
        };
        return Response.json(config);
    } catch (e: any) {
        return Response.json({ error: e.message });
    }
}
