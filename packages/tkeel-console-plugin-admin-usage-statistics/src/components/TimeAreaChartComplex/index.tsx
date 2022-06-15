import { Box, Skeleton } from '@chakra-ui/react';

import BaseBox from '../BaseBox';
import type { TimeAreaChartProps } from '../TimeAreaChart';
import TimeAreaChart from '../TimeAreaChart';
import type { TimeAreaChartHeaderProps } from '../TimeAreaChartHeader';
import TimeAreaChartHeader from '../TimeAreaChartHeader';

interface Props extends TimeAreaChartProps {
  isLoading?: boolean;
  header: TimeAreaChartHeaderProps;
}

const HEIGHT = '308px';

export default function TimeAreaChartComplex({
  isLoading,
  header,
  ...timeAreaChartProps
}: Props) {
  if (isLoading) {
    return <Skeleton height={HEIGHT} />;
  }

  return (
    <BaseBox
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: HEIGHT,
        padding: '20px 32px 16px 0',
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
