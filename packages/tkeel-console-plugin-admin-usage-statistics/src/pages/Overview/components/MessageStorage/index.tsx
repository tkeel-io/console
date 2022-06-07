import { Box, Flex, HStack, Text } from '@chakra-ui/react';

import { Tips } from '@tkeel/console-components';

import BaseBox from '@/tkeel-console-plugin-admin-usage-statistics/components/BaseBox';

import ModuleHeader from '../ModuleHeader';
import Block from './Block';
import MessageStorageItem from './MessageStorageItem';

export default function MessageStorage() {
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
              <Block label="历史消息存储 (天)" value="7" />
              <Block label="日存储量 (条)" value="7" />
            </HStack>
          </MessageStorageItem>
          <MessageStorageItem
            title="时序数据库存储"
            sx={{ paddingBottom: '28px' }}
          >
            <HStack spacing="12px">
              <Block label="时序可用存储空间" value="1T" />
              <Block
                label={
                  <Flex alignItems="center">
                    <Text paddingRight="4px">使用占比</Text>
                    <Tips label="请注意使用占比，超过 80% 后需要扩容" />
                  </Flex>
                }
                value="7"
              />
            </HStack>
          </MessageStorageItem>
          <MessageStorageItem title="时序数据库使用统计">
            <Box>1</Box>
          </MessageStorageItem>
        </HStack>
      </BaseBox>
    </Box>
  );
}
