import { Skeleton } from '@/components/ui/skeleton'
import { Carousel, CarouselContent, CarouselItem } from './carousel'

export default function LoadingCard() {
  return (
    <Skeleton className="flex items-center w-full max-w-md">
        <Carousel>
          <CarouselContent className="ml-1">
              <CarouselItem className="basis-1/3 pl-2 md:pl4">
              
              </CarouselItem>
              <CarouselItem className="basis-1/3 pl-2 md:pl4">
                
              </CarouselItem>
              <CarouselItem className="basis-1/3 pl-2 md:pl4">
                
              </CarouselItem>
          </CarouselContent>
        </Carousel>
    </Skeleton>
  )
}