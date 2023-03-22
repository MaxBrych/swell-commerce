import { FC } from 'react'
interface Props {
  kunden: Kunden[]
}

const Kunden: FC<Props> = ({ kunden }: Props) => {
  return (
    <>
      <div className="flex gap-6 py-12 overflow-x-auto md:py-16 md:grid md:grid-cols-4">
        {kunden.map((kunde) => (
          <div className="w-[50vw]  md:w-auto border border-gray-300 rounded-xl p-4 flex flex-col justify-start h-[30vh]">
            <p className="text-base md:text-xl">{kunde.kommentar}</p>
            <h5 className="text-xs font-semibold md:text-base">{kunde.name}</h5>
          </div>
        ))}
      </div>
    </>
  )
}

export default Kunden
