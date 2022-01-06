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

import { Menu } from '@/tkeel-console-portal/hooks/queries/useMenusQuery';

function Header({ menus }: { menus: Menu[] }) {
  const { pathname } = useLocation();
  let breadcrumbs: string[] = [];
  menus.forEach((menu) => {
    const { name, path, children } = menu;
    if (children) {
      const menuItem = children.find((item) =>
        pathname.includes(item.path as string)
      );
      if (menuItem) {
        breadcrumbs = [name, menuItem.name];
      }
    } else if (pathname.includes(path as string)) {
      breadcrumbs = [name];
    }
  });

  return (
    <Flex justifyContent="space-between" height="20px" marginBottom="22px">
      <Breadcrumb separator={<Text color="gray.400">/</Text>}>
        {breadcrumbs.map((crumb) => (
          <BreadcrumbItem key={crumb}>
            <BreadcrumbLink color="gray.400" fontSize="14px" href="#">
              {crumb}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
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
