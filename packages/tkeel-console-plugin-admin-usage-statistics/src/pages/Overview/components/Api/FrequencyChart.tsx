import * as dayjs from 'dayjs';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import {
  Tooltip,
  useCartesianGridProps,
  useXAxisProps,
  useYAxisProps,
} from '@tkeel/console-charts';
import { useColor } from '@tkeel/console-hooks';
import { formatDateTimeByTimestamp, numeral } from '@tkeel/console-utils';

import usePrometheusTKMeterQuery from '@/tkeel-console-plugin-admin-usage-statistics/hooks/queries/usePrometheusTKMeterQuery';
import { fillDataLast24Hours } from '@/tkeel-console-plugin-admin-usage-statistics/utils/data';
import { getQueryParamsLast24Hours } from '@/tkeel-console-plugin-admin-usage-statistics/utils/query';

import ChartContainer from './ChartContainer';

const params = getQueryParamsLast24Hours();

export default function FrequencyChart() {
  const { valueItem } = usePrometheusTKMeterQuery({
    params: { meter: 'sum_tkapi_request_24h' },
  });
  const sum = valueItem?.value ?? 0;

  const { valueItems } = usePrometheusTKMeterQuery({
    params: { ...params, meter: 'sum_tkapi_request_1h' },
  });
  const data = fillDataLast24Hours({ data: valueItems });
  const defaultXAxisProps = useXAxisProps();
  const defaultYAxisProps = useYAxisProps();
  const defaultCartesianGridProps = useCartesianGridProps();
  const fill = useColor('green.300');

  return (
    <ChartContainer
      header={{
        name: '24 小时内 API 调用总次数：',
        value: sum,
        unit: '次',
      }}
    >
      <ResponsiveContainer>
        <BarChart data={data} barCategoryGap="80%" margin={{ top: 15 }}>
          <XAxis
            {...defaultXAxisProps}
            dataKey="timestamp"
            tickLine={false}
            tickFormatter={(value: number) =>
              formatDateTimeByTimestamp({
                timestamp: dayjs(value - 1)
                  .startOf('hour')
                  .valueOf(),
                template: 'HH:mm',
              })
            }
          />
          <YAxis
            {...defaultYAxisProps}
            dataKey="value"
            tickCount={5}
            allowDecimals={false}
            tickLine={false}
            tickFormatter={(value) =>
              numeral.format({ input: value as number })
            }
          />
          <CartesianGrid {...defaultCartesianGridProps} />
          <Legend
            align="right"
            verticalAlign="top"
            iconSize={6}
            iconType="circle"
            wrapperStyle={{ top: 0, right: 0 }}
          />
          <Bar dataKey="value" fill={fill} />
          <Tooltip
            labelFormatter={(label: number) =>
              formatDateTimeByTimestamp({
                timestamp: dayjs(label - 1)
                  .startOf('hour')
                  .valueOf(),
                template: 'HH:mm',
              })
            }
            formatter={(value: number) => {
              const res = numeral.format({
                input: value,
              });
              return [`${res} 次`, 'API 调用次数'];
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
