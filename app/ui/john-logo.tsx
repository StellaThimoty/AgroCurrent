import { GlobeAltIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';

export default function JohnLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      {/* <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" /> */}
      <Image
        src="/john-deere-logo.png"
        width={216}
        height={216}
        className=''
        alt='John Deere logo'
      /> 
      <p className="text-[44px]">John Deere</p>
    </div>
  );
}
