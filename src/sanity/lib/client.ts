import { createClient } from 'next-sanity';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'oADBn6Pm0';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-01';

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // Always set to false for immediate updates
    perspective: 'published',
});

// Diagnostic log to confirm client configuration in the logs
console.log(`SANITY CLIENT INITIALIZED: Project=${projectId}, Dataset=${dataset}, CDN=${client.config().useCdn}`);
