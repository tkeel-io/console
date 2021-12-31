import React from 'react';
import { Box, Center, Flex, Image } from '@chakra-ui/react';

import { Menu } from '@/hooks/queries/useMenusQuery';

import MenuLink from './MenuLink';
import SubMenus from './SubMenus';

import LogoImg from '@/assets/images/logo.png';

type Props = {
  menus: Menu[];
};

function CollapsedMenus({ menus }: Props) {
  return (
    <Box width="80px" backgroundColor="gray.50">
      <Center
        height="92px"
        borderBottomWidth="1px"
        borderBottomStyle="solid"
        borderBottomColor="gray.100"
      >
        <Image htmlWidth="27px" src={LogoImg} alt="" />
      </Center>
      <Flex flexDirection="column" alignItems="center">
        {menus.map(({ id, path, icon, children }) => {
          if (children) {
            return (
              <SubMenus key={id} icon={icon as string} subMenus={children} />
            );
          }
          return (
            <MenuLink key={id} path={path as string} icon={icon as string} />
          );
        })}
      </Flex>
    </Box>
  );
}

export default CollapsedMenus;
