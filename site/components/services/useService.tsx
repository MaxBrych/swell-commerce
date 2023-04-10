import useSWR from 'swr'
import { client as sanityClient } from '@lib/sanity.client'

const fetcher = (query: string) => sanityClient.fetch(query)

export const useService = () => {
  const query = `*[_type == "services"]{
    _id,
    title,
    description,
    price,
    details[]{
        ...,
        _type == "image" => {
          "imageUrl": asset->url
        }
      },
    "imageUrl": mainImage.asset->url,
  }`

  const { data, error } = useSWR(query, fetcher, { refreshInterval: 3000 }) // 30000 ms = 30 seconds

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}
