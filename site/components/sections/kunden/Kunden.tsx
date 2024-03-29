import { FC } from 'react'
interface Props {
  kunden: Kunden[]
}

const Kunden: FC<Props> = ({ kunden }: Props) => {
  return (
    <div className="px-4 py-6 md:px-8 lg:px-16 md:py-16 ">
      <h1 className="py-3 mb-4 text-3xl font-bold text-center md:text-4xl">
        Das sagen unsere Kunden
      </h1>
      <div className="flex gap-6 overflow-x-auto md:grid md:grid-cols-4">
        {kunden.map((kunde) => (
          <div
            key={kunde._id}
            className="w-[50vw] flex-shrink-0 md:w-auto border border-gray-300 rounded-xl p-4 flex flex-col justify-between h-[30vh]"
          >
            <p className="text-base md:text-xl">{kunde.kommentar}</p>
            <h5 className="text-xs font-semibold md:text-base">{kunde.name}</h5>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Kunden
