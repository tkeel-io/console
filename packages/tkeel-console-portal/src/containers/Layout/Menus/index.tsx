import React, { useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { CollapseFilledIcon, ExpandFilledIcon } from '@tkeel/console-icons';

import CollapsedMenus from './CollapsedMenus';
import ExpandMenus from './ExpandMenus';

const handleSearch = () => {};

function Menus() {
  const [collapsed, setCollapsed] = useState(false);
  const [menuTheme] = useState<'light' | 'dark'>('dark');
  const isDarkTheme = menuTheme === 'light';

  const iconColor = isDarkTheme ? 'white' : 'grayAlternatives.300';

  return (
    <Box
      height="100%"
      backgroundColor={isDarkTheme ? 'grayAlternatives.800' : 'gray.50'}
    >
      {collapsed ? (
        <CollapsedMenus />
      ) : (
        <ExpandMenus handleSearch={handleSearch} isDarkTheme={isDarkTheme} />
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
