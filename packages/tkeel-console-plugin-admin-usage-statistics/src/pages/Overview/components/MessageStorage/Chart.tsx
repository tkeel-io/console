import { Skeleton } from '@chakra-ui/react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  useCartesianGridProps,
  useTooltipProps,
  useXAxisProps,
  useYAxisProps,
} from '@tkeel/console-charts';
import { useColor } from '@tkeel/console-hooks';
import { formatDateTimeByTimestamp, numeral } from '@tkeel/console-utils';

import usePrometheusTKMeterQuery from '@/tkeel-console-plugin-admin-usage-statistics/hooks/queries/usePrometheusTKMeterQuery';
import { fillDataLast7Days } from '@/tkeel-console-plugin-admin-usage-statistics/utils/data';
import { getQueryParamsLast7Days } from '@/tkeel-console-plugin-admin-usage-statistics/utils/query';

const params = getQueryParamsLast7Days();

export default function Chart() {
  const fill = useColor('green.300');

  const { isLoading, valueItems } = usePrometheusTKMeterQuery({
    params: { ...params, meter: 'core_msg_days' },
  });
  const data = fillDataLast7Days({ data: valueItems });
  const defaultXAxisProps = useXAxisProps();
  const defaultYAxisProps = useYAxisProps();
  const defaultCartesianGridProps = useCartesianGridProps();
  const defaultTooltipProps = useTooltipProps();

  if (isLoading) {
    return <Skeleton height="100%" />;
  }

  return (
    <ResponsiveContainer>
      <BarChart data={data} barCategoryGap="80%">
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
        <XAxis
          {...defaultXAxisProps}
          xAxisId={1}
          orientation="top"
          height={1}
          tickLine={false}
          tick={false}
        />
        <YAxis
          {...defaultYAxisProps}
          dataKey="value"
          tickCount={3}
          allowDecimals={false}
          tickLine={false}
          tickFormatter={(value) => numeral.format({ input: value as number })}
        />
        <YAxis
          {...defaultYAxisProps}
          yAxisId={1}
          orientation="right"
          width={1}
          tickLine={false}
          tick={false}
        />
        <CartesianGrid {...defaultCartesianGridProps} horizontal={false} />
        <Bar dataKey="value" fill={fill} />
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
            return [`${res} 条`, '消息量'];
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
