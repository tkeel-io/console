import { Box, VStack } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import ContentHeader from '@/tkeel-console-plugin-admin-usage-statistics/components/ContentHeader';

interface Props {
  title: string;
  children: ReactNode;
}

export default function ChartsPage({ title, children }: Props) {
  return (
    <Box>
      <ContentHeader title={title} />
      <VStack spacing="12px">{children}</VStack>
    </Box>
  );
}
