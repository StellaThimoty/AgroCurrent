// import Search from '@/app/ui/search';

import CreateReportForm from "@/components/layout/relatorio/relatorioCreateForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { useAppDispatch } from "@/hooks/reduxHooks"
import { deleteDeparture, getDepartureAll } from "@/hooks/slices/departureSlice"
import { getMachineAll } from "@/hooks/slices/machineSlice"
import { Departure, Machine } from "@/lib/types"
// import { isAdm, isReg, isCst } from "@/lib/utils"
// import { useUser } from "@/routes/Dashboard"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Relatorios() {
  const dispatch = useAppDispatch()
  // const userInfo = useUser()
  const [departures, setDepartures] = useState<Departure[]>([])
  const [machines, setMachines] = useState<Machine[]>([])
  // const cargo = userInfo[0]
  // const nome = userInfo[1]
  
  // const adm = isAdm(cargo)
  // const reg = isReg(cargo)
  // const cst = isCst(cargo)
  async function handleDelete(id:number) {
    const newDepartures = departures.filter((departure) => {return departure.id !== id})
    await dispatch(deleteDeparture(id)).unwrap()
    setDepartures(newDepartures)
  }

  useEffect(() => {
    document.title = "Agro Current - Relatórios"
    async function getDepartures() {
      const response = await dispatch(getDepartureAll()).unwrap()
      setDepartures(response)
    }
    async function getMachines() {
      const response = await dispatch(getMachineAll()).unwrap()
      setMachines(response)
    }

    getMachines()
    getDepartures()
  }, [])
  return (
    <>
    <div className="w-full">
      <div className="flex w-full items-center">
        <h1 className={`text-2xl`}>Relatorios</h1>
      </div>
      <div className="flex items-left space-x-36">
        <div className="flex mt-5 justify-left items-center">
        { <CreateReportForm machines={machines}/> }
        </div>
        <Carousel className="flex items-center w-full max-w-md">
            <CarouselContent className="ml-1">
              {departures.map((departure)=>(
                <CarouselItem key={departure.id} className="pl-2 md:pl4">
                  <Card className="flex flex-col h-[350px]">
                    <CardHeader>
                      <CardTitle>{departure.client}</CardTitle>
                      <CardDescription>{departure.date_departure.split('T')[0]}, - {departure.date_departure.split('T')[1].slice(0,8)}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      {departure.address}
                    </CardContent>
                      <div className="flex items-center justify-center pb-4">
                       <Link to={`${departure.id}`}>
                        <button className="flex text-black bg-yellow-500 mr-8 px-8 py-4 hover:bg-lime-500 hover:font-bold">Editar&nbsp;</button>
                       </Link>
                        <button className="flex text-black bg-yellow-500 ml-8 px-8 py-4 hover:bg-red-500 hover:font-bold" onClick={() => handleDelete(departure.id)}>Deletar&nbsp;</button>
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