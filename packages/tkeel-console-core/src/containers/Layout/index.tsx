import React from 'react';
import { Outlet } from 'react-router-dom';

// import CollapsedMenus from '@/containers/Layout/CollapsedMenus';
import Header from '@/containers/Layout/Header';
import Menus from '@/containers/Layout/Menus';

import { Content, Main, Wrapper } from './index.styled';

import { IMenu } from '@/mock/types';

type Props = {
  menus: IMenu[];
};

function Layout({ menus }: Props) {
  return (
    <Wrapper>
      {/* <CollapsedMenus menus={menus} /> */}
      <Menus menus={menus} />
      <Main>
        <Header menus={menus} />
        <Content>
          <Outlet />
        </Content>
      </Main>
    </Wrapper>
  );
}

export default Layout;
