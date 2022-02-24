import { useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Text,
} from '@chakra-ui/react';
import { PLATFORM_INFOS, PlatformNames } from '@tkeel/console-constants';
import { Menu } from '@tkeel/console-types';

import AdminUserActionMenus from '@/tkeel-console-portal-base/components/AdminUserActionMenus';
import TenantUserActionMenus from '@/tkeel-console-portal-base/components/TenantUserActionMenus';
import useGlobalProps from '@/tkeel-console-portal-base/hooks/useGlobalProps';

export default function Header({ menus }: { menus: Menu[] }) {
  const { platformName } = useGlobalProps();
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
      <Flex alignItems="center">
        {platformName === PLATFORM_INFOS[PlatformNames.ADMIN].name && (
          <AdminUserActionMenus />
        )}
        {platformName === PLATFORM_INFOS[PlatformNames.TENANT].name && (
          <TenantUserActionMenus />
        )}
      </Flex>
    </Flex>
  );
}
