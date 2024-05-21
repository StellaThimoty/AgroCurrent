import NavLinks from './nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';

export default function SideNav() {
  return (
    <>
    <NavLinks/>
    <form action={async () => {
      'use server';
      await signOut({ redirectTo: "/", redirect: true});
    }}>
    <button className="flex bg-white text-black px-2 py-2 hover:bg-lime-200"><PowerIcon className="w-6 mx-1" />SAIR</button>
    </form>    
    </>
  );
}
