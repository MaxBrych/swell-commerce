import { FC } from 'react'
interface Props {}

const Vertragspartner: FC<Props> = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 ">
      <div className="py-12 md:py-16">
        <h1 className="text-4xl text-center font-bold md:text-4xl mb-4">
          Vertragspartner
        </h1>
        <div className="flex justify-between w-full h-32 gap-4 overflow-x-auto bg-gray-100 rounded-2xl">
          <div>Partner</div>
          <div>Partner</div>
          <div>Partner</div>
          <div>Partner</div>
          <div>Partner</div>
        </div>
      </div>
    </div>
  )
}

export default Vertragspartner
