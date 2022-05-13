import { Box, Center, Flex, Text, useTheme } from '@chakra-ui/react';
import { useState } from 'react';

import {
  Empty,
  Loading,
  MoreActionSelect,
  Pagination,
  SearchInput,
} from '@tkeel/console-components';
import type { Theme } from '@tkeel/console-themes';

import { getPluginStatusInfos } from '@/tkeel-console-plugin-admin-service-monitoring/constants/plugins';
import useMonitorPluginsQuery from '@/tkeel-console-plugin-admin-service-monitoring/hooks/queries/useMonitorPluginsQuery';

import Plugin from '../Plugin';

export default function Plugins() {
  const { colors } = useTheme<Theme>();
  const statusInfos = getPluginStatusInfos({ colors });

  const [status, setStatus] = useState('');

  const { isLoading, plugins } = useMonitorPluginsQuery();

  const renderPlugins = () => {
    if (isLoading) {
      return (
        <Center flex="1">
          <Loading />
        </Center>
      );
    }

    if (!(plugins?.length > 0)) {
      return (
        <Center flex="1">
          <Empty />
        </Center>
      );
    }

    return plugins.map((data) => {
      const { uid } = data.metadata;

      return <Plugin key={uid} />;
    });
  };

  return (
    <Flex
      flexDirection="column"
      flex="1"
      overflowY="hidden"
      backgroundColor="gray.100"
      boxShadow="0px 8px 8px rgba(152, 163, 180, 0.1);"
      borderRadius="4px"
    >
      <Flex margin="16px 20px">
        <Flex paddingRight="16px">
          <Center>
            <Text whiteSpace="nowrap" fontSize="12px">
              状态：
            </Text>
          </Center>
          <MoreActionSelect
            options={[{ value: '', label: '全部' }, ...statusInfos]}
            value={status}
            onChange={setStatus}
            styles={{ element: { width: '75px', backgroundColor: 'gray.50' } }}
          />
        </Flex>
        <SearchInput
          width="100%"
          placeholder="支持搜索插件名称"
          inputStyle={{ backgroundColor: 'gray.50' }}
          onSearch={() => {}}
        />
      </Flex>
      <Box flex="1" overflowY="auto">
        {renderPlugins()}
      </Box>
      <Pagination />
    </Flex>
  );
}
