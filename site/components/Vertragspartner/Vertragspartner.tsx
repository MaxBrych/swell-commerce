import { FC } from 'react'
interface Props {}

const Vertragspartner: FC<Props> = () => {
  return (
    <>
      <div className="py-12 md:py-16">
        <h1 className="text-4xl text-center md:text-5xl ">Vertragspartner</h1>
        <div className="flex justify-between w-full h-32 gap-4 overflow-x-auto bg-slate-300 rounded-2xl">
          <div>Partner</div>
          <div>Partner</div>
          <div>Partner</div>
          <div>Partner</div>
          <div>Partner</div>
        </div>
      </div>
    </>
  )
}

export default Vertragspartner
