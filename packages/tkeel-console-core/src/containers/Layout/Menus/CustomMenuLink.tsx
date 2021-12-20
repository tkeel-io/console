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

type CustomLinkReturnType = {
  as: typeof ReactRouterLink;
  to: string;
  active: boolean;
};

function useActive(to: string): boolean {
  const resolved = useResolvedPath(to);
  const active = useMatch({ path: resolved.pathname, end: false });
  return !!active;
}

export function useCustomLinkProps(to: string): CustomLinkReturnType {
  const active = useActive(to);
  return {
    as: ReactRouterLink,
    to,
    active,
  };
}

function CustomMenuLink({ path, name, icon }: Props) {
  const { as, to, active } = useCustomLinkProps(path);
  return (
    <Link
      display="flex"
      alignItems="center"
      height="44px"
      marginBottom="4px"
      borderRadius="4px"
      color={active ? 'white' : 'inherit'}
      backgroundColor={active ? 'grayAlternatives.700' : 'inherit'}
      boxShadow={
        active
          ? '0px 20px 25px -5px rgba(113, 128, 150, 0.1), 0px 10px 10px -5px rgba(113, 128, 150, 0.04)'
          : 'none'
      }
      _hover={{ backgroundColor: active ? 'grayAlternatives.700' : 'gray.100' }}
      _focus={{ boxShadow: 'none' }}
      as={as}
      to={to}
    >
      <MenuItem active={active} name={name} icon={icon} />
    </Link>
  );
}

export default CustomMenuLink;
