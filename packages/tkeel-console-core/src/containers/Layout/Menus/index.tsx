import React, { useState } from 'react';
import {
  Link as ReactRouterLink,
  useLocation,
  useMatch,
  useResolvedPath,
} from 'react-router-dom';
import { Box, Flex, Heading, Image, Link, Text } from '@chakra-ui/react';
import {
  AppsAddFilledIcon,
  ChevronDownFilledIcon,
  ChevronUpFilledIcon,
} from '@tkeel/console-icons';

import {
  CustomLinkReturnType,
  CustomMenuLinkProps,
  IconNameProps,
  MenuItemProps,
  Props,
  SubMenuProps,
  SubMenuTitleWrapperProps,
} from './types';

import LogoImg from '@/assets/images/logo.png';

import { IMenuDetail } from '@/mock/types';

function useActive(to: string): boolean {
  const resolved = useResolvedPath(to);
  const active = useMatch({ path: resolved.pathname, end: false });
  return !!active;
}

function useCustomLinkProps(to: string): CustomLinkReturnType {
  const active = useActive(to);
  return {
    as: ReactRouterLink,
    to,
    active,
  };
}

function IconNameWrapper({ name }: IconNameProps) {
  return (
    <Flex alignItems="center">
      <AppsAddFilledIcon style={{ marginRight: '10px' }} />
      {name}
    </Flex>
  );
}

function MenuItem({ name, icon, rightIcon }: MenuItemProps) {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      height="44px"
      paddingLeft="22px"
      fontWeight={500}
      cursor="pointer"
    >
      <IconNameWrapper name={name} icon={icon} />
      {rightIcon}
    </Flex>
  );
}

function SubMenuTitleWrapper({
  id,
  name,
  icon,
  children,
  spread,
  handleMenuClick,
}: SubMenuTitleWrapperProps) {
  const location = useLocation();
  const active: boolean = (children as IMenuDetail[]).some((item) => {
    return item.path && location.pathname.includes(item.path);
  });

  return (
    <Box
      paddingRight="18px"
      color={active ? 'white' : 'gray.600'}
      backgroundColor={active ? 'grayAlternatives.700' : 'inherit'}
      rounded="4px"
      active={active.toString()}
      onClick={() => handleMenuClick(id)}
    >
      <MenuItem
        name={name}
        icon={icon}
        rightIcon={spread ? <ChevronUpFilledIcon /> : <ChevronDownFilledIcon />}
      />
    </Box>
  );
}

function CustomMenuLink({ path, children }: CustomMenuLinkProps) {
  const { as, to, active } = useCustomLinkProps(path);
  return (
    <Link
      display="flex"
      alignItems="center"
      height="44px"
      marginBottom="4px"
      rounded="4px"
      color={active ? 'white' : 'inherit'}
      _hover={{ backgroundColor: active ? 'grayAlternatives.700' : 'gray.100' }}
      backgroundColor={active ? 'grayAlternatives.700' : 'inherit'}
      boxShadow={
        active
          ? '0px 20px 25px -5px rgba(113, 128, 150, 0.1), 0px 10px 10px -5px rgba(113, 128, 150, 0.04)'
          : 'none'
      }
      _focus={{ boxShadow: 'none' }}
      as={as}
      to={to}
    >
      {children}
    </Link>
  );
}

function CustomSubMenuLink({ path, children }: CustomMenuLinkProps) {
  const { as, to, active } = useCustomLinkProps(path);
  return (
    <Link
      display="flex"
      alignItems="center"
      height="44px"
      paddingLeft="48px"
      boxShadow="none!important"
      color={active ? 'blue.300' : 'gray.500'}
      _active={{ backgroundColor: 'blue.400' }}
      as={as}
      to={to}
    >
      {children}
    </Link>
  );
}

function SubMenusWrapper({ subMenus }: SubMenuProps) {
  return (
    <Box>
      {subMenus.map((subMenu) => (
        <CustomSubMenuLink key={subMenu.id} path={subMenu.path || ''}>
          {subMenu.name}
        </CustomSubMenuLink>
      ))}
    </Box>
  );
}

function Menus({ menus: menusData }: Props) {
  const [spreadMenuIds, setSpreadMenus] = useState<string[]>([]);

  const handleMenuClick = (id: string) => {
    if (spreadMenuIds.includes(id)) {
      setSpreadMenus(spreadMenuIds.filter((menuId) => menuId !== id));
    } else {
      setSpreadMenus([...spreadMenuIds, id]);
    }
  };

  return (
    <Box width="250px" backgroundColor="gray.50">
      <Flex
        alignItems="center"
        height="92px"
        paddingLeft="24px"
        borderBottomWidth="1px"
        borderBottomStyle="solid"
        borderBottomColor="grayAlternatives.50"
      >
        <Image htmlWidth="27px" src={LogoImg} alt="" />
        <Heading
          as="h1"
          marginLeft="10px"
          color="grayAlternatives.700"
          fontSize="18px"
        >
          tKeel 管理平台
        </Heading>
      </Flex>
      <Box padding="24px">
        {menusData.map(({ categoryId, categoryName, menus }) => {
          return (
            <Box key={categoryId}>
              {categoryId !== 'default' && (
                <Text margin="20px 0" fontSize="12px" color="gray.400">
                  {categoryName}
                </Text>
              )}
              {menus.map((menu) => {
                const { id, name, icon, path, children } = menu;
                const spread = spreadMenuIds.includes(id);

                return (
                  <Box key={id}>
                    {children ? (
                      <SubMenuTitleWrapper
                        {...menu}
                        spread={spread}
                        handleMenuClick={handleMenuClick}
                      />
                    ) : (
                      <CustomMenuLink path={path || ''}>
                        <MenuItem name={name} icon={icon} />
                      </CustomMenuLink>
                    )}
                    {children && spread && (
                      <SubMenusWrapper subMenus={children} />
                    )}
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default Menus;
