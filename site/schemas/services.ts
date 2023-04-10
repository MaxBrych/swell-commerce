import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'services',
  title: 'Dienstleistungen',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'description',
      title: 'Beschreibung',
      type: 'string',
    }),

    defineField({
      name: 'price',
      title: 'Preis',
      type: 'string',
    }),

    defineField({
      name: 'details',
      title: 'Details',
      type: 'blockContent',
    }),

    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
})
