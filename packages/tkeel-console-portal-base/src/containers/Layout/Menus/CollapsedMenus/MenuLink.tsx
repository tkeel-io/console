import { Link } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { useActive } from '@/tkeel-console-portal-base/containers/Layout/Menus/ExpandMenus/MenuLink';
import useMenuNotification from '@/tkeel-console-portal-base/hooks/useMenuNotification';

import MenuItem from './MenuItem';

type Props = {
  id: string;
  path: string;
  icon: string;
};

function MenuLink({ id, path, icon }: Props) {
  const match = useActive(path);
  const hasNotification = useMenuNotification(id);

  return (
    <Link marginTop="10px" as={ReactRouterLink} to={path}>
      <MenuItem
        icon={icon}
        active={!!match}
        hasNotification={hasNotification}
      />
    </Link>
  );
}

export default MenuLink;
