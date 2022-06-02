import { Box, VStack } from '@chakra-ui/react';

import ContentHeader from '@/tkeel-console-plugin-admin-usage-statistics/components/ContentHeader';

import Api from './components/Api';
// import useTenantId from '@/tkeel-console-plugin-admin-usage-statistics/hooks/useTenantId';
import Device from './components/Device';
import MessageStorage from './components/MessageStorage';
import MessageSubscription from './components/MessageSubscription';

export default function Overview() {
  // const tenantId = useTenantId();

  return (
    <Box>
      <ContentHeader title="概览" />
      <VStack width="full" spacing="24px">
        <Device />
        <MessageSubscription />
        <MessageStorage />
        <Api />
      </VStack>
    </Box>
  );
}
