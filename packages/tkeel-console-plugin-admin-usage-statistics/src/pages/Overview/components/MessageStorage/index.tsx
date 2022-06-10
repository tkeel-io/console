import { Box, Flex, HStack, Text } from '@chakra-ui/react';

import { Tips } from '@tkeel/console-components';

import BaseBox from '@/tkeel-console-plugin-admin-usage-statistics/components/BaseBox';
import usePrometheusTKMeterBatchQuery from '@/tkeel-console-plugin-admin-usage-statistics/hooks/queries/usePrometheusTKMeterBatchQuery';
import { findValueInResults } from '@/tkeel-console-plugin-admin-usage-statistics/utils/query';

import ModuleHeader from '../ModuleHeader';
import Block from './Block';
import Chart from './Chart';
import MessageStorageItem from './MessageStorageItem';

const METERS = [
  'msg_storage_days',
  'core_msg_days',
  'msg_storage_space_unused_bytes',
  'msg_storage_space_usage_percentage',
];

export default function MessageStorage() {
  const { isLoading, results } = usePrometheusTKMeterBatchQuery({
    params: { meters: METERS },
    isWithTenantId: false,
  });

  const [
    msgStorageDays,
    coreMSgDays,
    msgStorageSpaceUnusedBytes,
    msgStorageSpaceUsagePercentage,
  ] = METERS.map((query) => findValueInResults({ data: results, query }));

  return (
    <Box width="100%">
      <ModuleHeader
        title="消息存储"
        description="平台消息存储"
        link="../message"
      />
      <BaseBox sx={{ padding: '24px 32px 0 32px' }}>
        <HStack spacing="44px">
          <MessageStorageItem title="历史存储" sx={{ paddingBottom: '28px' }}>
            <HStack spacing="12px">
              <Block
                label="历史消息存储 (天)"
                value={msgStorageDays}
                isLoading={isLoading}
              />
              <Block
                label="24 小时存储量 (条)"
                value={coreMSgDays}
                isLoading={isLoading}
              />
            </HStack>
          </MessageStorageItem>
          <MessageStorageItem
            title="时序数据库存储"
            sx={{ paddingBottom: '28px' }}
          >
            <HStack spacing="12px">
              <Block
                label="时序可用存储空间"
                value={msgStorageSpaceUnusedBytes}
                valueFormatter="0.00 b"
                isLoading={isLoading}
              />
              <Block
                label={
                  <Flex alignItems="center">
                    <Text paddingRight="4px">使用占比</Text>
                    <Tips label="请注意使用占比，超过 80% 后需要扩容" />
                  </Flex>
                }
                value={msgStorageSpaceUsagePercentage / 100}
                valueFormatter="0%"
                isLoading={isLoading}
              />
            </HStack>
          </MessageStorageItem>
          <MessageStorageItem title="时序数据库使用统计">
            <Box height="92px">
              <Chart />
            </Box>
          </MessageStorageItem>
        </HStack>
      </BaseBox>
    </Box>
  );
}
