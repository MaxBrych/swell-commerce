import { FC } from 'react'
interface Props {}

const Dienstleistungen: FC<Props> = () => {
  return (
    <>
      <div>
        <h1 className="text-4xl text-center md:text-5xl ">Dienstleistungen</h1>
        <div className="flex w-full overflow-x-auto md:grid md:grid-cols-3">
          <div className="w-[50vw] md:w-auto bg-orange-300 rounded-2xl p-4 flex flex-col justify-start h-[30vh]">
            <h1>Reperatur</h1>
            <div></div>
          </div>
          <div className="w-[50vw] md:w-auto bg-orange-300 rounded-2xl p-4 flex flex-col justify-start h-[30vh]">
            <h1>Beratung</h1>
            <div></div>
          </div>
          <div className="w-[50vw] md:w-auto bg-orange-300 rounded-2xl p-4 flex flex-col justify-start h-[30vh]">
            <h1>Einrichten</h1>
            <div></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dienstleistungen