import { useEffect, useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import {
  CollapseFilledIcon,
  ExpandFilledIcon,
  MoonCircleFilledIcon,
  SunFilledIcon,
} from '@tkeel/console-icons';
import { ThemeNames } from '@tkeel/console-themes';

import {
  isDarkMenuTheme,
  setMenuTheme,
} from '@/tkeel-console-portal-base/utils';

import CollapsedMenus from './CollapsedMenus';
import ExpandMenus from './ExpandMenus';

function Menus() {
  const { themeName } = GLOBAL_CONFIG.client;
  const [collapsed, setCollapsed] = useState(false);
  const localMenuTheme = localStorage.getItem('menuTheme');
  const defaultMenuTheme =
    themeName === ThemeNames.QingcloudLight ? 'dark' : 'light';
  const [menuTheme] = useState(localMenuTheme || defaultMenuTheme);
  const isDarkTheme = isDarkMenuTheme(menuTheme);

  const iconColor = 'grayAlternatives.300';
  const whiteColor = 'white !important';

  useEffect(() => {
    setMenuTheme(menuTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getChangeThemeIconProps = (theme: 'dark' | 'light') => {
    return {
      color: iconColor,
      style: { marginBottom: '20px' },
      _hover: {
        color: whiteColor,
      },
      onClick() {
        setMenuTheme(theme);
        window.location.reload();
      },
    };
  };

  const iconHoverStyle = {
    '& > svg': {
      fill: whiteColor,
    },
  };

  const collapseHoverStyle = isDarkTheme
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
      backgroundColor={isDarkTheme ? 'grayAlternatives.800' : 'gray.50'}
    >
      {collapsed ? (
        <CollapsedMenus />
      ) : (
        <ExpandMenus isDarkTheme={isDarkTheme} />
      )}
      <Flex
        flexDirection="column"
        alignItems="flex-start"
        position="absolute"
        left={collapsed ? '22px' : '32px'}
        bottom="20px"
        cursor="pointer"
      >
        {isDarkTheme ? (
          <Box _hover={iconHoverStyle}>
            <SunFilledIcon {...getChangeThemeIconProps('light')} />
          </Box>
        ) : (
          <MoonCircleFilledIcon {...getChangeThemeIconProps('dark')} />
        )}
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
              color={isDarkTheme ? 'gray.400' : 'gray.600'}
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
