import { Skeleton } from '@chakra-ui/react';
import * as dayjs from 'dayjs';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  useCartesianGridProps,
  useLegendProps,
  useTooltipProps,
  useXAxisProps,
  useYAxisProps,
} from '@tkeel/console-charts';
import { useColor } from '@tkeel/console-hooks';
import { formatDateTimeByTimestamp, numeral } from '@tkeel/console-utils';

import usePrometheusTKMeterBatchQuery from '@/tkeel-console-plugin-admin-usage-statistics/hooks/queries/usePrometheusTKMeterBatchQuery';
import usePrometheusTKMeterQuery from '@/tkeel-console-plugin-admin-usage-statistics/hooks/queries/usePrometheusTKMeterQuery';
import { fillDataLast24Hours } from '@/tkeel-console-plugin-admin-usage-statistics/utils/data';
import { getQueryParamsLast24Hours } from '@/tkeel-console-plugin-admin-usage-statistics/utils/query';

import ChartContainer from './ChartContainer';

const params = getQueryParamsLast24Hours();

function getShowTime(timestamp: number) {
  return dayjs(timestamp - 1)
    .startOf('hour')
    .valueOf();
}

const TEMPLATE = 'HH:mm';

const HEIGHT = '184px';

export default function TimeChart() {
  const { isLoading: isSummaryLading, valueItem } = usePrometheusTKMeterQuery({
    params: { meter: 'avg_tkapi_request_latency_24h' },
  });
  const summaryValue = (valueItem?.value ?? 0) * 1000;

  const { isLoading: isChartLoading, valueItemsMap } =
    usePrometheusTKMeterBatchQuery({
      params: {
        ...params,
        meters: [
          'p95_tkapi_request_latency',
          'p99_tkapi_request_latency',
          'p999_tkapi_request_latency',
        ],
      },
    });
  const data = fillDataLast24Hours({
    data: valueItemsMap.p95_tkapi_request_latency,
  });
  const defaultXAxisProps = useXAxisProps();
  const defaultYAxisProps = useYAxisProps();
  const defaultCartesianGridProps = useCartesianGridProps();
  const defaultLegendProps = useLegendProps();
  const defaultTooltipProps = useTooltipProps();
  const fill = useColor('green.300');

  if (isSummaryLading || isChartLoading) {
    return <Skeleton height={HEIGHT} />;
  }

  return (
    <ChartContainer
      header={{
        name: '24 小时内 API 调用 平均耗时：',
        value: summaryValue,
        valueFormatter: '0,0.00',
        unit: '/ms',
      }}
    >
      <ResponsiveContainer>
        <AreaChart data={data} barCategoryGap="80%" margin={{ top: 15 }}>
          <XAxis
            {...defaultXAxisProps}
            dataKey="timestamp"
            tickLine={false}
            tickFormatter={(value: number) =>
              formatDateTimeByTimestamp({
                timestamp: getShowTime(value),
                template: TEMPLATE,
              })
            }
          />
          <YAxis
            {...defaultYAxisProps}
            dataKey="value"
            tickCount={5}
            allowDecimals={false}
            tickLine={false}
            tickFormatter={(value) => numeral.format({ input: value * 1000 })}
          />
          <CartesianGrid {...defaultCartesianGridProps} />
          <Legend
            {...defaultLegendProps}
            wrapperStyle={{ top: 0, right: 0, visibility: 'hidden' }}
          />
          <Area dataKey="value" fill={fill} />
          <Tooltip
            {...defaultTooltipProps}
            labelFormatter={(label: number) =>
              formatDateTimeByTimestamp({
                timestamp: getShowTime(label),
                template: TEMPLATE,
              })
            }
            formatter={(value: number) => {
              const res = numeral.format({
                input: value,
              });
              return [`${res} 次`, 'API 调用次数'];
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
