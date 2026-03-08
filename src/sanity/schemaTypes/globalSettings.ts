import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'globalSettings',
    title: 'Global Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'siteTitle',
            title: 'Site Title',
            type: 'string',
            description: 'The global title of the website (e.g., Guruvells Architecture).',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'siteDescription',
            title: 'Site Description',
            type: 'text',
            description: 'Global SEO description for the website.',
        }),
        defineField({
            name: 'seoImage',
            title: 'SEO Image',
            type: 'image',
            description: 'Default image used for social sharing (Open Graph).',
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Global Settings',
            };
        },
    },
});
