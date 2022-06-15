import { Skeleton } from '@chakra-ui/react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  useTooltipProps,
  useXAxisProps,
  useYAxisProps,
} from '@tkeel/console-charts';
import { Empty } from '@tkeel/console-components';
import { formatDateTimeByTimestamp, numeral } from '@tkeel/console-utils';

import type { ValueItem } from '@/tkeel-console-plugin-admin-usage-statistics/types/query';
import { fillDataLast7Days } from '@/tkeel-console-plugin-admin-usage-statistics/utils/data';

interface Props {
  data: ValueItem[];
  isLoading?: boolean;
  barColor: string;
}

export default function Chart({ data, isLoading, barColor }: Props) {
  const newData = fillDataLast7Days({ data });
  const defaultXAxisProps = useXAxisProps();
  const defaultYAxisProps = useYAxisProps();
  const defaultTooltipProps = useTooltipProps();

  if (isLoading) {
    return <Skeleton height="100%" />;
  }

  if (data.length === 0) {
    return <Empty isFullHeight />;
  }

  return (
    <ResponsiveContainer>
      <BarChart
        data={newData}
        margin={{ top: 18, right: 30, bottom: 10 }}
        barCategoryGap="80%"
      >
        <XAxis
          {...defaultXAxisProps}
          dataKey="timestamp"
          tickLine={false}
          tickFormatter={(value) =>
            formatDateTimeByTimestamp({
              timestamp: value - 1,
              template: 'MM-DD',
            })
          }
        />
        <YAxis
          {...defaultYAxisProps}
          tickCount={7}
          allowDecimals={false}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) =>
            numeral.format({ input: value as number, formatter: '0 a' })
          }
        />
        <Bar dataKey="value" fill={barColor} />
        <Tooltip
          {...defaultTooltipProps}
          labelFormatter={(label: number) =>
            formatDateTimeByTimestamp({
              timestamp: label - 1,
              template: 'YYYY-MM-DD',
            })
          }
          formatter={(value: number) => {
            const res = numeral.format({
              input: value,
            });
            return [`${res} 条`, '上行消息'];
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
