// Footer Section — Singleton for the homepage footer/contact area
const footerSection = {
    name: 'footerSection',
    title: 'Footer Section',
    type: 'document',
    fields: [
        {
            name: 'navLinks',
            title: 'Navigation Links',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    { name: 'label', type: 'string', title: 'Label' },
                    { name: 'number', type: 'string', title: 'Number (e.g. 01)' },
                    { name: 'href', type: 'string', title: 'Link URL (optional)' },
                ],
                preview: {
                    select: { title: 'label', subtitle: 'number' },
                },
            }],
        },
        {
            name: 'email',
            title: 'Email Address',
            type: 'string',
            initialValue: 'studio@guruvells.com',
        },
        {
            name: 'phone',
            title: 'Phone Number',
            type: 'string',
            initialValue: '+91 44 2222 3333',
        },
        {
            name: 'socialLinks',
            title: 'Social Links',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    { name: 'platform', type: 'string', title: 'Platform Name' },
                    { name: 'url', type: 'string', title: 'URL' },
                ],
            }],
        },
        {
            name: 'studioName',
            title: 'Studio Name',
            type: 'string',
            initialValue: 'Guruvells Design Consultants Pvt. Ltd.',
        },
        {
            name: 'studioLocation',
            title: 'Studio Location',
            type: 'string',
            initialValue: 'Tamil Nadu, India',
        },
        {
            name: 'copyrightText',
            title: 'Copyright Text',
            type: 'string',
        },
    ],
    preview: {
        prepare: () => ({ title: 'Footer Section' }),
    },
};

export default footerSection;
