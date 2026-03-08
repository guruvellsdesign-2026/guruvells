const contactSchema = {
    name: 'contact',
    title: 'Contact Section',
    type: 'document',
    fields: [
        {
            name: 'heading',
            title: 'Contact Heading',
            type: 'string',
            initialValue: 'Lay the First Stone.',
        },
        {
            name: 'emailRef',
            title: 'Receiving Email Address',
            type: 'string',
        },
    ],
};

export default contactSchema;
