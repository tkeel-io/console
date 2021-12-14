import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { IMenu, IMenuDetail } from '@/mock/types';

export type Props = {
  data: IMenu[];
};

export type CustomLinkReturnType = {
  as: typeof Link;
  className: string;
  to: string;
};

export type CustomMenuLinkProps = {
  to: string;
  children: ReactNode | string;
};

export type IconNameProps = {
  name: string;
  icon: string;
};

export type SubMenuProps = {
  subMenus: IMenuDetail[];
};
