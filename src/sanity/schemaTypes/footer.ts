import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'footer',
    title: 'Footer',
    type: 'document',
    fields: [
        defineField({
            name: 'phoneNumber',
            title: 'Phone Number',
            type: 'string',
        }),
        defineField({
            name: 'emailAddress',
            title: 'Email Address',
            type: 'string',
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'platform', title: 'Platform Name', type: 'string' },
                        { name: 'url', title: 'URL', type: 'url' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'copyrightText',
            title: 'Copyright Text',
            type: 'string',
            initialValue: '© 2024 Guruvells Architecture. All rights reserved.',
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Footer Settings',
            };
        },
    },
});
