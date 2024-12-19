"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarouselItem from "./CarouselItem";
import { TCollection } from "@/types/collections.type";

export default function CollectionCarousel({
  collections,
}: {
  collections: TCollection[];
}) {
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
  };
  return (
    <Carousel responsive={responsive} sliderClass="flex gap-2 sm:gap-4">
      {collections.length > 0 &&
        collections?.map((collection, index) => (
          <CarouselItem
            name={collection.name}
            imageURL={collection.thumbnail}
            url={`/launchpad/${collection.id}`}
            key={index}
          />
        ))}
    </Carousel>
  );
}
