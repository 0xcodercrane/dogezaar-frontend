'use client'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import CarouselItem from './CarouselItem'

export default function CollectionCarousel() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 2,
    },
  }
  return (
    <Carousel responsive={responsive}>
      <CarouselItem name='Doge ordinal' imageURL='https://static.unisat.io/content/cf9f195b6d56e6db56dd7faea74c642c869e0f93239dbf9772ee2aa194ec0c33i0' url='/launchpad/dogeordinal'/>
      <CarouselItem name='Doge ordinal' imageURL='https://static.unisat.io/content/cf9f195b6d56e6db56dd7faea74c642c869e0f93239dbf9772ee2aa194ec0c33i0' url='/launchpad/dogeordinal'/>
      <CarouselItem name='Doge ordinal' imageURL='https://static.unisat.io/content/cf9f195b6d56e6db56dd7faea74c642c869e0f93239dbf9772ee2aa194ec0c33i0' url='/launchpad/dogeordinal'/>
      <CarouselItem name='Doge ordinal' imageURL='https://static.unisat.io/content/cf9f195b6d56e6db56dd7faea74c642c869e0f93239dbf9772ee2aa194ec0c33i0' url='/launchpad/dogeordinal'/>
      <CarouselItem name='Doge ordinal' imageURL='https://static.unisat.io/content/cf9f195b6d56e6db56dd7faea74c642c869e0f93239dbf9772ee2aa194ec0c33i0' url='/launchpad/dogeordinal'/>
      <CarouselItem name='Doge ordinal' imageURL='https://static.unisat.io/content/cf9f195b6d56e6db56dd7faea74c642c869e0f93239dbf9772ee2aa194ec0c33i0' url='/launchpad/dogeordinal'/>
      <CarouselItem name='Doge ordinal' imageURL='https://static.unisat.io/content/cf9f195b6d56e6db56dd7faea74c642c869e0f93239dbf9772ee2aa194ec0c33i0' url='/launchpad/dogeordinal'/>
      <CarouselItem name='Doge ordinal' imageURL='https://static.unisat.io/content/cf9f195b6d56e6db56dd7faea74c642c869e0f93239dbf9772ee2aa194ec0c33i0' url='/launchpad/dogeordinal'/>
      <CarouselItem name='Doge ordinal' imageURL='https://static.unisat.io/content/cf9f195b6d56e6db56dd7faea74c642c869e0f93239dbf9772ee2aa194ec0c33i0' url='/launchpad/dogeordinal'/>
      <CarouselItem name='Doge ordinal' imageURL='https://static.unisat.io/content/cf9f195b6d56e6db56dd7faea74c642c869e0f93239dbf9772ee2aa194ec0c33i0' url='/launchpad/dogeordinal'/>
      <CarouselItem name='Doge ordinal' imageURL='https://static.unisat.io/content/cf9f195b6d56e6db56dd7faea74c642c869e0f93239dbf9772ee2aa194ec0c33i0' url='/launchpad/dogeordinal'/>
    </Carousel>
  )
}
