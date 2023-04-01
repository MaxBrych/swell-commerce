import useSWR from 'swr'
import { client as sanityClient } from '@lib/sanity.client'

const fetcher = (query: string) => sanityClient.fetch(query)

export const useAbout = () => {
  const query = `*[_type == "about"]{
    _id,
    title,
    "imageUrl": mainImage.asset->url,
    body,
    author-> { name, "imageUrl": image.asset->url }
  }`

  const { data, error } = useSWR(query, fetcher)

  const revalidate = 30

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}
