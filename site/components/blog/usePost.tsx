import useSWR from 'swr'
import { client as sanityClient } from '@lib/sanity.client'

const fetcher = (query: string) => sanityClient.fetch(query)

export const usePost = () => {
  const query = `*[_type=='post']{
      ...,
      author->,
      categories[]->
    } | order(_createdAt desc)
    `

  const { data, error } = useSWR(query, fetcher, { refreshInterval: 3000 })

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}
