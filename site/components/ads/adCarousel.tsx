import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useAdCarousel } from './useAdCarousel'
import Image from 'next/image'

const AdCarousel = () => {
  const { data, isLoading, isError } = useAdCarousel()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {isError.message}</div>
  }

  return (
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={true}
      showIndicators={true}
      interval={3000}
      transitionTime={500}
    >
      {data.map((item: { _id: string; imageUrl: string; title: string }) => (
        <div key={item._id} className="w-full h-64 md:h-96 ">
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
  )
}

export default AdCarousel
