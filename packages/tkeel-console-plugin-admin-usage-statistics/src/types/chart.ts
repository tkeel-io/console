import type { TimeAreaChartProps } from '@/tkeel-console-plugin-admin-usage-statistics/components/TimeAreaChart';
import type { TimeAreaChartHeaderProps } from '@/tkeel-console-plugin-admin-usage-statistics/components/TimeAreaChartHeader';

interface ChartItem extends Omit<TimeAreaChartProps, 'data'> {
  key: number | string;
  header: TimeAreaChartHeaderProps;
}

export type { ChartItem };
