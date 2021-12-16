import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Image,
  Text,
} from '@chakra-ui/react';
import { BellFilledIcon } from '@tkeel/console-icons';

import { getTotalMenus } from '@/utils/qiankun';

import DefaultAvatar from '@/assets/images/default-avatar.png';

import { IMenu } from '@/mock/types';

function Header({ menus }: { menus: IMenu[] }) {
  const { pathname } = useLocation();
  const totalMenus = getTotalMenus(menus);
  let name = '';
  totalMenus.forEach((menu) => {
    if (pathname.includes(menu.path)) {
      name = menu.name;
    }
  });

  return (
    <Flex justifyContent="space-between" height="22px" marginBottom="20px">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink color="gray.400" fontSize="sm" href="#">
            {name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex alignItems="center">
        <Flex alignItems="center" cursor="pointer">
          <Image width="16px" src={DefaultAvatar} alt="avatar" />
          <Text marginLeft="5px" color="#718096" fontSize="xs">
            Admin
          </Text>
        </Flex>
        <BellFilledIcon />
      </Flex>
    </Flex>
  );
}

export default Header;
