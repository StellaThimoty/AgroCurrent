// import Search from '@/app/ui/search';
import CreateMachineForm from "@/components/layout/maquina/maquinaCreateForm"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useAppDispatch } from "@/hooks/reduxHooks"
import { deleteMachine, getMachineAll } from "@/hooks/slices/machineSlice"
import { Machine } from "@/lib/types"
import { isAdm, isCst, isReg } from "@/lib/utils"
import { useUser } from "@/routes/Dashboard"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

export default function Maquinas() {
  const dispatch = useAppDispatch()
  const userInfo = useUser()
  const [machines, setMachines] = useState<Machine[]>([])
  const cargo = userInfo[0]
  // const nome = userInfo[1]
  const adm = isAdm(cargo)
  const reg = isReg(cargo)
  const cst = isCst(cargo)

  async function handleDelete(id:number) {
    await dispatch(deleteMachine(id)).unwrap()
  }

  useEffect(() => {
    document.title = "Agro Current - Máquinas"
    async function getMachines() {
      const response = await dispatch(getMachineAll()).unwrap()
      setMachines(response)
    }

    getMachines()
  }, [dispatch])
  return (
    <>
    <div className="w-full">
      <div className="flex w-full items-center">
        <h1 className={`text-2xl`}>Maquinas</h1>
      </div>
      <div className="flex items-left space-x-36">
        <div className="flex mt-5 justify-left items-center">
          { adm ? <CreateMachineForm/> : null }
          { reg ? <CreateMachineForm/> : null }
        </div>
        <Carousel className="flex items-center w-full max-w-md">
          <CarouselContent className="ml-1">
            {machines.map((machine)=>(
              <CarouselItem key={machine.id} className="basis-1/3 pl-2 md:pl4">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    {machine.name} - {machine.type}
                  </CardContent>
                  <CardFooter className="text-2xl items-center justify-center font-semibold">
                    {machine.id}
                  </CardFooter>
                  {!cst ? 
                    <div className="flex items-center justify-between">
                     <Link to={`${machine.id}`}>
                     <button className="flex text-black bg-yellow-500 px-2 py-2 hover:bg-lime-500 hover:font-bold">Editar&nbsp;</button>
                     </Link>
                     <button className="flex text-black bg-yellow-500 px-2 py-2 hover:bg-red-500 hover:font-bold" onClick={() => handleDelete(machine.id)}>Deletar&nbsp;</button>
                    </div> 
                    : null
                  }
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