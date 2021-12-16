import React from 'react';
import {
  Link as ReactRouterLink,
  useMatch,
  useResolvedPath,
} from 'react-router-dom';
import { Box, Center, Flex, Image, Link } from '@chakra-ui/react';
import { BellIcon } from '@tkeel/console-icons';

import { CustomMenuLinkProps, Props } from '@/containers/Layout/Menus/types';
import { getTotalMenus } from '@/utils/qiankun';
import { IMenuInfo } from '@/utils/qiankun/types';

import LogoImg from '@/assets/images/logo.png';

function CustomMenuLink({ to, children }: CustomMenuLinkProps) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: false });
  return (
    <Link
      marginTop="10px"
      rounded="4px"
      backgroundColor={match ? '#242e42' : 'inherit'}
      boxShadow={
        match
          ? '0 20px 25px -5px rgb(113 128 150 / 10%), 0 10px 10px -5px rgb(113 128 150 / 4%)'
          : 'none'
      }
      _hover={{ backgroundColor: 'gray.100' }}
      as={ReactRouterLink}
      className={match ? 'active' : ''}
      to={to}
    >
      {children}
    </Link>
  );
}

function CollapsedMenus({ menus: menusData }: Props) {
  const menus: IMenuInfo[] = getTotalMenus(menusData);

  return (
    <Box width="80px" backgroundColor="#f7fafc">
      <Center height="92px" borderBottom="1px solid #ebf0f6">
        <Image htmlWidth="27px" src={LogoImg} alt="" />
      </Center>
      <Flex flexDirection="column" alignItems="center">
        {menus.map(({ id, path }) => (
          <CustomMenuLink key={id} to={path}>
            <Center width="40px" height="48px" key={id}>
              <BellIcon />
            </Center>
          </CustomMenuLink>
        ))}
      </Flex>
    </Box>
  );
}

export default CollapsedMenus;
