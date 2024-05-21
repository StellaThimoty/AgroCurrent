import SideNav from '@/app/ui/dashboard/sidenav';
import Link from 'next/link';
import Image from 'next/image';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
  <body>
    <div className="bg-green-700 text-white p-2 flex items-center">
      <Link href='/'>
        <Image src="/AGROENOIS2.jpg" alt="logo" className="mr-2" width={65} height={65}/>      
      </Link>
        <div className="flex flex-col">
          <h1 className="font-bold text-xl">Formulário de vistoria</h1>
        </div>
      </div>
      <div className="bg-green-800 text-white flex justify-between items-center p-2">
        <div className="flex space-x-2">
          <SideNav/>
        </div>
      </div>
      <div className="flex p-6 items-center space-x-2">{children}</div>
  </body>
  );
}