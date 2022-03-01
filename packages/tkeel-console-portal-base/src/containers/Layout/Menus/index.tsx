import { Box, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  CollapseFilledIcon,
  ExpandFilledIcon,
  // MoonCircleFilledIcon,
  // SunFilledIcon,
} from '@tkeel/console-icons';
import { ThemeNames } from '@tkeel/console-themes';

import {
  getLocalMenuTheme,
  isDarkMenuTheme,
  setLocalMenuTheme,
} from '@/tkeel-console-portal-base/utils';

import CollapsedMenus from './CollapsedMenus';
import ExpandMenus from './ExpandMenus';

function Menus() {
  const { themeName } = GLOBAL_CONFIG.client;
  const [searchParams] = useSearchParams();
  const menuCollapsed = searchParams.get('menu-collapsed') === 'true' || false;
  const [collapsed, setCollapsed] = useState(menuCollapsed);
  const localMenuTheme = getLocalMenuTheme();
  const isQingCloudTheme = themeName === ThemeNames.QingcloudLight;
  const defaultMenuTheme = isQingCloudTheme ? 'dark' : 'light';
  const [menuTheme] = useState(localMenuTheme || defaultMenuTheme);
  const isDarkMenu = isDarkMenuTheme(menuTheme);

  const iconColor = 'grayAlternatives.300';
  const whiteColor = 'white !important';

  useEffect(() => {
    setLocalMenuTheme(menuTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <Box
      paddingBottom="90px"
      height="100%"
      background="white"
      backgroundColor={isDarkMenu ? 'grayAlternatives.800' : 'gray.50'}
    >
      {collapsed ? (
        <CollapsedMenus isQingCloudTheme={isQingCloudTheme} />
      ) : (
        <ExpandMenus
          isQingCloudTheme={isQingCloudTheme}
          isDarkMenu={isDarkMenu}
        />
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
    </Box>
  );
}

export default Menus;
