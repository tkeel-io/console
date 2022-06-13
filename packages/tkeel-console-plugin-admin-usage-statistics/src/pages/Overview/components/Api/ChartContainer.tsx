import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import ChartHeader from './ChartHeader';

interface Props {
  header: {
    name: string;
    value: number;
    valueFormatter?: boolean | string;
    unit: string;
  };
  children: ReactNode;
}

export default function ChartContainer({ header, children }: Props) {
  return (
    <Box position="relative">
      <ChartHeader {...header} sx={{ position: 'absolute', top: 0, left: 0 }} />
      {children}
    </Box>
  );
}
