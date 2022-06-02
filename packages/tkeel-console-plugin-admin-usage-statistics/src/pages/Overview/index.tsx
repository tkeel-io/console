import { Box, VStack } from '@chakra-ui/react';

// import BaseBox from '@/tkeel-console-plugin-admin-usage-statistics/components/BaseBox';
import ContentHeader from '@/tkeel-console-plugin-admin-usage-statistics/components/ContentHeader';

// import useTenantId from '@/tkeel-console-plugin-admin-usage-statistics/hooks/useTenantId';
import Device from './components/Device';
import MessageSubscription from './components/MessageSubscription';

export default function Overview() {
  // const tenantId = useTenantId();

  return (
    <Box>
      <ContentHeader title="概览" />
      <VStack width="full" spacing="24px">
        <Device />
        <MessageSubscription />
      </VStack>
    </Box>
  );
}
