// Philosophy Section — Singleton for parallax text + floating images
const philosophySection = {
    name: 'philosophySection',
    title: 'Philosophy Section',
    type: 'document',
    fields: [
        {
            name: 'textLayers',
            title: 'Text Layers',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Each entry is one line of the parallax text (7 lines recommended)',
        },
        {
            name: 'floatingImages',
            title: 'Floating Background Images',
            type: 'array',
            of: [{
                type: 'image',
                options: { hotspot: true },
            }],
            description: 'Images that float behind the text during scroll (4 recommended)',
        },
    ],
    preview: {
        prepare: () => ({ title: 'Philosophy Section' }),
    },
};

export default philosophySection;
