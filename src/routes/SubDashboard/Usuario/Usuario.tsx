// import Search from '@/app/ui/search';

import { Button } from "@/components/ui/button"
import { isAdm } from "@/lib/utils"
import { useUser } from "@/routes/Dashboard"
import { PlusCircleIcon } from "@heroicons/react/24/outline"
import { useEffect } from "react"
import { Link } from "react-router-dom"

export default function Usuario() {
  const userInfo = useUser()
  const cargo = userInfo[0]
  const nome = userInfo[1]
  const adm = isAdm(cargo)
  useEffect(() => {
    document.title = "Agro Current - Usuário"
  }, [])
  return (
    <>
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Usuário</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <h1>Seja bem vindo(a) ao Agro Current, {nome}</h1>
      </div>
      <div className="mt-5 flex w-full justify-left">
        {adm ? 
        <Link to="/Signup" className="flex">
              <Button className="flex select-none text-black bg-yellow-500 px-2 py-2 hover:bg-lime-200">Cadastrar usuário <PlusCircleIcon className="w-6 mx-1" /></Button>
        </Link> : null}

      </div>
    </div>
    </>
  )
}