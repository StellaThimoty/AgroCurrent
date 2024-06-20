// import Search from '@/app/ui/search';

import CreateEddyCurrentForm from "@/components/layout/sensor/sensorCreateForm"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { useAppDispatch } from "@/hooks/reduxHooks"
import { deleteSensor, getSensorById } from "@/hooks/slices/sensorSlice"
import { Sensor } from "@/lib/types"
import { useState, useEffect } from "react"

export default function Sensores() {
  const dispatch = useAppDispatch()
  // const userInfo = useUser()
  const [sensors, setSensors] = useState<Sensor[]>([])

  async function handleDelete(id:number) {
    const newSensors = sensors.filter((sensor) => {return sensor.id !== id})
    await dispatch(deleteSensor(id)).unwrap()
    setSensors(newSensors)
  }

  useEffect(() => {
    document.title = "Agro Current - Sensor"
    // async function getSensors() {
      // const response = await dispatch(getSensorById(1)).unwrap()
      // setSensors(response)
    // }
    // getSensors()
  }, [dispatch])

  return (
    <>
    <div className="w-full">
      <div className="flex w-full items-center">
        <h1 className={`text-2xl`}>Sensor</h1>
      </div>
      <div className="flex items-left space-x-36">
        <div className="flex mt-5 justify-left items-center">
        { <CreateEddyCurrentForm /> }
        </div>
        <Carousel className="flex items-center w-full max-w-md">
            <CarouselContent className="ml-1">
              {sensors.map((sensor)=>(
                <CarouselItem key={sensor.id} className="pl-2 md:pl4">
                  <Card className="flex flex-col h-[350px]">
                    <CardHeader>
                      <CardTitle>{sensor.part_machine}</CardTitle>
                      <CardDescription>{sensor.time.split('T')[0]}, - {sensor.time.split('T')[1].slice(0,8)}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      {sensor.localization}
                    </CardContent>
                      <div className="flex items-center justify-center pb-4">
                        <button className="flex text-black bg-yellow-500 ml-8 px-8 py-4 hover:bg-red-500 hover:font-bold" onClick={() => handleDelete(sensor.id)}>Deletar&nbsp;</button>
                      </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
      </div>
    </div>
    </>
  )
}