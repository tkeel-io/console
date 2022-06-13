import type { CSSProperties } from 'react';
import type { LegendType } from 'recharts';

interface Props {
  align: 'left' | 'center' | 'right';
  verticalAlign: 'top' | 'middle' | 'bottom';
  iconSize: number;
  iconType: Omit<LegendType, 'none'>;
  wrapperStyle: CSSProperties;
}

export const DEFAULT_PROPS: Props = {
  align: 'right',
  verticalAlign: 'top',
  iconSize: 6,
  iconType: 'circle',
  wrapperStyle: { top: 0, right: 0 },
};
