import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'blockHero',
    title: 'Hero Section',
    type: 'object',
    fields: [
        defineField({
            name: 'line1',
            title: 'Line 1 (e.g. GLOBAL LUXURY)',
            type: 'string',
        }),
        defineField({
            name: 'line2',
            title: 'Line 2 (e.g. ARCHITECTURE)',
            type: 'string',
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
        }),
        defineField({
            name: 'backgroundImages',
            title: 'Background Images',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
        }),
    ],
    preview: {
        select: {
            title: 'line1',
            subtitle: 'line2',
        },
        prepare(selection) {
            return {
                title: 'Hero Section',
                subtitle: `${selection.title} ${selection.subtitle}`,
            };
        },
    },
});
