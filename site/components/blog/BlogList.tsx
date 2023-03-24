import Image from 'next/image'
import urlFor from '../../lib/urlFor'
import ClientSideRoute from './ClientSideRoute'

type Props = {
  posts: Post[]
}

export default function BlogList({ posts }: Props) {
  {
    /*console.log(posts.length);*/
  }

  return (
    <div className="w-full px-4 py-8 md:px-8 lg:px-16">
      <div className="py-2 text-2xl font-semibold ">Bilde dich weiter</div>
      <div className="flex gap-4 overflow-x-scroll md:grid md:overflow-hidden md:grid-cols-3 md:w-full md:gap-x-4 gap-y-16">
        {/* Posts */}
        {posts.map((post) => (
          <ClientSideRoute key={post._id} route={`/post/${post.slug.current}`}>
            <div className="flex flex-col cursor-pointer group">
              <div className="relative w-full h-48 md:h-56">
                <Image
                  className="object-cover object-left rounded-2xl"
                  src={urlFor(post.mainImage).url()}
                  alt={post.title}
                  fill
                />
                <div className="absolute bottom-0 flex justify-between invisible w-full p-5 bg-black bg-opacity-20 rounded-b-2xl">
                  <div>
                    <p className="text-lg font-bold">{post.title}</p>
                    <p>
                      {new Date(post._createdAt).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-1 mt-4 ">
                <h1 className="mb-1 text-xl font-semibold leading-5">
                  {post.title}
                </h1>
                <p className="line-clamp-3">{post.description}</p>
              </div>
            </div>
          </ClientSideRoute>
        ))}
      </div>
    </div>
  )
}
