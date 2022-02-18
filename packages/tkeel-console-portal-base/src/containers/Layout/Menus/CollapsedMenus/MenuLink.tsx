import { Link as ReactRouterLink } from 'react-router-dom';
import { Link } from '@chakra-ui/react';

import { useActive } from '@/tkeel-console-portal-base/containers/Layout/Menus/ExpandMenus/MenuLink';

import MenuItem from './MenuItem';

type Props = {
  path: string;
  icon: string;
};

function MenuLink({ path, icon }: Props) {
  const match = useActive(path);

  return (
    <Link marginTop="10px" as={ReactRouterLink} to={path}>
      <MenuItem icon={icon} active={!!match} isMenuLink />
    </Link>
  );
}

export default MenuLink;
