import { Box, HStack } from '@chakra-ui/react';

import ModuleHeader from '../ModuleHeader';
import MessageSubscriptionBox from './MessageSubscriptionBox';

export default function MessageStorage() {
  return (
    <Box width="100%">
      <ModuleHeader
        title="消息存储"
        description="平台消息存储"
        link="../message"
      />
      <HStack spacing="12px">
        <MessageSubscriptionBox title="上行消息 (条)">1</MessageSubscriptionBox>
        <MessageSubscriptionBox title="下行消息 (条)">2</MessageSubscriptionBox>
        <MessageSubscriptionBox title="订阅消息 (条)">3</MessageSubscriptionBox>
      </HStack>
    </Box>
  );
}
