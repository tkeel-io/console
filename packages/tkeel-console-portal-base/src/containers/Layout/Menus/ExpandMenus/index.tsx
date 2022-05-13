import { Box, Center, Flex, Image } from '@chakra-ui/react';
import { useState } from 'react';

import type { PlatformConfig } from '@tkeel/console-constants';
import { APPEARANCE } from '@tkeel/console-constants';
import { usePortalConfigQuery } from '@tkeel/console-request-hooks';
import { Menu } from '@tkeel/console-types';
import { env } from '@tkeel/console-utils';

import emptyMenu from '@/tkeel-console-portal-base/assets/images/empty-menu.svg';
import logoBottomLineImg from '@/tkeel-console-portal-base/assets/images/logo-bottom-line.svg';
// import { SearchInput } from '@tkeel/console-components';
// import { MagnifierTwoToneIcon } from '@tkeel/console-icons';
import useMenusQuery, {
  getMockMenus,
} from '@/tkeel-console-portal-base/hooks/queries/useMenusQuery';

import MenuLink from './MenuLink';
import SubMenuLink from './SubMenuLink';
import SubMenuTitle from './SubMenuTitle';

type Props = {
  // handleSearch: () => void;
  isDarkMenu: boolean;
};

function isActive(path: string) {
  return window.location.pathname.includes(path);
}

export default function ExpandMenus({ isDarkMenu }: Props) {
  const [spreadMenuId, setSpreadMenuId] = useState('');
  const { config } = usePortalConfigQuery<PlatformConfig>({
    path: 'config.platform',
    defaultConfig: APPEARANCE.PLATFORM_CONFIG,
  });
  const { admin, tenant } = config || {};

  const { menus, isLoading } = useMenusQuery({
    onSuccess(data) {
      let entries = data?.data?.entries ?? [];
      if (env.isEnvDevelopment()) {
        entries = getMockMenus();
      }
      entries.forEach((menu) => {
        const { id, path, children } = menu;
        let active = false;
        if (path) {
          active = isActive(path);
        } else if (children && Array.isArray(children)) {
          active = (children as Menu[]).some((item) => {
            return isActive(item.path || '');
          });
        }

        if (active) {
          setSpreadMenuId(id);
        }
      });
    },
  });

  const handleMenuClick = (id: string) => {
    setSpreadMenuId(spreadMenuId === id ? '' : id);
  };

  const isAdminPlatform = GLOBAL_PORTAL_CONFIG.portalName === 'admin';
  const configInfo = isAdminPlatform ? admin : tenant;
  const logo = isDarkMenu
    ? configInfo?.logoTypeLight
    : configInfo?.logoTypeDark;

  return (
    <Flex
      flexDirection="column"
      position="relative"
      width="240px"
      height="100%"
    >
      <Flex paddingTop="17px" height="80px" paddingLeft="20px">
        <Image src={logo} height="52px" />
      </Flex>
      <Image src={logoBottomLineImg} marginLeft="20px" width="200px" />
      {/* <SearchInput
        width="200px"
        height="44px"
        inputGroupStyle={{ marginLeft: '20px' }}
        inputStyle={{
          border: 'none',
          borderRadius: '4px',
          backgroundColor: isDarkMenu ? 'whiteAlpha.50' : 'gray.100',
        }}
        icon={<MagnifierTwoToneIcon color={isDarkMenu ? 'white' : ''} />}
        iconSize={20}
        placeholder="搜索"
        onSearch={handleSearch}
      /> */}
      <Box marginTop="20px" flex="1" overflow="auto" fontSize="13px">
        {(() => {
          if (menus.length > 0) {
            return menus.map((menu) => {
              const { id, name, icon, path, children } = menu;
              const hasChildren = children && children[0];
              const spread = spreadMenuId === id;
              return (
                <Box key={id} marginBottom="8px">
                  <Box>
                    {hasChildren ? (
                      <SubMenuTitle
                        {...menu}
                        spread={spread}
                        handleMenuClick={handleMenuClick}
                      />
                    ) : (
                      <MenuLink
                        path={path as string}
                        name={name}
                        icon={icon as string}
                      />
                    )}
                    {hasChildren && spread && (
                      <Box marginTop="4px" borderRadius="4px">
                        {children.map((subMenu) => (
                          <SubMenuLink
                            key={subMenu.id}
                            name={subMenu.name}
                            path={subMenu.path as string}
                          />
                        ))}
                      </Box>
                    )}
                  </Box>
                </Box>
              );
            });
          }

          if (isLoading) {
            return null;
          }

          return (
            <Center height="100%">
              <Image src={emptyMenu} width="104px" />
            </Center>
          );
        })()}
      </Box>
    </Flex>
  );
}
