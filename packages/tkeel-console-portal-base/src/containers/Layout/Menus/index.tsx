import { useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { CollapseFilledIcon, ExpandFilledIcon } from '@tkeel/console-icons';

import CollapsedMenus from './CollapsedMenus';
import ExpandMenus from './ExpandMenus';

const handleSearch = () => {};

function Menus() {
  const { themeName } = GLOBAL_CONFIG.client;
  const [collapsed, setCollapsed] = useState(false);
  const defaultMenuTheme = themeName === '' ? 'dark' : 'light';
  const [menuTheme] = useState(defaultMenuTheme);
  const isDarkTheme = menuTheme === 'dark';

  const iconColor = isDarkTheme ? 'white' : 'grayAlternatives.300';

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
