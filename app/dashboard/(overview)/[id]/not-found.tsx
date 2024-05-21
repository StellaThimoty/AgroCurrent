import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
 
export default function NotFound() {
  return (
    <main>
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-2xl font-semibold">404 Não Encontrado</h2>
      <p>Usuário não encontrado.</p>
      <Link href="/dashboard">
        <button className='flex text-black bg-yellow-500 px-2 py-2 my-2 hover:bg-lime-200'>Voltar</button>
      </Link>
    </main>
  );
}