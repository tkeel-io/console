import React from 'react';
import {
  Link as ReactRouterLink,
  useMatch,
  useResolvedPath,
} from 'react-router-dom';
import { Link } from '@chakra-ui/react';

import MenuItem from './MenuItem';

type Props = {
  path: string;
  icon: string;
};

function MenuLink({ path, icon }: Props) {
  const resolved = useResolvedPath(path);
  const match = useMatch({ path: resolved.pathname, end: false });

  return (
    <Link marginTop="10px" as={ReactRouterLink} to={path}>
      <MenuItem icon={icon} active={!!match} />
    </Link>
  );
}

export default MenuLink;
