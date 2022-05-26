import { Box, Flex } from '@chakra-ui/react';

import { PageHeader, SegmentedControl } from '@tkeel/console-components';
import { ServerNodeTwoToneIcon } from '@tkeel/console-icons';

const OPTIONS = [
  { value: 'overview', label: '概览' },
  { value: 'message', label: '消息数据统计' },
  { value: 'usage', label: '使用数据统计' },
  { value: 'api', label: 'API 调用统计' },
];

export default function Index() {
  // TODO: need docs

  return (
    <Flex flexDirection="column" flex="1" overflowY="hidden">
      <PageHeader
        icon={<ServerNodeTwoToneIcon />}
        name="用量统计"
        desc="了解资源使用情况，查询实时性能指标"
      />
      <Box padding="12px 0 14px">
        <SegmentedControl options={OPTIONS} defaultValue="overview" />
      </Box>
      <Flex flexDirection="column" flex="1" overflowY="hidden">
        1
      </Flex>
    </Flex>
  );
}
