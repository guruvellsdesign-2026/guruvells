// Sanity CMS Seed Script
// Run with: npm run seed
// Populates all Sanity documents with the current website content

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'oADBn6Pm0',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function seed() {
  console.log('🌱 Seeding Sanity CMS...\n');

  // ─── GLOBAL SETTINGS ─────────────────────────────────────────────────────
  console.log('📋 Global Settings...');
  await client.createOrReplace({
    _id: 'globalSettings', _type: 'globalSettings',
    siteTitle: 'Guruvells Architecture',
    siteDescription: 'Innovative Architecture & Sustainable Design Studio blending Dravidian heritage with modern craft.',
  });

  // ─── NAVIGATION ──────────────────────────────────────────────────────────
  console.log('🧭 Navigation...');
  await client.createOrReplace({
    _id: 'navigation', _type: 'navigation',
    links: [
      { _key: 'nav-1', label: 'PROJECTS', href: '/projects' },
      { _key: 'nav-2', label: 'ABOUT', href: '/about' },
      { _key: 'nav-3', label: 'SERVICES', href: '/services' },
    ],
    contactButtonText: 'CONTACT US',
    contactButtonHref: '/contact',
  });

  // ─── HOMEPAGE: HERO SECTION ──────────────────────────────────────────────
  console.log('🎬 Hero Section...');
  await client.createOrReplace({
    _id: 'heroSection', _type: 'heroSection',
    line1: 'Timeless',
    subtitle: 'Tailored',
    line2: 'Spaces',
    buttonText: 'Explore Philosophy',
  });

  // ─── HOMEPAGE: PHILOSOPHY SECTION ────────────────────────────────────────
  console.log('✍️  Philosophy Section...');
  await client.createOrReplace({
    _id: 'philosophySection', _type: 'philosophySection',
    textLayers: [
      'WE TRANSLATE',
      'DREAMS into tangible',
      'structures, CURATING',
      'EXCEPTIONAL LIFESTYLES',
      'through ARTISTRY,',
      'INTUITION, and rigorous',
      'DESIGN EXPERTISE.',
    ],
  });

  // ─── HOMEPAGE: SUSTAINABILITY SECTION ────────────────────────────────────
  console.log('🌿 Sustainability Section...');
  await client.createOrReplace({
    _id: 'sustainabilitySection', _type: 'sustainabilitySection',
    sectionLabel: '( 03 ) — Sustainability',
    headingLines: ['Designs That', 'Sustain Life'],
    bodyParagraphs: [
      'Guruvells is committed to revolutionizing architecture through sustainability. Each project embodies our dedication to environmental stewardship, leveraging innovative technologies and green practices that set new standards for the industry.',
      'We embrace the spirit of unity, recognizing that each project presents a unique opportunity to create something exceptional that harmonizes with nature.',
    ],
    buttonText: 'Sustainability',
  });

  // ─── HOMEPAGE: CTA SECTION ───────────────────────────────────────────────
  console.log('🚀 CTA Section...');
  await client.createOrReplace({
    _id: 'ctaSection', _type: 'ctaSection',
    label: 'GET STARTED',
    heading: "Let's make\nthings happen.",
    buttonText: 'Make it happen',
  });

  // ─── HOMEPAGE: FOOTER SECTION ────────────────────────────────────────────
  console.log('🦶 Footer Section...');
  await client.createOrReplace({
    _id: 'footerSection', _type: 'footerSection',
    navLinks: [
      { _key: 'fl-1', label: 'Home', number: '01', href: '/' },
      { _key: 'fl-2', label: 'About', number: '02', href: '/about' },
      { _key: 'fl-3', label: 'Projects', number: '03', href: '/projects' },
      { _key: 'fl-4', label: 'Sustainability', number: '04', href: '#services' },
      { _key: 'fl-5', label: 'Services', number: '05', href: '/services' },
      { _key: 'fl-6', label: 'Contact', number: '06', href: '/contact' },
    ],
    email: 'studio@guruvells.com',
    phone: '+91 44 2222 3333',
    socialLinks: [
      { _key: 'sl-1', platform: 'Instagram', url: 'https://instagram.com/guruvells' },
      { _key: 'sl-2', platform: 'LinkedIn', url: 'https://linkedin.com/company/guruvells' },
      { _key: 'sl-3', platform: 'Facebook', url: 'https://facebook.com/guruvells' },
    ],
    studioName: 'Guruvells Design Consultants Pvt. Ltd.',
    studioLocation: 'Tamil Nadu, India',
    copyrightText: `© ${new Date().getFullYear()} Guruvells Design Consultants Pvt. Ltd.`,
  });

  // ─── PORTFOLIO PROJECTS ──────────────────────────────────────────────────
  console.log('🏛️ Portfolio Projects...');
  const projectsData = [
    { _id: 'project-nandi-pavilion', title: 'The Nandi Pavilion', slug: { _type: 'slug', current: 'nandi-pavilion' }, location: 'Bangalore', year: '2024', discipline: 'Architecture & Interiors', status: 'Under Construction', description: 'A masterfully crafted pavilion inspired by the sacred Nandi bull, seamlessly blending tradition with contemporary innovations.', imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop' },
    { _id: 'project-chola-heritage', title: 'Chola Heritage', slug: { _type: 'slug', current: 'chola-heritage' }, location: 'Thanjavur', year: '2024', discipline: 'Heritage Architecture', status: 'Design Phase', description: 'A heritage restoration and expansion project honoring the grandeur of Chola-era architecture.', imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1931&auto=format&fit=crop' },
    { _id: 'project-marina-residences', title: 'Marina Residences', slug: { _type: 'slug', current: 'marina-residences' }, location: 'Chennai', year: '2024', discipline: 'Residential Architecture', status: 'Under Construction', description: 'Luxury coastal residences along the Marina coastline, where ocean breezes meet refined interiors.', imageUrl: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2165&auto=format&fit=crop' },
    { _id: 'project-shizuka-gardens', title: 'Shizuka Gardens', slug: { _type: 'slug', current: 'shizuka-gardens' }, location: 'Kyoto', year: '2024', discipline: 'Landscape & Architecture', status: 'Design Phase', description: 'A contemplative garden retreat in Kyoto, drawing from Japanese wabi-sabi and Zen principles.', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop' },
    { _id: 'project-temple-court', title: 'Temple Court', slug: { _type: 'slug', current: 'temple-court' }, location: 'Kumbakonam', year: '2024', discipline: 'Cultural Architecture', status: 'Under Construction', description: 'A cultural center built around an ancient temple precinct, weaving sacred history with contemporary spaces.', imageUrl: 'https://images.unsplash.com/photo-1541888086431-bbfc4412803c?q=80&w=2070&auto=format&fit=crop' },
    { _id: 'project-dravidian-towers', title: 'Dravidian Towers', slug: { _type: 'slug', current: 'dravidian-towers' }, location: 'Madurai', year: '2024', discipline: 'High-rise Architecture', status: 'Foundation Phase', description: 'Iconic twin towers that reinterpret the soaring silhouette of Dravidian gopuras for a modern mixed-use high-rise.', imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop' },
  ];
  for (const p of projectsData) {
    await client.createOrReplace({ ...p, _type: 'portfolio' });
    console.log(`  ✅ ${p.title}`);
  }

  // ─── ABOUT PAGE ──────────────────────────────────────────────────────────
  console.log('📖 About Page...');
  await client.createOrReplace({
    _id: 'aboutPage', _type: 'aboutPage',
    seoDescription: 'Learn about Guruvells Architecture philosophy and approach to sustainable design.',
    heroLabel: '( Studio )',
    heroHeading: ['PHILOSOPHY', '& APPROACH'],
    quoteText: 'We do not merely build structures; we craft environments that bridge the gap between heritage and tomorrow.',
    foundingYear: '2024',
    bodyParagraphs: [
      'Based in Tamil Nadu, Guruvells Architecture is a multidisciplinary practice focused on creating deeply contextual, culturally rooted, yet forward-looking spaces.',
      'Our design ethos is fundamentally driven by a reverence for material truth and spatial clarity. We meticulously study vernacular climatic responses and traditional building techniques, integrating them with contemporary tectonic logic.',
      'Rather than imposing a predetermined style, we allow the specific geographical, cultural, and environmental constraints of a site to dictate the precise form and materiality of the resulting structure.',
    ],
    stats: [
      { _key: 'stat-1', label: 'Team Size', value: '45+ Architects' },
      { _key: 'stat-2', label: 'Completed Works', value: '12 Projects' },
      { _key: 'stat-3', label: 'Awards', value: 'IDA 2024' },
    ],
    studioImageCaption: 'Studio Environment',
  });

  // ─── SERVICES PAGE ───────────────────────────────────────────────────────
  console.log('🛠️  Services Page...');
  await client.createOrReplace({
    _id: 'servicesPage', _type: 'servicesPage',
    seoDescription: 'Explore our architectural disciplines.',
    heroLabel: '( Disciplines )',
    heroHeading: ['PRACTICE', 'AREAS'],
    disciplines: [
      { _key: 'disc-1', number: '01', title: 'Architecture', description: 'Comprehensive architectural design tailored to cultural context, climate, and structural integrity.' },
      { _key: 'disc-2', number: '02', title: 'Master Planning', description: 'Large-scale urban interventions and campus planning.' },
      { _key: 'disc-3', number: '03', title: 'Interior Design', description: 'Meticulous interior curation focusing on material authenticity, acoustic control, and bespoke detailing.' },
      { _key: 'disc-4', number: '04', title: 'Landscape', description: 'Integration of built form with indigenous ecology.' },
    ],
  });

  // ─── CONTACT PAGE ────────────────────────────────────────────────────────
  console.log('📬 Contact Page...');
  await client.createOrReplace({
    _id: 'contactPage', _type: 'contactPage',
    seoDescription: 'Get in touch with Guruvells Architecture.',
    introText: 'Contact us directly or submit a form enquiry and a member of the team will be in touch.',
    phoneNumber: '+91 44 2222 3333',
    emailAddress: 'STUDIO@GURUVELLS.COM',
    submitButtonText: 'Submit Enquiry',
    submissionEmail: 'studio@guruvells.com',
  });

  console.log('\n🎉 Seed complete! Open http://localhost:3001/studio to edit everything.\n');
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});
