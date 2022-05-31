import { Box, HStack } from '@chakra-ui/react';

// import BaseBox from '@/tkeel-console-plugin-admin-usage-statistics/components/BaseBox';
import ContentHeader from '@/tkeel-console-plugin-admin-usage-statistics/components/ContentHeader';

// import useTenantId from '@/tkeel-console-plugin-admin-usage-statistics/hooks/useTenantId';
import OverviewBox from './components/OverviewBox';
import OverviewBoxLabel from './components/OverviewBoxLabel';

export default function Overview() {
  // const tenantId = useTenantId();

  return (
    <Box>
      <ContentHeader title="概览" />
      <HStack spacing="8px">
        <OverviewBox>
          <OverviewBoxLabel>设备 (台)</OverviewBoxLabel>
        </OverviewBox>
        <OverviewBox>
          <OverviewBoxLabel>设备 (台)</OverviewBoxLabel>
        </OverviewBox>
        <OverviewBox>
          <OverviewBoxLabel>设备 (台)</OverviewBoxLabel>
        </OverviewBox>
      </HStack>
    </Box>
  );
}
