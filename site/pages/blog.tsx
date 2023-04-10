// pages/blog.tsx
import BlogList from '@components/blog/BlogList'
import FeaturedPost from '@components/blog/FeaturedPost'
import { usePost } from '@components/blog/usePost'
import { Head, Layout } from '@components/common'

export default function Blog() {
  const { data, isLoading, isError } = usePost()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {isError.message}</div>
  }

  const newestPost = data[0]

  return (
    <>
      <FeaturedPost post={newestPost} />
      <BlogList />
    </>
  )
}

Blog.Layout = Layout
