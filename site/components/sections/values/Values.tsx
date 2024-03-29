import { FC } from 'react'
import Image from 'next/image'
import valueData from './valueData'
interface Props {}
interface ValueProps {
  id: number
  label: string
  descr: string
  image: string
}

const Values: FC<Props> = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 ">
      <div className="py-12 md:py-16">
        <h1 className="text-3xl font-bold text-center md:mb-4 md:text-4xl">
          Unsere Werte
        </h1>
        <div className="flex w-full gap-6 overflow-x-auto md:grid md:grid-cols-3 ">
          {valueData.map((item: ValueProps) => (
            <div
              key={item.id}
              className="w-[90vw] flex-1 flex-shrink-0  md:w-auto flex flex-col justify-center h-full"
            >
              <div className="flex items-center justify-center my-8">
                <Image
                  src={item.image}
                  alt={item.label}
                  width={160}
                  height={160}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-center md:text-4xl">
                  {item.label}
                </h1>
                <p className="text-xs text-center md:text-lg">{item.descr}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Values
