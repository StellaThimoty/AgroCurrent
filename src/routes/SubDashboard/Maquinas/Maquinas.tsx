// import Search from '@/app/ui/search';
// import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import CreateMachineForm from "@/components/layout/maquina/maquinaCreateForm"
// import { useUser } from "@/routes/Dashboard"
import { useEffect } from "react"

export default function Maquinas() {
  // const userInfo = useUser()
  // const cargo = userInfo[0]
  // const nome = userInfo[1]

  useEffect(() => {
    document.title = "Agro Current - Máquinas"
  }, [])
  return (
    <>
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Maquinas</h1>
      </div>
      <div className="mt-4 flex items-center gap-2 md:mt-8">
        <CreateMachineForm/>
      </div>
      <div className="mt-5 flex w-full justify-left">
      {/* <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4">
          <CarouselItem className="pl-2 md:pl-4">...</CarouselItem>
          <CarouselItem className="pl-2 md:pl-4">...</CarouselItem>
          <CarouselItem className="pl-2 md:pl-4">...</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel> */}
      </div>
    </div>
    </>
  )
}