import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Text,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

import { Menu } from '@tkeel/console-types';

type Props = {
  menus: Menu[];
  userActionMenusComponent: ReactNode;
};

export default function Header({ menus, userActionMenusComponent }: Props) {
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
      <Breadcrumb
        separator={
          <Text margin="0" color="gray.400" fontSize="12px">
            /
          </Text>
        }
      >
        {breadcrumbs.map((crumb) => (
          <BreadcrumbItem key={crumb}>
            <BreadcrumbLink
              color="grayAlternatives.300"
              fontSize="12px"
              cursor="default"
            >
              {crumb}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
      <Flex alignItems="center">{userActionMenusComponent}</Flex>
    </Flex>
  );
}
