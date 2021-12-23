import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Text,
} from '@chakra-ui/react';
import { HumanFilledIcon } from '@tkeel/console-icons';

import { getTotalMenus } from '@/utils/qiankun';

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
          <BreadcrumbLink color="gray.400" fontSize="14px" href="#">
            {name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex alignItems="center">
        <Flex alignItems="center" cursor="pointer">
          <HumanFilledIcon />
          <Text marginLeft="5px" color="gray.500" fontSize="12px">
            Admin
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Header;
