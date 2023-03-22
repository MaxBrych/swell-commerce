import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'kunden',
  title: 'Kunden',
  type: 'document',
  fields: [
    {
      name: 'kommentar',
      title: 'Kommentar',
      type: 'string',
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
