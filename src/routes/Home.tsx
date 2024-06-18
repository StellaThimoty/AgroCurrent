import { ArrowRightIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import HeaderHome from '@/components/layout/header/headerHome';
import bg from '/bg.webp'
import makina from '/7215j.webp'
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
// NÃO PASSAR O COMPONENTE BASE LAYOUT 
// FICA BUGADO E MUITO FEIO
// DEIXA DO JEITO QUE ESTÁ
// ALÉM DE QUE NÃO TEM CHILDREN NESTE COMPONENTE PARA PASSAR
export default function Home() {
  return (
    <div style={{backgroundImage: `linear-gradient(rgba(60, 179, 113, 0.5), rgba(60, 179, 113, 0.5)), url('${bg}')`, backgroundPosition: "center", height:"100%"}}>
      <HeaderHome pagename="Agro Current"/>
      <div className="flex p-6 items-center space-x-2">
        <div className="flex grow flex-row">
          <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-20 py-10">
            <h1 className='text-3xl antialised'><strong>Seja bem vindo(a).</strong><br/> Esta é uma plataforma de vistoria para máquinas, feita pela Fatec.</h1>
            <Link to="/Login" className="flex">
              <Button className="flex select-none text-black bg-yellow-500 px-2 py-2 hover:bg-lime-200">Log in <ArrowRightIcon className="w-6 mx-1" /></Button>
            </Link>
            { <Link to="/Signup" className="flex">
              <Button className="flex select-none text-black bg-yellow-500 px-2 py-2 hover:bg-lime-200">Cadastrar usuário <PlusCircleIcon className="w-6 mx-1" /></Button>
            </Link> }
          </div>
          <div className="flex items-center justify-center p-6">
            <img src={makina} width={1064} height={760} alt='Máquina Agricola 7215J'/>
          </div>
        </div>
      </div>
    </div>
  );
}
