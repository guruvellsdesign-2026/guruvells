import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'blockTextParallax',
    title: 'Text Parallax (Elicyon Effect)',
    type: 'object',
    fields: [
        defineField({
            name: 'textLayers',
            title: 'Text Lines',
            type: 'array',
            description: 'Provide each line of text separately to allow vertical shatter effect on scroll.',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'floatingImages',
            title: 'Floating Parallax Images',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
            validation: (Rule) => Rule.max(4),
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Text Parallax (Elicyon Effect)',
            };
        },
    },
});
