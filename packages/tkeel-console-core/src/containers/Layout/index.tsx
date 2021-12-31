import React from 'react';
import { Outlet } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

// import CollapsedMenus from '@/containers/Layout/CollapsedMenus';
import Header from '@/containers/Layout/Header';
import Menus from '@/containers/Layout/Menus';
import { Menu } from '@/hooks/queries/useMenusQuery';

type Props = {
  menus: Menu[];
};

function Layout({ menus }: Props) {
  return (
    <Flex height="100%">
      {/* <CollapsedMenus menus={menus} /> */}
      <Menus menus={menus} />
      <Flex flex="1" overflow="hidden" flexDirection="column" padding="24px">
        <Header menus={menus} />
        <Flex flex="1" overflow="hidden">
          <Outlet />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Layout;
