import { useService } from './useService'
import BlockContent from '@sanity/block-content-to-react'
import Image from 'next/image'

const Service = () => {
  const { data, isLoading, isError } = useService()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {isError.message}</div>
  }

  return (
    <div>
      <div className="flex items-center justify-center w-full h-48 mb-8 text-3xl bg-gray-300 md:text-4xl text-bold">
        Dienstleistungen
      </div>
      <div className="grid grid-cols-1 gap-6 px-4 py-6 md:grid-cols-3 md:px-8 lg:px-16 md:py-16">
        {data.map(
          (item: {
            _id: string
            title: string
            description: string
            price: string
            details: any[]
            imageUrl: string
          }) => (
            <div
              key={item._id}
              className="flex flex-col justify-start w-full h-[50vh] overflow-hidden border border-gray-300 rounded-xl"
            >
              <div className="flex justify-center py-4 text-center text-white bg-[#FF9900]">
                <Image
                  alt={item.title}
                  src={item.imageUrl}
                  width={36}
                  height={36}
                />
                <h1 className="text-2xl font-bold">{item.title}</h1>
              </div>
              <div className="my-4">
                <BlockContent blocks={item.details} />
              </div>
              <h1>{item.price}</h1>
              <div className="flex items-center justify-center mb-4"></div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Service
