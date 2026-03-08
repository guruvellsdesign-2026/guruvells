// Services Page Schema
const servicesPageSchema = {
    name: 'servicesPage',
    title: 'Services Page',
    type: 'document',
    fields: [
        {
            name: 'seoDescription',
            title: 'SEO Description',
            type: 'text',
            rows: 2,
        },
        {
            name: 'heroLabel',
            title: 'Hero Label (small text)',
            type: 'string',
            initialValue: '( Disciplines )',
        },
        {
            name: 'heroHeading',
            title: 'Hero Heading Lines',
            type: 'array',
            of: [{ type: 'string' }],
        },
        {
            name: 'disciplines',
            title: 'Disciplines / Services',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    { name: 'number', type: 'string', title: 'Number (e.g. 01)' },
                    { name: 'title', type: 'string', title: 'Service Title' },
                    { name: 'description', type: 'text', title: 'Description', rows: 4 },
                    {
                        name: 'image',
                        title: 'Service Image (optional)',
                        type: 'image',
                        options: { hotspot: true },
                    },
                ],
                preview: {
                    select: { title: 'title', subtitle: 'number' },
                },
            }],
        },
    ],
    preview: { select: { title: 'heroHeading' } },
};

export default servicesPageSchema;
