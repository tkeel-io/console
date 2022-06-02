import { Box, HStack } from '@chakra-ui/react';

import BaseBox from '@/tkeel-console-plugin-admin-usage-statistics/components/BaseBox';

import ModuleHeader from '../ModuleHeader';
import MessageStorageItem from './MessageStorageItem';

export default function MessageStorage() {
  return (
    <Box width="100%">
      <ModuleHeader
        title="消息订阅"
        description="平台消息吞吐"
        link="../message"
      />
      <BaseBox sx={{ padding: '24px 32px 0 32px' }}>
        <HStack spacing="44px">
          <MessageStorageItem title="历史存储">1</MessageStorageItem>
          <MessageStorageItem title="时序数据库存储">1</MessageStorageItem>
          <MessageStorageItem title="时序数据库使用统计">1</MessageStorageItem>
        </HStack>
      </BaseBox>
    </Box>
  );
}
