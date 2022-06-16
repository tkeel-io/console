import type { TimeAreaChartProps } from '@/tkeel-console-plugin-admin-usage-statistics/components/TimeAreaChart';
import type { TimeAreaChartHeaderProps } from '@/tkeel-console-plugin-admin-usage-statistics/components/TimeAreaChartHeader';

interface ChartItem {
  key: number | string;
  header: TimeAreaChartHeaderProps;
  dataKeys: TimeAreaChartProps['dataKeys'];
  areaChart?: TimeAreaChartProps['areaChart'];
}

export type { ChartItem };
