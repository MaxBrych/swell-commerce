import { groq } from 'next-sanity'
import { client } from '@lib/sanity.client'
import BlogList from '@components/blog/BlogList'
import { useEffect, useState } from 'react'
import { Head, Layout } from '@components/common'

const query = groq`
*[_type=='post']{
  ...,
  author->,
  categories[]->
} | order(_createdAt desc)
`

export const revalidate = 30 //revalidate content on this page every 39 seconds

export default function Blog() {
  // const posts = await client.fetch(query)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await client.fetch(query)
      setPosts(data)
    }
    fetchPosts()
  }, [])
  return (
    <>
      <BlogList posts={posts} />
    </>
  )
}

Blog.Layout = Layout
