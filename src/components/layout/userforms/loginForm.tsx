import {AtSymbolIcon,KeyIcon,ArrowRightIcon} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '../../ui/button';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { login } from '@/hooks/slices/authSlice';

export default function LoginForm() {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {

      try {
        await dispatch(login({email, password})).unwrap()
        navigate("/Dashboard")
      } catch(e) {
        console.error(e)
      }
    }

  return (
      <div className="flex grow flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-20 py-10">
          <h1 className='text-3xl antialised'><strong>Faça login para continuar.</strong></h1>
          <div className="w-full">
            <label className="mb-3 block font-medium text-gray-900" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-80 border border-black py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Coloque seu endereço de email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mb-7">
            <label className="mb-3 block font-medium text-gray-900" htmlFor="password">
              Senha
            </label>
            <div className="relative">
              <input
                className="peer block w-80 border border-black py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Coloque sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 mx-1 peer-focus:text-gray-900" />
          </div>
          <Button className="mt-7 flex text-black bg-yellow-500 px-2 py-2 my-2 hover:bg-lime-200" onClick={handleLogin}>
            Logar <ArrowRightIcon className="w-6 mx-1" />
          </Button>
          </div>
        </div>
      </div>
  );
}
