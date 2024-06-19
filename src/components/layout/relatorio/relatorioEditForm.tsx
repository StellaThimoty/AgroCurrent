'use client'

import {
  PlusCircleIcon,
  UserIcon,
  ArrowLeftCircleIcon
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { getDepartureById, updateDeparture } from '@/hooks/slices/departureSlice';
import { Link, useParams } from 'react-router-dom';
import { Departure } from '@/lib/types';

export default function EditReportForm() {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const departureId = Number(id)

  const [departure, setDeparture] = useState<Departure>()
  const [address, setAddress] = useState<string | undefined>("")
  const [client, setClient] = useState<string | undefined>("")
  const [date_departure, setDateDeparture] = useState<string | undefined>("")
  
  useEffect(() => {
    async function getDeparture() {
      const response = await dispatch(getDepartureById(departureId)).unwrap()
      setDeparture(response[0])
      setAddress(departure?.address)
      setClient(departure?.client)
      setDateDeparture(departure?.date_departure)
    }

    getDeparture()
  }, [departureId, departure?.address, departure?.client, departure?.date_departure, dispatch])

  async function handleEdit() {
    try {
      const data = {
        id: departureId,
        address: address,
        client: client,
        date_departure: date_departure,
      }
      await dispatch(updateDeparture(data)).unwrap()
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
          Editar Relatórios
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
              onChange={(e) => setAddress(e.target.value)}
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
              value={date_departure?.slice(0, 16)}
              onChange={(e)=>setDateDeparture(e.target.value)}
              placeholder={date_departure?.slice(0, 16)}
              required
            />
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
        <div className='flex'>
            <Link to="/Dashboard/Relatorios">
              <Button className="mt-7 mb-2 mr-2 flex text-black bg-yellow-500 px-2 py-2 hover:bg-lime-200">
                Voltar <ArrowLeftCircleIcon className="w-6 mx-1" />
              </Button>
            </Link>
            <Button className="mt-7 mb-2 ml-2 flex text-black bg-yellow-500 px-2 py-2 hover:bg-lime-200" onClick={handleEdit}>
              Editar <PlusCircleIcon className="w-6 mx-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
</div>
  );
}
