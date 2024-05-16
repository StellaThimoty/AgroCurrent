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
  { name: 'Usuário', href: '/dashboard', icon: UserGroupIcon },
  { name: 'Maquinas', href: '/dashboard/maquinas', icon: WrenchScrewdriverIcon},
  { name: 'Vistorias', href: '/dashboard/vistorias', icon: UserGroupIcon},
  { name: 'Relatórios', href: '/dashboard/relatorios', icon: DocumentDuplicateIcon},
  { name: 'Ajuda', href: '/dashboard/ajuda', icon: QuestionMarkCircleIcon}
];

export default function NavLinks() {
const pathname = usePathname()

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx("flex h-[48px] mx-3 w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-lime-200 hover:text-green-600",
            { 'bg-lime-200 text-green-600': pathname === link.href, },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
