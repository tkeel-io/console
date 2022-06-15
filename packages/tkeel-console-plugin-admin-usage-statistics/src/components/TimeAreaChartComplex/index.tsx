import { Box } from '@chakra-ui/react';

import BaseBox from '../BaseBox';
import type { TimeAreaChartProps } from '../TimeAreaChart';
import TimeAreaChart from '../TimeAreaChart';
import type { TimeAreaChartHeaderProps } from '../TimeAreaChartHeader';
import TimeAreaChartHeader from '../TimeAreaChartHeader';

interface Props extends TimeAreaChartProps {
  header: TimeAreaChartHeaderProps;
}

export default function TimeAreaChartComplex({
  header,
  ...timeAreaChartProps
}: Props) {
  return (
    <BaseBox
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '308px',
        padding: '20px 0 16px 32px',
      }}
    >
      <Box padding="0 24px 8px">
        <TimeAreaChartHeader {...header} />
      </Box>
      <Box flex="1">
        <TimeAreaChart {...timeAreaChartProps} />
      </Box>
    </BaseBox>
  );
}
