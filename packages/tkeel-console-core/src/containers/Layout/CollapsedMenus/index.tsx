import React from 'react';
import {
  Link as ReactRouterLink,
  useMatch,
  useResolvedPath,
} from 'react-router-dom';
import { Box, Center, Flex, Image, Link } from '@chakra-ui/react';
import { AppsAddFilledIcon } from '@tkeel/console-icons';

import { Props } from '@/containers/Layout/Menus/types';
import { getTotalMenus } from '@/utils/qiankun';
import { IMenuInfo } from '@/utils/qiankun/types';

import LogoImg from '@/assets/images/logo.png';

function CustomMenuLink({ path }: { path: string }) {
  const resolved = useResolvedPath(path);
  const match = useMatch({ path: resolved.pathname, end: false });
  return (
    <Link
      marginTop="10px"
      borderRadius="4px"
      backgroundColor={match ? 'gray.800' : 'inherit'}
      boxShadow={
        match
          ? '0 20px 25px -5px rgb(113 128 150 / 10%), 0 10px 10px -5px rgb(113 128 150 / 4%)'
          : 'none'
      }
      _focus={{ boxShadow: 'none' }}
      _hover={{ backgroundColor: match ? 'gray.800' : 'gray.100' }}
      as={ReactRouterLink}
      to={path}
    >
      <Center width="48px" height="48px">
        <AppsAddFilledIcon mode={match ? 'dark' : 'light'} />
      </Center>
    </Link>
  );
}

function CollapsedMenus({ menus: menusData }: Props) {
  const menus: IMenuInfo[] = getTotalMenus(menusData);

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
