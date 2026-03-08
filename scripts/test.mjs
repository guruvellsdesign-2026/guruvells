import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'do4k1nvo',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function run() {
  const data = await client.fetch(`*[_type == "heroSection"][0]{"backgroundImageUrl": backgroundImage.asset->url}`);
  console.log("HERO DATA:", data);
}
run();
