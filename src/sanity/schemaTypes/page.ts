import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'page',
    title: 'Page Builder',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Page Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'URL Slug',
            type: 'slug',
            description: 'The URL path (e.g. use "home" or "/" for the index).',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'seoDescription',
            title: 'SEO Description',
            type: 'text',
        }),
        defineField({
            name: 'pageBuilder',
            title: 'Page Sections',
            type: 'array',
            description: 'Drag and drop modular blocks to construct the page.',
            of: [
                { type: 'blockHero' },
                { type: 'blockTextParallax' },
                { type: 'blockProjectSlider' },
                { type: 'blockEditorial' },
                { type: 'blockContact' },
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'slug.current',
        },
        prepare({ title, subtitle }) {
            return {
                title,
                subtitle: `Path: /${subtitle === 'home' ? '' : subtitle}`,
            };
        },
    },
});
