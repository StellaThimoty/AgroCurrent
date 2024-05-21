'use client';

import {
  UserGroupIcon,
  WrenchScrewdriverIcon,
  DocumentDuplicateIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'USUÁRIO', href: '/dashboard', icon: UserGroupIcon },
  { name: 'MÁQUINAS', href: '/dashboard/maquinas', icon: WrenchScrewdriverIcon},
  { name: 'VISTORIAS', href: '/dashboard/vistorias', icon: UserGroupIcon},
  { name: 'RELATÓRIOS', href: '/dashboard/relatorios', icon: DocumentDuplicateIcon},
  { name: 'AJUDA', href: '/dashboard/ajuda', icon: QuestionMarkCircleIcon}
];

export default function NavLinks() {
const pathname = usePathname()

  return (
    <>
    {links.map((link) => {
      const LinkIcon = link.icon
      return (
        <Link key={link.name} href={link.href}>
          <button className={clsx("flex bg-white text-black px-2 py-2 hover:bg-lime-200", {"bg-yellow-500" : pathname === link.href})}>
            <LinkIcon className="w-6 mx-1"/>
            {link.name}
          </button>
        </Link>
      )
    })}
    </>
  );
}
