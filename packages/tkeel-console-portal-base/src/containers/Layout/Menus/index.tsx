import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { GearTwoToneIcon } from '@tkeel/console-icons';
import { ThemeNames } from '@tkeel/console-themes';
import { env } from '@tkeel/console-utils';

import { Menu } from '@/tkeel-console-portal-base/hooks/queries/useMenusQuery';
import {
  getLocalMenuTheme,
  isDarkMenuTheme,
  setLocalMenuTheme,
} from '@/tkeel-console-portal-base/utils';

import CollapsedMenus from './CollapsedMenus';
import ExpandMenus from './ExpandMenus';
import MenuSetting from './MenuSetting';
import MenuTools from './MenuTools';

type Props = {
  menus: Menu[];
};

export default function Menus({ menus }: Props) {
  const [searchParams] = useSearchParams();
  const menuCollapsed = searchParams?.get('menu-collapsed') === 'true' || false;
  const [collapsed, setCollapsed] = useState(menuCollapsed);

  const localMenuTheme = getLocalMenuTheme();
  const isQingCloudTheme =
    GLOBAL_PORTAL_CONFIG.client.themeName === ThemeNames.QingCloudLight;
  const defaultMenuTheme = isQingCloudTheme ? 'dark' : 'light';
  const [menuTheme, setMenuTheme] = useState(
    localMenuTheme || defaultMenuTheme
  );
  const isDarkMenu = isDarkMenuTheme(menuTheme);

  const [isShowMenuSetting, setIsShowMenuSetting] = useState(false);
  const [mockMenus, setMockMenus] = useState(JSON.stringify(menus, null, 2));

  useEffect(() => {
    setLocalMenuTheme(menuTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCollapsed(menuCollapsed);
  }, [menuCollapsed]);

  const isDevelopment = env.isEnvDevelopment();
  const isShowDevTools = GLOBAL_PORTAL_CONFIG.client.showDevTools ?? false;

  return (
    <Box
      position="relative"
      paddingBottom="90px"
      height="100%"
      background="white"
      backgroundColor={isDarkMenu ? 'grayAlternatives.800' : 'gray.50'}
    >
      {collapsed ? <CollapsedMenus /> : <ExpandMenus isDarkMenu={isDarkMenu} />}
      <MenuTools
        isDarkMenu={isDarkMenu}
        collapsed={collapsed}
        setMenuTheme={setMenuTheme}
        setCollapsed={setCollapsed}
      />
      {isDevelopment && isShowDevTools && (
        <GearTwoToneIcon
          style={{
            position: 'absolute',
            right: '22px',
            bottom: collapsed ? '90px' : '20px',
            cursor: 'pointer',
          }}
          onClick={() => setIsShowMenuSetting(true)}
        />
      )}
      {isShowMenuSetting && (
        <MenuSetting
          mockMenus={mockMenus}
          setMockMenus={(value) => setMockMenus(value)}
          onClose={() => setIsShowMenuSetting(false)}
        />
      )}
    </Box>
  );
}
