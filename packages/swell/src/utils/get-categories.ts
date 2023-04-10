import { SwellConfig } from '../api'
import type { Category } from '@vercel/commerce/types/site'

const getCategories = async (config: SwellConfig): Promise<Category[]> => {
  const data = await config.fetch('categories', 'get', {
    fields: 'id,name,slug,image', // Add image to the fields parameter
  })

  return (
    data.results.map(({ id, name, slug, image }: any) => ({
      id,
      name,
      slug,
      path: `/${slug}`,
      image: {
        url: image?.file.url, // Add the image URL
        altText: image?.alt_text, // Add the image alt text
      },
    })) ?? []
  )
}

export default getCategories
