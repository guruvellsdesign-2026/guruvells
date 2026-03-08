import { Rule } from "sanity";

const philosophySchema = {
    name: 'philosophy',
    title: 'Philosophy Section',
    type: 'document',
    fields: [
        {
            name: 'heading',
            title: 'Sticky Heading',
            type: 'string',
            initialValue: 'Ancient Geometry. Modern Clarity.',
        },
        {
            name: 'images',
            title: 'Scrolling Images',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
            validation: (Rule: Rule) => Rule.max(3),
            description: 'Upload exactly 3 images (Blueprint, Concrete, 3D Render)',
        },
    ],
};

export default philosophySchema;
