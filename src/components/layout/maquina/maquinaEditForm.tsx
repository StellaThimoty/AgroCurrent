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
import { Button } from '@/components/ui/button';

function EditMachineButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="mt-7 flex text-black bg-yellow-500 px-2 py-2 my-2 hover:bg-lime-200" aria-disabled={pending}>
      Editar <PlusCircleIcon className="w-6 mx-1" />
    </button>
  );
}

export default function EditMachineForm() {
  const dispatch = useAppDispatch()
  // const navigate = useNavigate()
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  
  async function handleEdit() {
      try {
        await dispatch(storeMachine({name, type})).unwrap()
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
          Editar Máquinas
        </h1>
        <div className="w-full">
          <label className="my-3 block font-medium text-gray-900" htmlFor="name">
            Nome da Máquina
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
            <label className="my-3 block font-medium text-gray-900" htmlFor="category">
              Selecione o tipo da Máquina
            </label>
            <div className="relative">
              <select className="peer block w-80 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="type"
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required>
                <option value="">Escolha um tipo</option>
                <option value="Trator">Trator</option>
                <option value="Plantadeira">Plantadeira</option>
                <option value="Colheitadeira">Colheitadeira</option>
              </select>
              <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 mx-1 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <Button className="mt-7 flex text-black bg-yellow-500 px-2 py-2 my-2 hover:bg-lime-200" onClick={handleEdit}>
          Cadastrar <PlusCircleIcon className="w-6 mx-1" />
        </Button>
        </div>
    </div>
  );
}
