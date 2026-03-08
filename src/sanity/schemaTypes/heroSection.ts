// Hero Section — Singleton for homepage hero
const heroSection = {
    name: 'heroSection',
    title: 'Hero Section',
    type: 'document',
    fields: [
        {
            name: 'line1',
            title: 'Line 1 (Top word)',
            type: 'string',
            initialValue: 'Timeless',
        },
        {
            name: 'subtitle',
            title: 'Subtitle (Middle italic word)',
            type: 'string',
            initialValue: 'Tailored',
        },
        {
            name: 'line2',
            title: 'Line 2 (Bottom word)',
            type: 'string',
            initialValue: 'Spaces',
        },
        {
            name: 'buttonText',
            title: 'Scroll Button Text',
            type: 'string',
            initialValue: 'Explore Philosophy',
        },
        {
            name: 'titleColor',
            title: 'Title Color',
            type: 'string',
            options: {
                list: [
                    { title: 'White (Default)', value: 'white' },
                    { title: 'Black', value: 'black' },
                    { title: 'Bronze / Accent', value: 'bronze' },
                ],
            },
            initialValue: 'white',
        },
        {
            name: 'titleSize',
            title: 'Title Font Size',
            type: 'string',
            options: {
                list: [
                    { title: 'Default (Large)', value: 'default' },
                    { title: 'Medium', value: 'medium' },
                    { title: 'Small', value: 'small' },
                    { title: 'Extra Large', value: 'xlarge' },
                ],
            },
            initialValue: 'default',
        },
        {
            name: 'animationStyle',
            title: 'Animation Style',
            type: 'string',
            options: {
                list: [
                    { title: 'Slide Up (Default)', value: 'slideUp' },
                    { title: 'Fade In', value: 'fadeIn' },
                    { title: 'Instant / No Animation', value: 'none' },
                ],
            },
            initialValue: 'slideUp',
        },
        {
            name: 'backgroundImage',
            title: 'Background Image',
            type: 'image',
            options: { hotspot: true },
            description: 'Full-screen hero background',
        },
    ],
    preview: {
        select: { title: 'line1' },
        prepare: (selection: Record<string, any>) => ({ title: `Hero: ${selection.title}` }),
    },
};

export default heroSection;
