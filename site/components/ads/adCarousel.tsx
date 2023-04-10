import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useAdCarousel } from './useAdCarousel'
import Image from 'next/image'

const AdCarousel = () => {
  const { data, isLoading, isError } = useAdCarousel()

  if (isLoading) {
    return <div>Inhalte laden...</div>
  }

  if (isError) {
    return <div>Error: {isError.message}</div>
  }

  return (
    <div className="flex justify-center w-full px-4 py-6 md:py-8">
      <Carousel
        className="overflow-hidden max-w-7xl rounded-xl md:rounded-3xl"
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        interval={3000}
        transitionTime={500}
      >
        {data.map((item: { _id: string; imageUrl: string; title: string }) => (
          <div key={item._id} className="w-full rounded-3xl h-32 md:h-[50vh] ">
            <Image
              src={item.imageUrl}
              alt={item.title}
              className="object-cover w-full h-full"
              width={640} // Add this
              height={320} // Add this
            />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default AdCarousel
