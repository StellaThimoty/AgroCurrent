import {AtSymbolIcon,KeyIcon,TagIcon,PlusCircleIcon,UserIcon, ArrowLeftCircleIcon} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Button } from '../../ui/button';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { register } from '@/hooks/slices/authSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

export default function SignupForm() {
  const dispatch = useAppDispatch()
  // const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [category, setCategory] = useState("")

  async function handleSignup()
    {
    
      if(password == passwordConfirm) {
        try {
          await dispatch(register({name, email, password, category})).unwrap()
          // await dispatch(login({email, password})).unwrap()
          // navigate("/dashboard")
        } catch(e) {
          console.error(e)
        }
    }   else {
          toast.error("Senhas não são iguais!")
    }}

  return (
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">
          Faça o cadastro para continuar.
        </h1>
        <div className="w-full">
          <label className="my-3 block font-medium text-gray-900" htmlFor="email">
            Nome
          </label>
          <div className="relative">
            <input
              className="peer block w-80 border border-black py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="name"
              type="text"
              name="name"
              placeholder="Coloque o nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
            <label className="my-3 block font-medium text-gray-900" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-80 border border-black py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Coloque o endereço de email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          <div className="mb-7">
            <label className="my-3 block font-medium text-gray-900" htmlFor="password">
              Senha
            </label>
            <div className="relative">
              <input
                className="peer block w-80 border border-black py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Coloque a senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 mx-1 peer-focus:text-gray-900" />
          </div>
          <div className="mb-7">
            <label className="my-3 block font-medium text-gray-900" htmlFor="password">
              Confirme a senha
            </label>
            <div className="relative">
              <input
                className="peer block w-80 border border-black py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="passwordConfirm"
                type="password"
                name="passwordConfirm"
                placeholder="Confirme a senha"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 mx-1 peer-focus:text-gray-900" />
          </div>
            <label className="my-3 block font-medium text-gray-900" htmlFor="category">
              Selecione a categoria do usuário
            </label>
            <div className="relative">
              <select className="peer block w-80 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="category"
                name="category"

                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required>
                <option value="">Escolha uma categoria</option>
                <option value="Consultor">Consultor</option>
                <option value="Registrador">Registrador</option>
                <option value="Administrador">Administrador</option>
              </select>
              <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 mx-1 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className='flex'>
          <Link to="/Dashboard/Home">
            <Button className="mt-7 flex text-black bg-yellow-500 px-2 py-2 my-2 mr-3 hover:bg-lime-200">
              Voltar <ArrowLeftCircleIcon className="w-6 mx-1" />
            </Button>
          </Link>
          <Button className="mt-7 flex text-black bg-yellow-500 px-2 py-2 my-2 ml-3 hover:bg-lime-200" onClick={handleSignup}>
            Cadastrar <PlusCircleIcon className="w-6 mx-1" />
          </Button>
        </div>
      </div>
      </div>
  )
  }