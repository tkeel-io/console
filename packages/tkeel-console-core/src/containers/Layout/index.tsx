import React from 'react';

import Header from '@/containers/Layout/Header';
import Menus from '@/containers/Layout/Menus';

import { LayoutContent, LayoutWrapper } from './index.styled';

import { IMenu } from '@/mock/types';

type Props = {
  children: React.ReactNode;
  menus: IMenu[];
};

function Layout({ children, menus }: Props): JSX.Element {
  return (
    <LayoutWrapper>
      <Menus data={menus} />
      <LayoutContent>
        <Header />
        {children}
      </LayoutContent>
    </LayoutWrapper>
  );
}

export default Layout;
