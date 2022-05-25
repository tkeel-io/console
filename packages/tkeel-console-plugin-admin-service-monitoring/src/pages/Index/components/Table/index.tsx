import { Box, Center, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';

import {
  MoreActionSelect,
  Pagination,
  SearchInput,
} from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';

import { getPluginStatusInfos } from '@/tkeel-console-plugin-admin-service-monitoring/constants/plugins';
import type { RequestParams } from '@/tkeel-console-plugin-admin-service-monitoring/hooks/queries/useMonitoringPluginsQuery';
import useMonitoringPluginsQuery from '@/tkeel-console-plugin-admin-service-monitoring/hooks/queries/useMonitoringPluginsQuery';
import useMonitoringPluginsStatusQuery from '@/tkeel-console-plugin-admin-service-monitoring/hooks/queries/useMonitoringPluginsStatusQuery';
import type { PluginStatus } from '@/tkeel-console-plugin-admin-service-monitoring/types';

import Plugins from '../Plugins';

type PluginStatusWithAll = 'ALL' | PluginStatus;

const ALL_STATUS = 'ALL';

export default function Table() {
  const statusInfos = getPluginStatusInfos();

  const [keywords, setKeywords] = useState('');
  const [status, setStatus] = useState<PluginStatusWithAll>(ALL_STATUS);

  const pagination = usePagination();
  const { pageNum, pageSize, setTotalSize, setPageNum } = pagination;

  let params: RequestParams = {
    page_num: pageNum,
    page_size: pageSize,
    order_by: 'updateTime',
  };
  if (keywords) {
    params = { ...params, name: keywords };
  }
  if (status !== ALL_STATUS) {
    params = { ...params, status };
  }
  const { isLoading, isSuccess, total, plugins } = useMonitoringPluginsQuery({
    params,
  });
  if (isSuccess) {
    setTotalSize(total);
  }

  const { statusItems } = useMonitoringPluginsStatusQuery({
    refetchInterval: 5000,
  });

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
        <Plugins
          isLoading={isLoading}
          data={plugins}
          statusItems={statusItems}
        />
      </Box>
      <Pagination
        {...pagination}
        styles={{
          wrapper: {
            backgroundColor: 'gray.50',
          },
        }}
      />
    </Flex>
  );
}
