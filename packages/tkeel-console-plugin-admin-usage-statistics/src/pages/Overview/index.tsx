import { Box } from '@chakra-ui/react';

import BaseBox from '@/tkeel-console-plugin-admin-usage-statistics/components/BaseBox';
import ContentHeader from '@/tkeel-console-plugin-admin-usage-statistics/components/ContentHeader';

export default function Overview() {
  return (
    <Box>
      <ContentHeader title="概览" />
      <BaseBox>123</BaseBox>
    </Box>
  );
}
