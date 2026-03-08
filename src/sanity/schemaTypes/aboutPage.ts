import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'aboutPage',
    title: 'About Page',
    type: 'document',
    fields: [
        defineField({
            name: 'seoDescription',
            title: 'SEO Description',
            type: 'text',
            rows: 2,
        }),
        // Hero Image
        defineField({
            name: 'heroImage',
            title: 'Top Hero Image Full Width',
            type: 'image',
            options: { hotspot: true },
        }),
        // Intro Section
        defineField({
            name: 'introHeading',
            title: 'Intro Heading (e.g. Who We Are)',
            type: 'string',
            initialValue: 'Who We Are',
        }),
        defineField({
            name: 'introHeadingSize',
            title: 'Intro Heading Font Size',
            type: 'string',
            options: {
                list: [
                    { title: 'Small', value: 'text-4xl md:text-5xl lg:text-6xl' },
                    { title: 'Medium', value: 'text-5xl md:text-6xl lg:text-[5.5rem]' },
                    { title: 'Large', value: 'text-6xl md:text-7xl lg:text-[6.5rem]' },
                    { title: 'Extra Large', value: 'text-7xl md:text-8xl lg:text-[7.5rem]' },
                ],
                layout: 'dropdown'
            },
            initialValue: 'text-5xl md:text-6xl lg:text-[5.5rem]',
        }),
        defineField({
            name: 'introParagraphs',
            title: 'Intro Paragraphs',
            type: 'array',
            of: [{ type: 'text', rows: 4 }],
        }),
        defineField({
            name: 'introParagraphSize',
            title: 'Intro Paragraph Font Size',
            type: 'string',
            options: {
                list: [
                    { title: 'Small', value: 'text-lg md:text-xl' },
                    { title: 'Medium', value: 'text-xl md:text-2xl' },
                    { title: 'Large', value: 'text-2xl md:text-[2rem]' },
                    { title: 'Extra Large', value: 'text-3xl md:text-[2.5rem]' },
                ],
                layout: 'dropdown'
            },
            initialValue: 'text-2xl md:text-[2rem]',
        }),
        // Secondary Image
        defineField({
            name: 'secondaryImage',
            title: 'Secondary Full Width Image (Middle)',
            type: 'image',
            options: { hotspot: true },
        }),
        // Commitment Section
        defineField({
            name: 'commitmentHeading',
            title: 'Commitment Heading',
            type: 'string',
            initialValue: 'Our Commitment',
        }),
        defineField({
            name: 'commitmentHeadingSize',
            title: 'Commitment Heading Font Size',
            type: 'string',
            options: {
                list: [
                    { title: 'Small', value: 'text-3xl md:text-4xl lg:text-4xl' },
                    { title: 'Medium', value: 'text-4xl md:text-5xl lg:text-5xl' },
                    { title: 'Large', value: 'text-5xl md:text-6xl lg:text-6xl' },
                ],
                layout: 'dropdown'
            },
            initialValue: 'text-4xl md:text-5xl lg:text-5xl',
        }),
        defineField({
            name: 'commitmentText',
            title: 'Commitment Description text',
            type: 'text',
            rows: 4,
        }),
        defineField({
            name: 'commitmentTextSize',
            title: 'Commitment Text Font Size',
            type: 'string',
            options: {
                list: [
                    { title: 'Small', value: 'text-base md:text-lg' },
                    { title: 'Medium', value: 'text-lg md:text-xl' },
                    { title: 'Large', value: 'text-xl md:text-2xl' },
                ],
                layout: 'dropdown'
            },
            initialValue: 'text-lg md:text-xl',
        }),
    ],
    preview: { select: { title: 'introHeading' } },
});
