import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schema } from './src/sanity/schemaTypes';

const singletonActions = new Set(['publish', 'discardChanges', 'restore']);
const singletonTypes = new Set([
    'globalSettings', 'navigation', 'footer',
    'aboutPage', 'servicesPage', 'contactPage',
    'heroSection', 'philosophySection', 'sustainabilitySection', 'ctaSection', 'footerSection',
]);

export default defineConfig({
    projectId: 'do4k1nvo',
    dataset: 'production',
    basePath: typeof window !== 'undefined' && window.location.pathname.startsWith('/studio') ? '/studio' : undefined,
    title: 'Guruvells Studio',
    plugins: [
        structureTool({
            structure: (S) =>
                S.list()
                    .title('Content')
                    .items([
                        // ── Global Settings ──────────────────────────────
                        S.listItem()
                            .title('⚙️  Global Settings')
                            .id('globalSettings')
                            .child(S.document().schemaType('globalSettings').documentId('globalSettings')),
                        S.listItem()
                            .title('🧭  Navigation')
                            .id('navigation')
                            .child(S.document().schemaType('navigation').documentId('navigation')),

                        S.divider(),

                        // ── Homepage Sections ────────────────────────────
                        S.listItem()
                            .title('🏠  Homepage')
                            .child(
                                S.list()
                                    .title('Homepage Sections')
                                    .items([
                                        S.listItem()
                                            .title('🎬  Hero Section')
                                            .id('heroSection')
                                            .child(S.document().schemaType('heroSection').documentId('heroSection')),
                                        S.listItem()
                                            .title('✍️  Philosophy Section')
                                            .id('philosophySection')
                                            .child(S.document().schemaType('philosophySection').documentId('philosophySection')),
                                        S.listItem()
                                            .title('🌿  Sustainability Section')
                                            .id('sustainabilitySection')
                                            .child(S.document().schemaType('sustainabilitySection').documentId('sustainabilitySection')),
                                        S.listItem()
                                            .title('🚀  CTA Section')
                                            .id('ctaSection')
                                            .child(S.document().schemaType('ctaSection').documentId('ctaSection')),
                                        S.listItem()
                                            .title('🦶  Footer Section')
                                            .id('footerSection')
                                            .child(S.document().schemaType('footerSection').documentId('footerSection')),
                                    ])
                            ),

                        S.divider(),

                        // ── Subpages ─────────────────────────────────────
                        S.listItem()
                            .title('📖  About Page')
                            .id('aboutPage')
                            .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
                        S.listItem()
                            .title('🛠️  Services Page')
                            .id('servicesPage')
                            .child(S.document().schemaType('servicesPage').documentId('servicesPage')),
                        S.listItem()
                            .title('📬  Contact Page')
                            .id('contactPage')
                            .child(S.document().schemaType('contactPage').documentId('contactPage')),

                        S.divider(),

                        // ── Projects ─────────────────────────────────────
                        S.documentTypeListItem('portfolio').title('🏛️  Portfolio Projects'),
                    ]),
        }),
    ],
    schema: {
        types: schema.types,
        templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
    },
    document: {
        actions: (input, context) =>
            singletonTypes.has(context.schemaType)
                ? input.filter(({ action }) => action && singletonActions.has(action))
                : input,
    },
});
