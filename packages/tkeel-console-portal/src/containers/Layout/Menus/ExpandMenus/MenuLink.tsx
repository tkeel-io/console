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
  name: string;
  icon: string;
};

type MenuLinkReturnType = {
  as: typeof ReactRouterLink;
  to: string;
  active: boolean;
};

function useActive(to: string): boolean {
  const resolved = useResolvedPath(to);
  const active = useMatch({ path: resolved.pathname, end: false });
  return !!active;
}

export function useMenuLinkProps(to: string): MenuLinkReturnType {
  const active = useActive(to);
  return {
    as: ReactRouterLink,
    to,
    active,
  };
}

function MenuLink({ path, name, icon }: Props) {
  const { as, to, active } = useMenuLinkProps(path);
  return (
    <Link
      display="flex"
      alignItems="center"
      height="44px"
      marginBottom="4px"
      borderRadius="4px"
      color={active ? 'white' : 'inherit'}
      backgroundColor={active ? 'tKeel' : 'inherit'}
      _hover={{ backgroundColor: active ? 'tKeel' : 'gray.100' }}
      as={as}
      to={to}
    >
      <MenuItem active={active} name={name} leftIcon={icon} />
    </Link>
  );
}

export default MenuLink;
