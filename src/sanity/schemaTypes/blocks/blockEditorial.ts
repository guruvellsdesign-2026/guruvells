import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'blockEditorial',
    title: 'Editorial Section',
    type: 'object',
    fields: [
        defineField({
            name: 'content',
            title: 'Rich Content',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'image',
            title: 'Side Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'stats',
            title: 'Statistics Grid',
            type: 'array',
            description: 'E.g., "Team Size: 45+"',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', title: 'Label', type: 'string' },
                        { name: 'value', title: 'Value', type: 'string' },
                    ],
                },
            ],
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Editorial Layout',
            };
        },
    },
});
