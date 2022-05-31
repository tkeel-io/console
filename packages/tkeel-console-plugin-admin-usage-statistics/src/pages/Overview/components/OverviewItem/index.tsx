import { Box, Flex } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import OverviewLabel from '../OverviewLabel';
import OverviewSubValue from '../OverviewSubValue';
import OverviewValue from '../OverviewValue';

interface Props {
  label: ReactNode;
  value: ReactNode;
  subValue?: ReactNode;
}

export default function OverviewItem({ label, value, subValue }: Props) {
  return (
    <Box flex="1">
      <OverviewLabel>{label}</OverviewLabel>
      <Flex alignItems="baseline">
        <OverviewValue>{value}</OverviewValue>
        <OverviewSubValue>{subValue}</OverviewSubValue>
      </Flex>
    </Box>
  );
}
