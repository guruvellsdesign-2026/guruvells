// Sustainability Section — Singleton for homepage sustainability block
const sustainabilitySection = {
    name: 'sustainabilitySection',
    title: 'Sustainability Section',
    type: 'document',
    fields: [
        {
            name: 'sectionLabel',
            title: 'Section Label',
            type: 'string',
            initialValue: '( 03 ) — Sustainability',
        },
        {
            name: 'headingLines',
            title: 'Heading Lines',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Each entry is one line of the heading',
        },
        {
            name: 'bodyParagraphs',
            title: 'Body Paragraphs',
            type: 'array',
            of: [{ type: 'text', rows: 4 }],
        },
        {
            name: 'image',
            title: 'Section Image',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'buttonText',
            title: 'Button Text',
            type: 'string',
            initialValue: 'Sustainability',
        },
    ],
    preview: {
        prepare: () => ({ title: 'Sustainability Section' }),
    },
};

export default sustainabilitySection;
