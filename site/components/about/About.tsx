import { useAbout } from './useAbout'
import Image from 'next/image'

const About = () => {
  const { data, isLoading, isError } = useAbout()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {isError.message}</div>
  }

  return (
    <div>
      {data.map(
        (item: {
          description: string
          _id: string
          imageUrl: string
          title: string
          body: any
          author: { name: string; imageUrl: string }
        }) => (
          <div key={item._id} className="rounded-3xl">
            <div className="h-64 md:h-96 w-full rounded-3xl">
              <Image
                src={item.imageUrl}
                alt={item.title}
                className="object-cover h-full w-full rounded-3xl"
                width={640}
                height={320}
              />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold">{item.title}</h1>
            </div>
            <div className="my-4">{item.description}</div>
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 mr-4 rounded-full">
                <Image
                  src={item.author.imageUrl}
                  alt={item.author.name}
                  className="object-cover h-full w-full rounded-full"
                  width={64}
                  height={64}
                />
              </div>
              <div className="text-xl font-semibold">{item.author.name}</div>
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default About