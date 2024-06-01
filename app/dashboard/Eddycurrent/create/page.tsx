'use client'

import {
  AtSymbolIcon,
  KeyIcon,
  TagIcon,
  PlusCircleIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { useFormState, useFormStatus } from 'react-dom';
import { createUser } from '@/app/lib/actions';

function CreateEddyCurrentButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="mt-7 flex text-black bg-yellow-500 px-2 py-2 my-2 hover:bg-lime-200" aria-disabled={pending}>
      Inserir Incongruência <PlusCircleIcon className="w-6 mx-1" />
    </button>
  );
}

export default function CreateEddyCurrentForm() {
  const initialState = { message: null, errors: {} }
  const [state, dispatch] = useFormState(createUser, initialState);

  return (
    <form action={dispatch}>
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">
          Incongruência
        </h1>
        <div className="w-full">
          <label className="my-3 block font-medium text-gray-900" htmlFor="name">
            Local da Incongruência
          </label>
          <div className="relative">
            <input
              className="peer block w-80 border border-black py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="local"
              type="text"
              name="local"
              placeholder="Coloque o nome"
              required
            />
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <div className="w-full">
          <label className="my-3 block font-medium text-gray-900" htmlFor="name">
            Hora da Incongruência
          </label>
          <div className="relative">
            <input
              className="peer block w-80 border border-black py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="time"
              type="text"
              name="time"
              placeholder="Coloque o nome"
              required
            />
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
            <label className="my-3 block font-medium text-gray-900" htmlFor="category">
              Selecione o Nível de gravidade da Incongruência
            </label>
            <div className="relative">
              <select className="peer block w-80 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="level"
                name="type"
                placeholder="Nivel"
                required>
                <option value="Baixo">Baixo</option>
                <option value="Medio">Medio</option>
                <option value="Alto">Alto</option>
              </select>
              <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 mx-1 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <CreateEddyCurrentButton />
        <div className="flex h-8 items-end space-x-1" aria-live='polite' aria-atomic='true'>
          <div id='status-error' aria-live='polite' aria-atomic="true">
            {state.message &&
                  <p className="mt-2 text-sm text-red-500" key={state.message}> {state.message} </p>
              }
              {state.errors?.category &&
                state.errors.category.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}> {error} </p>
              ))}
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
