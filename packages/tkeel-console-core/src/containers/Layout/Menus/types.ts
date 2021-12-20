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
  name: string;
  icon: string;
};

export type CustomSubMenuProps = {
  path: string;
  name: string;
};

export type SubMenuProps = {
  subMenus: IMenuDetail[];
};

export type SubMenuTitleWrapperProps = IMenuDetail & {
  spread: boolean;
  handleMenuClick: (id: string) => void;
};
