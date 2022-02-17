import { useEffect, useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import {
  CollapseFilledIcon,
  ExpandFilledIcon,
  // MoonCircleFilledIcon,
  // SunFilledIcon,
} from '@tkeel/console-icons';
import { ThemeNames } from '@tkeel/console-themes';

import {
  isDarkMenuTheme,
  setMenuTheme,
} from '@/tkeel-console-portal-base/utils';

import CollapsedMenus from './CollapsedMenus';
import ExpandMenus from './ExpandMenus';

const handleSearch = () => {};

function Menus() {
  const { themeName } = GLOBAL_CONFIG.client;
  const [collapsed, setCollapsed] = useState(false);
  const localMenuTheme = localStorage.getItem('menuTheme');
  const defaultMenuTheme =
    themeName === ThemeNames.QingcloudLight ? 'dark' : 'light';
  const [menuTheme] = useState(localMenuTheme || defaultMenuTheme);
  const isDarkTheme = isDarkMenuTheme(menuTheme);

  const iconColor = isDarkTheme ? 'white' : 'grayAlternatives.300';

  useEffect(() => {
    setMenuTheme(menuTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      paddingBottom="60px"
      height="100%"
      backgroundColor={isDarkTheme ? 'grayAlternatives.800' : 'gray.50'}
    >
      {collapsed ? (
        <CollapsedMenus />
      ) : (
        <ExpandMenus isDarkTheme={isDarkTheme} handleSearch={handleSearch} />
      )}
      <Flex
        position="absolute"
        left={collapsed ? '22px' : '32px'}
        bottom="24px"
        alignItems="center"
        cursor="pointer"
        onClick={() => setCollapsed(!collapsed)}
      >
        {/* {isDarkTheme ? <SunFilledIcon /> : <MoonCircleFilledIcon />} */}
        {collapsed ? (
          <ExpandFilledIcon color={iconColor} />
        ) : (
          <>
            <CollapseFilledIcon color={iconColor} />
            <Text
              marginLeft="8px"
              color={isDarkTheme ? 'white' : 'grayAlternatives.500'}
              fontSize="12px"
            >
              收起
            </Text>
          </>
        )}
      </Flex>
    </Box>
  );
}

export default Menus;
