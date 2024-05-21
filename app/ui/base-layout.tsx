import Link from 'next/link';
import Image from 'next/image';
 
export default function BaseLayout({ children, pagename }: { children: React.ReactNode, pagename: string | null | undefined }) {
  return (
    <>
      <div className="bg-green-700 text-white p-2 flex items-center">
        <Link href='/'>
          <Image src="/AGROENOIS2.jpg" alt="logo" className="mr-2" width={65} height={65}/>      
        </Link>
          <div className="flex flex-col">
            <h1 className="font-bold text-xl">Formulário de vistoria - {pagename}</h1>
          </div>
      </div>
      <div className="flex p-6 items-center space-x-2">{children}</div>
    </>
  );
}