'use client'

import {
  TagIcon,
  PlusCircleIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { storeMachine } from '@/hooks/slices/machineSlice';
import { toast } from 'react-toastify';
import { storeReport } from '@/hooks/slices/reportSlice';
import { storeDeparture } from '@/hooks/slices/departureSlice';

export default function CreateReportForm() {
  const dispatch = useAppDispatch()
  // const navigate = useNavigate()
  const [address, setaddress] = useState("")
  const [client, setClient] = useState("")
  const [date_departure, setDateDeparture] = useState("")
  const [machineId, setMachineId] = useState(0)
  
  async function handleCreate() {
      try {
        toast.loading("Carregando...")
        await dispatch(storeDeparture({address, client, date_departure, machineId}))
        .then(() => {
          toast.dismiss()
          toast.success("Formulário criada!")
        },
        () =>{
          toast.dismiss()
          toast.error("Erro ao criar formulário!")
        })
        // await dispatch(login({email, password})).unwrap()
        // navigate("/dashboard")
      } catch(e) {
        console.error(e)
      }
  }
  
  return (
    <div>
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">
          Cadastro de Relatórios
        </h1>
          <div className="w-full">
          <label className="my-3 block font-medium text-gray-900" htmlFor="name">
            Endereço
          </label>
          <div className="relative">
            <input
              className="peer block w-80 border border-black py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="name"
              type="text"
              name="name"
              placeholder="Coloque o endereço"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
              required
            />
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <div className="w-full">
          <label className="my-3 block font-medium text-gray-900" htmlFor="name">
            Cliente
          </label>
          <div className="relative">
            <input
              className="peer block w-80 border border-black py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="name"
              type="text"
              name="name"
              placeholder="Coloque o nome do cliente"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              required
            />
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <div className="w-full">
          <label className="my-3 block font-medium text-gray-900" htmlFor="name">
            Hora de saída
          </label>
          <div className="relative">
            <input
              className="peer block w-80 border border-black py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="name"
              type="datetime-local"
              name="name"
              value={date_departure}
              onChange={(e)=>setDateDeparture(e.target.value)}
              placeholder={date_departure.toString()}
              required
            />
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <div className="w-full">
          <label className="my-3 block font-medium text-gray-900" htmlFor="name">
            Id Máquina
          </label>
          <div className="relative">
            <input
              className="peer block w-80 border border-black py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="name"
              type="number"
              name="name"
              placeholder="Coloque o Id da Máquina"
              value={machineId}
              onChange={(e) => setMachineId(Number(e.target.value))}
              required
            />
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          </div>
        </div>
        <Button className="mt-7 flex text-black bg-yellow-500 px-2 py-2 my-2 hover:bg-lime-200" onClick={handleCreate}>
          Cadastrar <PlusCircleIcon className="w-6 mx-1" />
        </Button>
    </div>
</div>
</div>
</div>
  );
}
