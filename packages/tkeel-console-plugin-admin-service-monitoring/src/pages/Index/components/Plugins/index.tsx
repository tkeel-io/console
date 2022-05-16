import { Box, Center, Flex, Text, useTheme } from '@chakra-ui/react';
import { useState } from 'react';

import {
  Empty,
  Loading,
  MoreActionSelect,
  Pagination,
  SearchInput,
} from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';
import type { Theme } from '@tkeel/console-themes';

import { getPluginStatusInfos } from '@/tkeel-console-plugin-admin-service-monitoring/constants/plugins';
import type { RequestParams } from '@/tkeel-console-plugin-admin-service-monitoring/hooks/queries/useMonitorPluginsQuery';
import useMonitorPluginsQuery from '@/tkeel-console-plugin-admin-service-monitoring/hooks/queries/useMonitorPluginsQuery';
import type { PluginStatus } from '@/tkeel-console-plugin-admin-service-monitoring/types';

import Plugin from '../Plugin';

type PluginStatusWithAll = 'ALL' | PluginStatus;

const ALL_STATUS = 'ALL';

export default function Plugins() {
  const { colors } = useTheme<Theme>();
  const statusInfos = getPluginStatusInfos({ colors });

  const [keywords, setKeywords] = useState('');
  const [status, setStatus] = useState<PluginStatusWithAll>(ALL_STATUS);

  const pagination = usePagination();
  const { pageNum, pageSize, setTotalSize, setPageNum } = pagination;

  let params: RequestParams = {
    page_num: pageNum,
    page_size: pageSize,
  };
  if (keywords) {
    params = { ...params, name: keywords };
  }
  if (status !== ALL_STATUS) {
    params = { ...params, status };
  }
  const { isLoading, isSuccess, total, plugins } = useMonitorPluginsQuery({
    params,
  });
  if (isSuccess) {
    setTotalSize(total);
  }

  const renderPlugins = () => {
    if (isLoading) {
      return (
        <Center height="100%">
          <Loading />
        </Center>
      );
    }

    if (!(plugins?.length > 0)) {
      return (
        <Center height="100%">
          <Empty />
        </Center>
      );
    }

    return (
      <Box padding="0 20px">
        {plugins.map((data) => {
          const { uid } = data.metadata;
          return (
            <Box key={uid} paddingBottom="12px">
              <Plugin data={data} />
            </Box>
          );
        })}
      </Box>
    );
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
            options={[{ value: 'ALL', label: '全部' }, ...statusInfos]}
            value={status}
            onChange={(value) => {
              setStatus(value as PluginStatusWithAll);
              setPageNum(1);
            }}
            styles={{ element: { width: '75px', backgroundColor: 'gray.50' } }}
          />
        </Flex>
        <SearchInput
          width="100%"
          placeholder="支持搜索插件名称"
          inputStyle={{ backgroundColor: 'gray.50' }}
          onSearch={(value) => {
            setKeywords(value);
            setPageNum(1);
          }}
        />
      </Flex>
      <Box flex="1" overflowY="auto">
        {renderPlugins()}
      </Box>
      <Pagination {...pagination} />
    </Flex>
  );
}
