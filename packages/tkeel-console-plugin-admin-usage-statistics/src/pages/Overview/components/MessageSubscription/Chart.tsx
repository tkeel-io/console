import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { Tooltip, useAxisProps } from '@tkeel/console-charts';
import { formatDateTimeByTimestamp, numeral } from '@tkeel/console-utils';

import type { ValueItem } from '@/tkeel-console-plugin-admin-usage-statistics/types/query';
import { fillDataLast7Days } from '@/tkeel-console-plugin-admin-usage-statistics/utils/data';

interface Props {
  data: ValueItem[];
  barColor: string;
}

export default function Chart({ data, barColor }: Props) {
  const newData = fillDataLast7Days({ data });
  const defaultAxisProps = useAxisProps();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={newData}
        margin={{
          top: 20,
          right: 32,
          bottom: 16,
          left: 0,
        }}
        barCategoryGap="80%"
      >
        <XAxis
          {...defaultAxisProps}
          dataKey="timestamp"
          tickLine={false}
          tickFormatter={(value) =>
            formatDateTimeByTimestamp({
              timestamp: value as number,
              template: 'MM-DD',
            })
          }
        />
        <YAxis
          {...defaultAxisProps}
          dataKey="value"
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => numeral.format({ input: value as number })}
        />
        <Bar dataKey="value" fill={barColor} />
        <Tooltip
          label="上行消息 (条)"
          labelFormatter={(label: number) =>
            formatDateTimeByTimestamp({
              timestamp: label,
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
