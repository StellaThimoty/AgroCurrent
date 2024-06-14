// import Search from '@/app/ui/search';
import { useEffect } from "react"

export default function Ajuda() {
  useEffect(() => {
    document.title = "Agro Current - Ajuda"
  }, [])

  return (
    <>
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-4xl`}>Ajuda</h1>
      </div>
      <div className="mt-4 flex items-center gap-2 ">
        <h1 className='font-bold text-2xl'>O que é o sistema?</h1>
      </div>
      <div className="flex items-center gap-2">
        <h2 className='text-lg'>A Agro Current é um aplicativo de vistoria para máquinas agrícolas, que conta com diversas funcionalidades para auxílio de funcionários.</h2>
      </div>
      <div className="mt-4 flex items-center gap-2 ">
        <h1 className='font-bold text-2xl'>Aba de Usuário</h1>
      </div>
      <div className="flex items-center gap-2">
        <h2 className='text-lg'>Local o qual é exibido as informações do usuário logado no momento, para administradores esta aba também pode ser usada para cadastrar novos usuários.</h2>
      </div>
      <div className="mt-4 flex items-center gap-2 ">
        <h1 className='font-bold text-2xl'>Aba de Sensor</h1>
      </div>
      <div className="flex items-center gap-2">
        <h2 className='text-lg'>Registrar novos relátorios referentes aos sensores, e permite visualiza-lôs. </h2>
      </div>
      <div className="mt-4 flex items-center gap-2 ">
        <h1 className='font-bold text-2xl'>Aba de Máquinas</h1>
      </div>
      <div className="flex items-center gap-2">
        <h2 className='text-lg'>Cadastro de novas máquinas, o usuário pode escolher um dos tipos de máquinas e dar um nome a cada novo item.</h2>
      </div>
      <div className="mt-4 flex items-center gap-2 ">
        <h1 className='font-bold text-2xl'>Aba de Vistorias</h1>
      </div>
      <div className="flex items-center gap-2">
        <h2 className='text-lg'>Auxílio de como o processo de vistoria deve ser executado </h2>
      </div>
      <div className="mt-4 flex items-center gap-2 ">
        <h1 className='font-bold text-2xl'>Relátorios</h1>
      </div>
      <div className="flex items-center gap-2">
        <h2 className='text-lg'>Registro da checkagem feita antes e depois da entrega de um maquinário para verificar possiveis avarias.</h2>
      </div>
      <div className="mt-4 flex items-center gap-2 ">
        <h1 className='font-bold text-2xl'>Aba de sair</h1>
      </div>
      <div className="flex items-center gap-2">
        <h2 className='text-lg'>Usada para sair da conta, ao fazer login, sua conta estará disponível para uso por uma hora até ser necessario entrar nela novamente.</h2>
      </div>
      <div className="mt-4 flex items-center gap-2 ">
        <h1 className='font-bold text-2xl'>Quem fez?</h1>
      </div>
      <div className="flex items-center gap-2">
        <h2 className='text-lg'>
          <ul>
            <li>Abner</li>
            <li>Guilherme Moreno</li>
            <li>Henrique</li>
            <li>Murilo</li>
            <li>Sara</li>
          </ul>
        </h2>
      </div>
    </div>
    </>
  )
}