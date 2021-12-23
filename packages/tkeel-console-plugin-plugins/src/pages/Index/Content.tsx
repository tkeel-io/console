import React from 'react';
import { Column } from 'react-table';
import { Flex, Text } from '@chakra-ui/react';
import { SearchInput } from '@tkeel/console-components';

import PluginList, { Data } from './PluginList';

const handleSearch = (keyword: string) => {
  // eslint-disable-next-line no-console
  console.log('keyword', keyword);
};

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

  const columns: Column<Data>[] = [
    {
      Header: 'ID',
      accessor: 'id',
    },
  ];

  const data = Array.from({ length: 1000 }).map((_, index) => {
    return {
      id: index.toString(),
    };
  });

  return (
    <Flex
      flexDirection="column"
      height="100%"
      paddingTop="17px"
      borderRadius="4px"
      backgroundColor="white"
    >
      <Flex margin="0 24px" alignItems="center" justifyContent="space-between">
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
        <SearchInput
          width="452px"
          placeholder="搜索插件"
          onSearch={handleSearch}
        />
      </Flex>
      <PluginList columns={columns} data={data} />
    </Flex>
  );
}

export default Content;
