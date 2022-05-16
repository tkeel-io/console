import { Box, Center, Flex, Image } from '@chakra-ui/react';

import type { CommonConfig } from '@tkeel/console-constants';
import { APPEARANCE } from '@tkeel/console-constants';
import { usePortalConfigQuery } from '@tkeel/console-request-hooks';

// import tkeelLogo from '@/tkeel-console-portal-base/assets/images/tkeel-logo.svg';
import useMenusQuery from '@/tkeel-console-portal-base/hooks/queries/useMenusQuery';

// import MenuItem from './MenuItem';
import MenuLink from './MenuLink';
import SubMenus from './SubMenus';

function CollapsedMenus() {
  const { menus } = useMenusQuery();
  const { config } = usePortalConfigQuery<CommonConfig>({
    path: 'config.common',
    defaultConfig: APPEARANCE.common,
  });

  const logoMark = config?.logoMark ?? '';
  return (
    <Box position="relative" width="60px" height="100%">
      <Center height="96px">
        {logoMark && (
          <Image htmlWidth="32px" src={config?.logoMark ?? ''} alt="" />
        )}
      </Center>
      <Flex flexDirection="column" alignItems="center">
        {/* <Box>
          <MenuItem icon="MagnifierFilledIcon" active={false} />
        </Box> */}
        {menus.map(({ id, path, icon, children }) => {
          if (children && children[0]) {
            return (
              <SubMenus key={id} icon={icon as string} subMenus={children} />
            );
          }
          return (
            <MenuLink key={id} path={path as string} icon={icon as string} />
          );
        })}
      </Flex>
    </Box>
  );
}

export default CollapsedMenus;
