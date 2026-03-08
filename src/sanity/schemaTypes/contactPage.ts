// Contact Page Schema
const contactPageSchema = {
    name: 'contactPage',
    title: 'Contact Page',
    type: 'document',
    fields: [
        {
            name: 'seoDescription',
            title: 'SEO Description',
            type: 'text',
            rows: 2,
        },
        {
            name: 'introText',
            title: 'Intro Headings (The Hook)',
            type: 'text',
            rows: 3,
            description: "Large text at the top of the contact page (e.g., 'Let's Build Something Exceptional')",
        },
        {
            name: 'phoneNumber',
            title: 'Studio Phone Number',
            type: 'string',
        },
        {
            name: 'emailAddress',
            title: 'General Inquiries Email',
            type: 'string',
        },
        {
            name: 'mediaEmail',
            title: 'Press & Media Email',
            type: 'string',
            description: 'Email address specifically for PR and media inquiries',
        },
        {
            name: 'backgroundImage',
            title: 'Architectural Background Image',
            type: 'image',
            options: { hotspot: true },
            description: 'Dark, moody architectural background for the left column Anchor',
        },
        {
            name: 'mapImage',
            title: 'Map / Location Image',
            type: 'image',
            options: { hotspot: true },
            description: 'Grayscale image used as the location map thumbnail',
        },
        {
            name: 'projectTypes',
            title: 'Project Types (Pill Selectors)',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'The options available for users to select in the form (e.g., Architecture, Interior Design)',
        },
        {
            name: 'submitButtonText',
            title: 'Submit Button Text',
            type: 'string',
            initialValue: 'Submit Enquiry',
        },
        {
            name: 'submissionEmail',
            title: 'Form Submission Email',
            type: 'string',
            description: 'Email address that receives contact form submissions',
        },
    ],
    preview: { select: { title: 'introText' } },
};

export default contactPageSchema;
