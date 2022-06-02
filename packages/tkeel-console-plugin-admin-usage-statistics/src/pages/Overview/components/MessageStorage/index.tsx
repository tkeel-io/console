import { Box, HStack } from '@chakra-ui/react';

import ModuleHeader from '../ModuleHeader';

export default function MessageSubscription() {
  return (
    <Box width="100%">
      <ModuleHeader
        title="消息订阅"
        description="平台消息吞吐"
        link="../message"
      />
      <HStack spacing="8px">1</HStack>
    </Box>
  );
}
