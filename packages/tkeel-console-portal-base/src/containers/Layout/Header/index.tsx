import { Flex, Text } from '@chakra-ui/react';
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
      <Flex color="grayAlternatives.300" fontSize="12px">
        {breadcrumbs.map((crumb, i) => (
          <Flex key={String(i + 1)} alignItems="center">
            <Text key="crumb" cursor="default">
              {crumb}
            </Text>
            {i < breadcrumbs.length - 1 && <Text margin="0">/</Text>}
          </Flex>
        ))}
      </Flex>
      <Flex alignItems="center">{userActionMenusComponent}</Flex>
    </Flex>
  );
}
