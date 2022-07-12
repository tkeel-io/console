import { Link } from '@chakra-ui/react';
import {
  Link as ReactRouterLink,
  useMatch,
  useResolvedPath,
} from 'react-router-dom';

import useMenuNotification from '@/tkeel-console-portal-base/hooks/useMenuNotification';
import { isDarkMenuTheme } from '@/tkeel-console-portal-base/utils';

import MenuItem from './MenuItem';
import Rectangle from './Rectangle';

type Props = {
  id: string;
  path: string;
  name: string;
  icon: string;
};

type MenuLinkReturnType = {
  as: typeof ReactRouterLink;
  to: string;
  active: boolean;
};

export function useActive(to: string): boolean {
  const resolved = useResolvedPath(to);
  const active = useMatch({
    path: resolved.pathname,
    end: false,
  });
  return to ? !!active : false;
}

export function useMenuLinkProps(to: string): MenuLinkReturnType {
  const active = useActive(to);
  return {
    as: ReactRouterLink,
    to,
    active,
  };
}

export function getTextColor(active: boolean) {
  const isDarkTheme = isDarkMenuTheme();
  const defaultColor = isDarkTheme ? 'gray.400' : 'gray.600';

  return active ? 'white' : defaultColor;
}

export function getHoverStyle(active: boolean) {
  const isDarkTheme = isDarkMenuTheme();

  const color = isDarkTheme ? 'white' : 'primary';
  const backgroundColor = isDarkTheme ? 'grayAlternatives.700' : 'brand.50';
  const menuNameColor = isDarkTheme ? 'white' : 'gray.600';
  return active
    ? {}
    : {
        color,
        backgroundColor,
        '.menu-name': {
          fontWeight: '600',
          color: menuNameColor,
        },
        '.rectangle': {
          display: 'block',
        },
        svg: {
          color: `${color} !important`,
        },
      };
}

export function getLinkStyle(active: boolean) {
  const color = getTextColor(active);
  const hoverStyle = getHoverStyle(active);

  return {
    display: 'flex',
    alignItems: 'center',
    height: '36px',
    color,
    backgroundColor: active ? 'primary' : 'transparent',
    _hover: hoverStyle,
  };
}

export default function MenuLink({ id, path, name, icon }: Props) {
  const hasNotification = useMenuNotification(id);
  const { as, to, active } = useMenuLinkProps(path || '');
  const linkStyle = getLinkStyle(active);

  return (
    <Link position="relative" {...linkStyle} as={as} to={to}>
      <Rectangle style={{ display: 'none' }} />
      <MenuItem
        active={active}
        name={name}
        hasNotification={hasNotification}
        leftIcon={icon}
      />
    </Link>
  );
}
