import React from 'react';
import { Outlet } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

// import CollapsedMenus from '@/tkeel-console-core/containers/Layout/CollapsedMenus';
import Header from '@/tkeel-console-core/containers/Layout/Header';
import Menus from '@/tkeel-console-core/containers/Layout/Menus';
import { Menu } from '@/tkeel-console-core/hooks/queries/useMenusQuery';

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
