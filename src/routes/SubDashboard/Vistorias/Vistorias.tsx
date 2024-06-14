// import Search from '@/app/ui/search';

import { useEffect } from "react"

export default function Vistorias() {
  useEffect(() => {
    document.title = "Agro Current - Vistoria"
  }, [])
  return (
    <>
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-4xl`}>Vistorias</h1>
      </div>
      <div className="mt-4 flex items-center gap-2 ">
        <h1 className='font-bold text-2xl'>Requerimentos</h1>
      </div>
      <div className="flex items-center gap-2">
        <h2 className='text-lg'>Dispositivo capaz de fotografar e acesso a internet. </h2>
      </div>
      <div className="mt-4 flex items-center gap-2 ">
        <h1 className='font-bold text-2xl'>Etapas na fábrica</h1>
      </div>
      <div className="flex items-center gap-2">
        <h2 className='text-lg'>Verificar qual o tipo de maquinário que as fotografias serão tiradas. </h2>
      </div>
      <div>
        <br/>
      </div>
      <div className="flex items-center gap-2">
        <h2 className='text-lg'>Fotografar diversos pontos chaves do maquinário em seu momento de saída para entrega, documentando o estado do veículo antes de quaisquer avarias. </h2>
      </div>
      <div className="mt-4 flex items-center gap-2 ">
        <h1 className='font-bold text-2xl'>Na entrega do maquinário</h1>
      </div>
      <div className="flex items-center gap-2">
        <h2 className='text-lg'>Fotografar diversos pontos chaves do maquinário em seu momento de chegada, para documentar se ocorreu alguma avaria em seu trajeto. </h2>
      </div>
    </div>
    </>
  )
}