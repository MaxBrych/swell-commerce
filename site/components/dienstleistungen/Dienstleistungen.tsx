import { FC } from 'react'
interface Props {}

const Dienstleistungen: FC<Props> = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 ">
      <div className="py-12 md:py-16">
        <h1 className="text-4xl text-center font-bold md:text-4xl mb-4">
          Dienstleistungen
        </h1>
        <div className="flex w-full gap-6 overflow-x-auto md:grid md:grid-cols-3 h-[75vh]">
          <div className="w-[50vw] md:w-auto bg-gray-100 rounded-3xl p-4 flex flex-col justify-start h-full">
            <h1>Reperatur</h1>
            <div></div>
          </div>
          <div className="w-[50vw] md:w-auto bg-gray-100 rounded-3xl p-4 flex flex-col justify-start h-full">
            <h1>Beratung</h1>
            <div></div>
          </div>
          <div className="w-[50vw] md:w-auto bg-gray-100 rounded-3xl p-4 flex flex-col justify-start h-full">
            <h1>Einrichten</h1>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dienstleistungen
