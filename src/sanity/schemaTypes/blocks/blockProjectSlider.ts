import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'blockProjectSlider',
    title: 'Horizontal Project Slider',
    type: 'object',
    fields: [
        defineField({
            name: 'heading',
            title: 'Hidden Heading (For Layout/Accessbility)',
            type: 'string',
            initialValue: 'Selected Projects',
        }),
        defineField({
            name: 'projects',
            title: 'Selected Projects',
            type: 'array',
            description: 'Select the projects you want to feature in this horizontal scroll section.',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'portfolio' }],
                },
            ],
        }),
    ],
    preview: {
        select: {
            projects: 'projects',
        },
        prepare(selection) {
            const count = selection.projects ? selection.projects.length : 0;
            return {
                title: 'Horizontal Project Slider',
                subtitle: `${count} Projects Selected`,
            };
        },
    },
});
