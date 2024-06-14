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
  { name: 'SENSOR', href: "Sensor", icon: BoltIcon },
  { name: 'MÁQUINAS', href: "Maquinas", icon: WrenchScrewdriverIcon},
  { name: 'VISTORIAS', href: "Vistorias", icon: UserGroupIcon},
  { name: 'RELATÓRIOS', href: "Relatorios", icon: DocumentDuplicateIcon},
  { name: 'AJUDA', href: "Ajuda", icon: QuestionMarkCircleIcon}
];

export default function MenuItem() {
  return (
    <>
    {links.map((link) => {
      const LinkIcon = link.icon
      return (
        <NavLink to={link.href} key={link.name} end>
          {({isActive}) =>(
            <Button key={link.name} className={isActive ? "flex select-none bg-white text-black px-2 py-2 hover:bg-lime-200 bg-yellow-500" : "flex select-none bg-white text-black px-2 py-2 hover:bg-lime-200"}>
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
