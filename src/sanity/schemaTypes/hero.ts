const heroSchema = {
    name: 'hero',
    title: 'Hero Section',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Massive Typography Title',
            type: 'string',
            description: 'The text that acts as an SVG mask',
            initialValue: 'GURUVELLS',
        },
        {
            name: 'backgroundMedia',
            title: 'Background Media',
            type: 'file',
            options: {
                accept: 'video/*,image/*',
            },
            description: 'Looping architectural video or image',
        },
    ],
};

export default heroSchema;
