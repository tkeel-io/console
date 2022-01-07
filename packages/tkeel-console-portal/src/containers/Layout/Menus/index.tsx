import React, { useState } from 'react';
import { Box, Flex, Text, useColorMode } from '@chakra-ui/react';
import { CollapseFilledIcon, ExpandFilledIcon } from '@tkeel/console-icons';

import CollapsedMenus from './CollapsedMenus';
import ExpandMenus from './ExpandMenus';

const handleSearch = () => {};

function Menus() {
  const [collapsed, setCollapsed] = useState(false);
  const { colorMode } = useColorMode();

  return (
    <Box
      height="100%"
      backgroundColor={colorMode === 'dark' ? '#000' : 'gray.50'}
    >
      {collapsed ? (
        <CollapsedMenus />
      ) : (
        <ExpandMenus handleSearch={handleSearch} />
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
          <ExpandFilledIcon color="grayAlternatives.300" />
        ) : (
          <>
            <CollapseFilledIcon color="grayAlternatives.300" />
            <Text marginLeft="8px" color="grayAlternatives.500" fontSize="12px">
              收起
            </Text>
          </>
        )}
      </Flex>
    </Box>
  );
}

export default Menus;
