import { ArrowRightIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image'
// NÃO PASSAR O COMPONENTE BASE LAYOUT 
// FICA BUGADO E MUITO FEIO
// DEIXA DO JEITO QUE ESTÁ
// ALÉM DE QUE NÃO TEM CHILDREN NESTE COMPONENTE PARA PASSAR
export default function Page() {
  return (
    <body style={{backgroundImage: `linear-gradient(rgba(60, 179, 113, 0.5), rgba(60, 179, 113, 0.5)), url('/bg.webp')`, backgroundPosition: "center"}}>
      <div className="bg-green-700 text-white p-2 flex items-center">
        <Link href='/'>
          <Image src="/AGROENOIS2.jpg" alt="logo" className="mr-2" width={65} height={65}/>      
        </Link>
          <div className="flex flex-col">
            <h1 className="font-bold text-xl">Formulário de vistoria - Agro Current</h1>
          </div>
      </div>
      <div className="flex p-6 items-center space-x-2">
        <div className="flex grow flex-row">
          <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-20 py-10">
            <h1 className='text-3xl antialised'><strong>Seja bem vindo(a).</strong><br/> Esta é uma plataforma de vistoria para máquinas, feita pela Fatec.</h1>
            <Link href="/login" className="flex">
              <button className="flex text-black bg-yellow-500 px-2 py-2 hover:bg-lime-200">Log in <ArrowRightIcon className="w-6 mx-1" /></button>
            </Link>
            <Link href="/signup" className="flex">
              <button className="flex text-black bg-yellow-500 px-2 py-2 hover:bg-lime-200">Cadastrar usuário <PlusCircleIcon className="w-6 mx-1" /></button>
            </Link>
          </div>
          <div className="flex items-center justify-center p-6">
          <Image src="/7215j.webp" width={1064} height={760} alt='Máquina Agricola 7215J'/>
          </div>
        </div>
      </div>
    </body>
  );
}
