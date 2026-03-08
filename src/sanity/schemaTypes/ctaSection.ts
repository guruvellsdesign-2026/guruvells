// CTA Section — Singleton for the parallax Call-to-Action block
const ctaSection = {
    name: 'ctaSection',
    title: 'CTA Section',
    type: 'document',
    fields: [
        {
            name: 'label',
            title: 'Top Label',
            type: 'string',
            initialValue: 'GET STARTED',
        },
        {
            name: 'heading',
            title: 'CTA Heading',
            type: 'string',
            initialValue: "Let's make things happen.",
        },
        {
            name: 'buttonText',
            title: 'Hover Button Text',
            type: 'string',
            initialValue: 'Make it happen',
        },
        {
            name: 'columnImages',
            title: 'Background Column Images',
            type: 'array',
            of: [{
                type: 'image',
                options: { hotspot: true },
            }],
            description: 'Images used in the parallax columns (up to 10)',
        },
    ],
    preview: {
        prepare: () => ({ title: 'CTA Section' }),
    },
};

export default ctaSection;
