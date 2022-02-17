import {
  Link as ReactRouterLink,
  useMatch,
  useResolvedPath,
} from 'react-router-dom';
import { Link } from '@chakra-ui/react';

import { isDarkMenuTheme } from '@/tkeel-console-portal-base/utils';

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
  const isDarkTheme = isDarkMenuTheme();
  const hoverStyle = active
    ? {}
    : {
        backgroundColor: 'primary',
        '& > svg': {
          color: 'blue.800',
        },
        color: 'white !important',
      };
  const defaultColor = isDarkTheme ? 'gray.400' : 'gray.600';

  return (
    <Link
      display="flex"
      alignItems="center"
      height="44px"
      borderRadius="4px"
      color={active ? 'white' : defaultColor}
      backgroundColor={active ? 'primary' : 'transparent'}
      _hover={hoverStyle}
      as={as}
      to={to}
    >
      <MenuItem active={active} name={name} leftIcon={icon} />
    </Link>
  );
}

export default MenuLink;
