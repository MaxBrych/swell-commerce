// components/blog/FeaturedPost.tsx
import Image from 'next/image'
import urlFor from '../../lib/urlFor'
import ClientSideRoute from './ClientSideRoute'

type Props = {
  post: any
}

const FeaturedPost: React.FC<Props> = ({ post }) => {
  return (
    <ClientSideRoute route={`/post/${post.slug.current}`}>
      <div className="w-full px-4 py-8 md:flex md:px-8 lg:px-16">
        <div className="relative w-full h-48 mb-2 mr-4 md:h-96 md:w-2/3 aspect-w-16">
          <Image
            className="object-cover object-left rounded-xl md:mb-0"
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            layout="fill"
          />
        </div>
        <div className="flex flex-col justify-center w-full md:w-1/3">
          <p>Neuster Post</p>
          <h3 className="mb-2 text-sm font-bold text-gray-600 uppercase"></h3>
          <h1 className="mb-2 text-3xl font-semibold leading-5 md:mb-4">
            {post.title}
          </h1>
          <p className="mb-2 text-lg text-gray-600 md:mb-4">
            {post.description}
          </p>
          <p>
            {new Date(post._createdAt).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>
    </ClientSideRoute>
  )
}

export default FeaturedPost
