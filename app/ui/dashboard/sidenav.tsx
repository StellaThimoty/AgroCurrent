import NavLinks from '@/app/ui/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';

export default function SideNav() {
  return (
    <div className="px-3 py-4 my-12">
      <div className="flex flex-row">
        <NavLinks />
        <form action={async () => {
          'use server';
          await signOut();
        }}>
          <button className="flex h-[48px] mx-2 w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-lime-200 hover:text-green-600">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sair</div>
          </button>
        </form>
      </div>
    </div>
  );
}
