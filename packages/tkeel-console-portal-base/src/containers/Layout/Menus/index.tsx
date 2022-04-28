import { Box, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useColor } from '@tkeel/console-hooks';
import {
  CollapseFilledIcon,
  ExpandFilledIcon,
  GearTwoToneIcon,
  // MoonCircleFilledIcon,
  // SunFilledIcon,
} from '@tkeel/console-icons';
import { ThemeNames } from '@tkeel/console-themes';
import { Logo } from '@tkeel/console-types';
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

type Props = {
  logo: Logo;
  menus: Menu[];
};

function Menus({ logo, menus }: Props) {
  const [searchParams] = useSearchParams();
  const menuCollapsed = searchParams?.get('menu-collapsed') === 'true' || false;
  const [collapsed, setCollapsed] = useState(menuCollapsed);
  const localMenuTheme = getLocalMenuTheme();
  const isQingCloudTheme =
    GLOBAL_PORTAL_CONFIG.client.themeName === ThemeNames.QingcloudLight;
  const defaultMenuTheme = isQingCloudTheme ? 'dark' : 'light';
  const [menuTheme] = useState(localMenuTheme || defaultMenuTheme);
  const isDarkMenu = isDarkMenuTheme(menuTheme);
  const [isShowMenuSetting, setIsShowMenuSetting] = useState(false);
  const [mockMenus, setMockMenus] = useState(JSON.stringify(menus, null, 2));

  const iconColor = 'grayAlternatives.300';
  const whiteColor = `${useColor('white')} !important`;

  useEffect(() => {
    setLocalMenuTheme(menuTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCollapsed(menuCollapsed);
  }, [menuCollapsed]);

  // const getChangeThemeIconProps = (theme: 'dark' | 'light') => {
  //   return {
  //     color: iconColor,
  //     style: { marginBottom: '20px' },
  //     _hover: {
  //       color: whiteColor,
  //     },
  //     onClick() {
  //       setLocalMenuTheme(theme);
  //       window.location.reload();
  //     },
  //   };
  // };

  const iconHoverStyle = {
    '& > svg': {
      fill: whiteColor,
    },
  };

  const collapseHoverStyle = isDarkMenu
    ? {
        ...iconHoverStyle,
        '& > p': {
          color: whiteColor,
        },
      }
    : {};

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
      {collapsed ? (
        <CollapsedMenus logo={logo} />
      ) : (
        <ExpandMenus isDarkMenu={isDarkMenu} logo={logo} />
      )}
      <Flex
        flexDirection="column"
        alignItems="flex-start"
        position="absolute"
        left={collapsed ? '22px' : '32px'}
        bottom="20px"
        cursor="pointer"
      >
        {/* {isDarkMenu ? (
          <Box _hover={iconHoverStyle}>
            <SunFilledIcon {...getChangeThemeIconProps('light')} />
          </Box>
        ) : (
          <MoonCircleFilledIcon {...getChangeThemeIconProps('dark')} />
        )} */}
        {collapsed ? (
          <Box _hover={iconHoverStyle}>
            <ExpandFilledIcon
              color={iconColor}
              onClick={() => setCollapsed(false)}
            />
          </Box>
        ) : (
          <Flex
            alignItems="center"
            onClick={() => setCollapsed(true)}
            _hover={collapseHoverStyle}
          >
            <CollapseFilledIcon color={iconColor} />
            <Text
              marginLeft="8px"
              color={isDarkMenu ? 'gray.400' : 'gray.600'}
              fontSize="12px"
            >
              收起
            </Text>
          </Flex>
        )}
      </Flex>
      {isDevelopment && isShowDevTools && (
        <GearTwoToneIcon
          style={{
            position: 'absolute',
            right: '22px',
            bottom: collapsed ? '50px' : '20px',
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

export default Menus;
