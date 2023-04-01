import useSWR from 'swr'
import groq from 'next-sanity'
import { client as sanityClient } from '@lib/sanity.client'

const fetcher = (query: string) => sanityClient.fetch(query)

export const useAdCarousel = () => {
  const query = `*[_type == "werbung"]{
    _id,
    title,
    "imageUrl": mainImage.asset->url
  }`

  const { data, error } = useSWR(query, fetcher)

  const revalidate = 30

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}
