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
    return <Skeleton width="100%" height={HEIGHT} />;
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
      <Box position="relative" marginLeft="24px">
        <TimeAreaChartHeader
          {...header}
          sx={{ position: 'absolute', top: 0, left: 0 }}
        />
      </Box>
      <TimeAreaChart {...timeAreaChartProps} />
    </BaseBox>
  );
}
