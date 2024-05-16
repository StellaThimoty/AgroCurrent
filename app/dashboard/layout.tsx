import SideNav from '@/app/ui/dashboard/sidenav';
import Link from 'next/link';
import JohnLogo from '../ui/john-logo';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex items-center justify-center">
      <div className="relative mx-auto flex w-full flex-col p-4">
        <div className="flex w-full items-end rounded-lg bg-green-600 p-3">      
        <Link
        className="mb-2 flex items-end justify-start rounded-md bg-green-600 p-4 md:h-40"
        href="/"
        >
        <div className="text-white">
            <JohnLogo />
        </div>
        </Link>
        <SideNav/>
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
      </div>
    </main>
  );
}