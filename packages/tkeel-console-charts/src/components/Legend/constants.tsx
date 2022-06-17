import { Text } from '@chakra-ui/react';
import type { CSSProperties } from 'react';
import type { LegendProps } from 'recharts';

interface Props {
  align: 'left' | 'center' | 'right';
  verticalAlign: 'top' | 'middle' | 'bottom';
  iconSize: number;
  iconType: LegendProps['iconType'];
  formatter: LegendProps['formatter'];
  wrapperStyle: CSSProperties;
}

export const DEFAULT_PROPS: Props = {
  align: 'right',
  verticalAlign: 'top',
  iconSize: 6,
  iconType: 'circle',
  formatter: (value) => (
    <Text display="inline" lineHeight="20px" fontSize="12px">
      {value}
    </Text>
  ),
  wrapperStyle: { top: 0, right: 0 },
};
