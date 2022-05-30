import { Box } from '@chakra-ui/react';

import BaseBox from '@/tkeel-console-plugin-admin-usage-statistics/components/BaseBox';
import ContentHeader from '@/tkeel-console-plugin-admin-usage-statistics/components/ContentHeader';
import useTenantId from '@/tkeel-console-plugin-admin-usage-statistics/hooks/useTenantId';

export default function Overview() {
  const tenantId = useTenantId();

  return (
    <Box>
      <ContentHeader title="API 调用统计" />
      <BaseBox>{tenantId}</BaseBox>
    </Box>
  );
}
