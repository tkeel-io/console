import type { StyleProps } from '@chakra-ui/react';
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
  sx?: StyleProps;
}

export default function ChartContainer({ header, children, sx }: Props) {
  return (
    <Box {...sx}>
      <Box position="relative">
        <ChartHeader
          {...header}
          sx={{ position: 'absolute', top: 0, left: 0 }}
        />
        {children}
      </Box>
    </Box>
  );
}
