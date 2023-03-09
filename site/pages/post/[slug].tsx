import { groq } from 'next-sanity'
import { client } from '../../lib/sanity.client'
import Image from 'next/image'
import urlFor from '../../lib/urlFor'
import { PortableText } from '@portabletext/react'
import { RichTextComponents } from '../../components/blog/RichTextComponents'
import Link from 'next/link'
import { MdArrowBackIosNew } from 'react-icons/md'

type Props = {
  post: Post
  params: any
}

export const revalidate = 30 //revalidate content on this page every 39 seconds

export default function Post({ post }: Props) {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="mt-8 md:py-18 sm:w-2/3">
        <div className="px-4 pt-16 md:pt-0">
          <div>
            <h1 className="text-5xl font-semibold md:text-5xl">{post.title}</h1>
            <div className="flex justify-between py-6 sm:py-8 ">
              <div className="flex flex-row align-top">
                <Image
                  className="rounded-full"
                  src={urlFor(post.author.image).url()}
                  alt={post.author.name}
                  width={40}
                  height={40}
                />
                <p className="px-2 font-semibold text-m"> {post.author.name}</p>
              </div>
              <p className="">
                {new Date(post._createdAt).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div>
              <Image
                className="object-cover object-center mx-auto"
                src={urlFor(post.mainImage).url()}
                alt={post.author.name}
                width={560}
                height={160}
              />
            </div>
            <p className="py-6 text-lg sm:text-2xl">{post.description}</p>
            <div>{/* TODO: CATEGORIES */}</div>
          </div>
          <div className="py-6 text-lg sm:text-2xl">
            <PortableText value={post.body} components={RichTextComponents} />
          </div>
        </div>
        <div className="absolute right-6 top-24">
          <h1 className="invisible md:visible">Sidebar</h1>
        </div>
        <div className="absolute invisible left-4 top-20 sm:left-6 sm:top-24 md:visible">
          <Link href="/blog">
            <MdArrowBackIosNew className="w-12 h-12 p-3 border border-gray-400 rounded-full hover:bg-gray-100" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({ params: { slug } }: Props) {
  const query = groq`
  *[_type == 'post' && slug.current == $slug] [0]
  {
    ...,
    author->,
    categories[]->
  }
  `
  const post: Post = await client.fetch(query, { slug })

  return {
    props: {
      post,
    },
  }
}
