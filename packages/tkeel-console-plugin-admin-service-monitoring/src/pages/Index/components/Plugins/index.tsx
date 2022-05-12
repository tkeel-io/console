import { Center, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';

import {
  Empty,
  Loading,
  MoreActionSelect,
  SearchInput,
} from '@tkeel/console-components';

import useMonitorPluginsQuery from '@/tkeel-console-plugin-admin-service-monitoring/hooks/queries/useMonitorPluginsQuery';

export default function Index() {
  const { isLoading, plugins } = useMonitorPluginsQuery();

  const [status, setStatus] = useState('0');

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

  return (
    <Flex
      flexDirection="column"
      flex="1"
      backgroundColor="gray.100"
      boxShadow="0px 8px 8px rgba(152, 163, 180, 0.1);"
      borderRadius="4px"
    >
      <Flex margin="16px 20px">
        <Flex paddingRight="16px">
          <Center>
            <Text whiteSpace="nowrap" fontSize="14px">
              状态：
            </Text>
          </Center>
          <MoreActionSelect
            options={[
              { value: '0', label: '全部' },
              { value: '1', label: '运行中' },
              { value: '2', label: '更新中' },
              { value: '3', label: '已停止' },
            ]}
            value={status}
            onChange={setStatus}
            styles={{ element: { width: '75px', backgroundColor: 'gray.50' } }}
          />
        </Flex>

        <SearchInput
          width="100%"
          inputStyle={{ backgroundColor: 'gray.50' }}
          onSearch={() => {}}
        />
      </Flex>
    </Flex>
  );
}
