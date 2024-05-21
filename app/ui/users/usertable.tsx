import { User } from '@/app/lib/definitions';
import Search from '@/app/ui/search';
import Link from 'next/link';

export default function UserTable({users}:{users: User[]}) {
  return (
    <>
      <Search placeholder="Pesquisar usuários..." />
      <div className='flex flex-col my-1 px-1.5 py-1.5 bg-green-900'>
      {users?.map((user) => (
        <Link href={'/dashboard/'+(user.id.toString())} key={user.id}>
          <div className='flex text-black bg-yellow-500 px-2 py-2 my-0.5 hover:bg-lime-200'>
            <h1>{user.name} - {user.category}</h1>
          </div>        
        </Link>
      ))}
      </div>
    </>
  )
}