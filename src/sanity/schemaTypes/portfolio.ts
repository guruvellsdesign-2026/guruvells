import { Rule } from "sanity";

const portfolioSchema = {
    name: 'portfolio',
    title: 'Project',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Project Title',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        },
        {
            name: 'location',
            title: 'Location',
            type: 'string',
        },
        {
            name: 'year',
            title: 'Completion Year',
            type: 'string',
        },
        {
            name: 'discipline',
            title: 'Discipline',
            type: 'string',
        },
        {
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Completed', value: 'Completed' },
                    { title: 'Under Construction', value: 'Under Construction' },
                    { title: 'Design Phase', value: 'Design Phase' },
                    { title: 'Foundation Phase', value: 'Foundation Phase' },
                ],
            },
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 4,
        },
        {
            name: 'image',
            title: 'Main Project Image',
            type: 'image',
            options: { hotspot: true }
        },
        {
            name: 'imageUrl',
            title: 'Image URL (Fallback/External)',
            type: 'string',
            description: 'Provide an external image URL if not uploading directly.',
        },
        {
            name: 'size',
            title: 'Project Size / Scale',
            type: 'string',
            description: 'e.g. "32,670 sqft" or "1,200 m²"',
        },
        {
            name: 'gallery',
            title: 'Gallery Images',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
            description: 'Images shown in the scrolling image stack on the detail page.',
        },
        {
            name: 'titleFontSize',
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
            name: 'descriptionFontSize',
            title: 'Description Font Size',
            type: 'string',
            options: {
                list: [
                    { title: 'Default', value: 'default' },
                    { title: 'Small', value: 'small' },
                    { title: 'Large', value: 'large' },
                ],
            },
            initialValue: 'default',
        },
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'location',
            media: 'image',
        },
    },
};

export default portfolioSchema;
