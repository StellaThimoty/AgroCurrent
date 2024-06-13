import {
  UserGroupIcon,
  WrenchScrewdriverIcon,
  DocumentDuplicateIcon,
  QuestionMarkCircleIcon,
  BoltIcon
} from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const links = [
  { name: 'USUÁRIO', href: "", icon: UserGroupIcon },
  { name: 'EDDY', href: "eddy", icon: BoltIcon },
  { name: 'MÁQUINAS', href: "maquinas", icon: WrenchScrewdriverIcon},
  { name: 'VISTORIAS', href: "vistorias", icon: UserGroupIcon},
  { name: 'RELATÓRIOS', href: "relatorios", icon: DocumentDuplicateIcon},
  { name: 'AJUDA', href: "ajuda", icon: QuestionMarkCircleIcon}
];

export default function MenuItem() {
  return (
    <>
    {links.map((link) => {
      const LinkIcon = link.icon
      return (
        <NavLink to={link.href} key={link.name} end>
          {({isActive}) =>(
            <Button key={link.name} className={isActive ? "flex bg-white text-black px-2 py-2 hover:bg-lime-200 bg-yellow-500" : "flex bg-white text-black px-2 py-2 hover:bg-lime-200"}>
              <LinkIcon className="w-6 mx-1"/>
              {link.name}
            </Button>
          )}

        </NavLink>
      )
    })}
    </>
  );
}
