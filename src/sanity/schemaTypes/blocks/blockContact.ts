import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'blockContact',
    title: 'Contact Form Block',
    type: 'object',
    fields: [
        defineField({
            name: 'heading',
            title: 'Form Heading',
            type: 'string',
            initialValue: 'Contact us directly or submit a form enquiry.',
        }),
        defineField({
            name: 'mapImage',
            title: 'Map Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'submissionEmail',
            title: 'Form Submission Email',
            type: 'string',
        }),
    ],
    preview: {
        select: {
            title: 'heading',
        },
        prepare(selection) {
            return {
                title: 'Contact Block',
                subtitle: selection.title,
            };
        },
    },
});
