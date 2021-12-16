import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { IMenu, IMenuDetail } from '@/mock/types';

export type Props = {
  menus: IMenu[];
};

export type CustomLinkReturnType = {
  as: typeof Link;
  to: string;
  active: boolean;
};

export type CustomMenuLinkProps = {
  path: string;
  children: ReactNode | string;
};

export type MenuItemProps = {
  name: string;
  icon: string;
  rightIcon?: ReactNode;
};

export type IconNameProps = {
  name: string;
  icon: string;
};

export type SubMenuProps = {
  subMenus: IMenuDetail[];
};

export type SubMenuTitleWrapperProps = IMenuDetail & {
  spread: boolean;
  handleMenuClick: (id: string) => void;
};
