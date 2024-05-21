import { fetchUserById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editar Usuário'
}
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id
  const [user] = await Promise.all([fetchUserById(id)]);
  if (!user){
    notFound();
  }

  return (
    <> 
      <div key={user.id} className='flex flex-row'>
        <div className='flex flex-col'>
        <h1 className='my-0.5 text-black bg-yellow-500 px-2 py-2 hover:bg-lime-200'>{user.name}</h1>
        <h2 className='my-0.5 text-black bg-yellow-500 px-2 py-2 hover:bg-lime-200'>{user.email}</h2>
        <h2 className='my-0.5 text-black bg-yellow-500 px-2 py-2 hover:bg-lime-200'>{user.category}</h2>
        </div>
      </div>
    </>
  );
}