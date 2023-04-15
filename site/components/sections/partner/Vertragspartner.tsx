import { FC } from 'react'
import partner from './partner'
import Image from 'next/image'
interface Props {}
interface Partner {
  id: number
  name: string
  logo: string
}

const Vertragspartner: FC<Props> = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 ">
      <div className="py-12 md:py-16">
        <h1 className="mb-4 text-3xl font-bold text-center md:text-4xl">
          Vertragspartner
        </h1>
        <div className="flex justify-between w-full h-24 gap-6 overflow-x-auto md:h-32 ">
          {partner.map((item: Partner) => (
            <Image
              className="object-contain object-center"
              key={item.id}
              alt={item.name}
              src={item.logo}
              width={120}
              height={120}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Vertragspartner
