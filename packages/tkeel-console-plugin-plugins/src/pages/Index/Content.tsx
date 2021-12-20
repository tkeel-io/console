import React from 'react';
import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { SearchInput } from '@tkeel/console-components';

import Card from './Card';

function Content() {
  const pluginNum = [
    {
      name: '插件数量',
      num: 50,
    },
    {
      name: '已启用',
      num: 30,
    },
    {
      name: '未启用',
      num: 20,
    },
  ];

  return (
    <Box
      flex="1"
      padding="17px 24px 24px"
      borderRadius="4px"
      backgroundColor="white"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          {pluginNum.map((item) => (
            <Flex key={item.name} alignItems="center" marginRight="5px">
              <Text color="gray.700" fontSize="12px" fontWeight="500">
                {item.name}
              </Text>
              <Text
                marginLeft="2px"
                color="gray.500"
                fontSize="12px"
                fontWeight="500"
              >
                {item.num}
              </Text>
            </Flex>
          ))}
        </Flex>
        <SearchInput width="452px" />
      </Flex>
      <Grid marginTop="19px" templateColumns="repeat(4, 1fr)" gap="8px">
        {Array.from({ length: 10 })
          .fill('')
          .map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Card key={index} />
          ))}
      </Grid>
    </Box>
  );
}

export default Content;
