import React from 'react';
import { Box, Center, Flex, Image } from '@chakra-ui/react';

import { getTotalMenus } from '@/utils/qiankun';
import { MenuInfo } from '@/utils/qiankun/types';

import CustomMenuLink from './CustomMenuLink';

import LogoImg from '@/assets/images/logo.png';

import { Menu } from '@/mock/types';

type Props = {
  menus: Menu[];
};

function CollapsedMenus({ menus: menusData }: Props) {
  const menus: MenuInfo[] = getTotalMenus(menusData);

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
        {menus.map(({ id, path }) => (
          <CustomMenuLink key={id} path={path} />
        ))}
      </Flex>
    </Box>
  );
}

export default CollapsedMenus;
