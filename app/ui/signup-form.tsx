'use client'

import {
  AtSymbolIcon,
  KeyIcon,
  TagIcon,
  PlusCircleIcon
} from '@heroicons/react/24/outline';
import { Button } from './button';
import { useFormState, useFormStatus } from 'react-dom';
import { createUser } from '@/app/lib/actions';

export default function SignupForm() {
  const initialState = { message: null, errors: {} }
  const [state, dispatch] = useFormState(createUser, initialState);

  return (
    <form action={dispatch}>
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">
          Cadastre-se para continuar.
        </h1>
        <div className="w-full">
          <div>
          <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="name"
            >
              Nome
            </label>
            <div className="relative">
              <input
                className="peer block w-80 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="name"
                type="text"
                name="name"
                placeholder="Coloque seu nome"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-80 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Coloque seu endereço de email"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Senha
            </label>
            <div className="relative">
              <input
                className="peer block w-80 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Coloque sua senha"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="passwordConfirm"
            >
              Confirme sua Senha
            </label>
            <div className="relative">
              <input
                className="peer block w-80 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="passwordConfirm"
                type="password"
                name="passwordConfirm"
                placeholder="Confirme sua senha"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="category"
            >
              Selecione a categoria do usuário
            </label>
            <div className="relative">
              <select className="peer block w-80 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="category"
                name="category"
                placeholder="Categoria"
                required
              >
                <option value="Administrador">Administrador</option>
                <option value="Consultor">Consultor</option>
                <option value="Registrador">Registrador</option>
              </select>
              <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <SignupButton />
        <div className="flex h-8 items-end space-x-1" aria-live='polite' aria-atomic='true'>
        <div id='status-error' aria-live='polite' aria-atomic="true">
                {state.errors?.password &&
                  state.errors.password.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}> {error} </p>
                  ))}
            </div>
        </div>
      </div>
    </form>
  );
}

function SignupButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="mt-4" aria-disabled={pending}>
      Cadastrar <PlusCircleIcon className="ml-auto h-5 w-7 text-gray-50" />
    </Button>
  );
}
