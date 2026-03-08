import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'navigation',
    title: 'Navigation',
    type: 'document',
    fields: [
        defineField({
            name: 'links',
            title: 'Menu Links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() },
                        { name: 'href', title: 'URL Path', type: 'string', description: 'Internal path like /projects or /about', validation: (Rule) => Rule.required() }
                    ],
                },
            ],
        }),
        defineField({
            name: 'contactButtonText',
            title: 'Contact Button Text',
            type: 'string',
            initialValue: 'CONTACT US',
        }),
        defineField({
            name: 'contactButtonHref',
            title: 'Contact Button URL Path',
            type: 'string',
            initialValue: '/contact',
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Navigation Menu',
            };
        },
    },
});
