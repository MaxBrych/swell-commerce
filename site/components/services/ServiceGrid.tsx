import Link from 'next/link'
import { useService } from './useService'
import Image from 'next/image'

interface ServiceGridProps {
  _id: string
  title: string
  description: string
  price: string
  details: string
  imageUrl: string
}

const ServiceGrid = () => {
  const { data, isLoading, isError } = useService()

  if (isLoading) {
    return <div>Inhalt läd...</div>
  }

  if (isError) {
    return <div>Error: {isError.message}</div>
  }

  return (
    <div className="px-4 py-6 md:px-8 lg:px-16 md:py-16">
      <div className="flex justify-between w-full mb-3">
        <h1 className="text-2xl font-bold ">Dienstleistungen</h1>
        <Link
          href="/service"
          className="flex items-center justify-center h-10 px-6 text-white bg-orange-500 rounded-full curser-pointer"
        >
          Alle Services
        </Link>
      </div>
      <div className="flex flex-1 gap-6 overflow-x-auto md:overflow-hidden md:grid md:grid-cols-3">
        {data.map((item: ServiceGridProps) => (
          <div
            key={item._id}
            className="flex w-[75vw] md:w-full  p-4 border border-gray-300 md:block rounded-xl"
          >
            <div className="inline-flex flex-shrink-0 p-4 mb-3 bg-gray-100 rounded-full">
              <Image
                alt={item.title}
                src={item.imageUrl}
                width={24}
                height={24}
              />
            </div>
            <h1 className="text-2xl font-bold">{item.title}</h1>
            <div className="hidden md:block">{item.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ServiceGrid
