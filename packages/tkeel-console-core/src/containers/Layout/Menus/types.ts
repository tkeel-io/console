import { ReactNode } from 'react';
import { Colors } from '@chakra-ui/react';
import { IMenu, IMenuDetail } from '@/mock/types';
import { Link } from 'react-router-dom';

export type Props = {
  data: IMenu[];
};

export type CustomLinkProps = {
  to: string;
  colors: Colors;
};

export type CustomLinkReturnType = {
  as: typeof Link;
  className: string;
  to: string;
  colors: Colors;
};

export type CustomMenuLinkProps = {
  to: string;
  children: ReactNode | string;
  colors: Colors;
};

export type IconNameProps = {
  name: string;
  icon: string;
};

export type SubMenuProps = {
  subMenus: IMenuDetail[];
  colors: Colors;
};
