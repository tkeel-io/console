import { Skeleton } from '@chakra-ui/react';
import { find } from 'lodash';
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
import { Empty } from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';
import { formatDateTimeByTimestamp, numeral } from '@tkeel/console-utils';

import usePrometheusTKMeterBatchQuery from '@/tkeel-console-plugin-admin-usage-statistics/hooks/queries/usePrometheusTKMeterBatchQuery';
import usePrometheusTKMeterQuery from '@/tkeel-console-plugin-admin-usage-statistics/hooks/queries/usePrometheusTKMeterQuery';
import { TimestampItem } from '@/tkeel-console-plugin-admin-usage-statistics/types/query';
import { getQueryParamsLast24Hours } from '@/tkeel-console-plugin-admin-usage-statistics/utils/query';

import ChartContainer from './ChartContainer';

const params = getQueryParamsLast24Hours();

const TEMPLATE = 'HH:mm';

const HEIGHT = '184px';

export default function TimeChart() {
  const areas = [
    {
      meter: 'p95_tkapi_request_latency',
      fill: useColor('green.50'),
      stroke: useColor('green.300'),
      label: 'P95',
    },
    {
      meter: 'p99_tkapi_request_latency',
      fill: useColor('blue.50'),
      stroke: useColor('blue.300'),
      label: 'P99',
    },
    {
      meter: 'p999_tkapi_request_latency',
      fill: useColor('orange.50'),
      stroke: useColor('orange.300'),
      label: 'P99.9',
    },
  ];

  const defaultXAxisProps = useXAxisProps();
  const defaultYAxisProps = useYAxisProps();
  const defaultCartesianGridProps = useCartesianGridProps();
  const defaultLegendProps = useLegendProps();
  const defaultTooltipProps = useTooltipProps();

  const { isLoading: isSummaryLading, valueItem } = usePrometheusTKMeterQuery({
    params: { meter: 'avg_tkapi_request_latency_24h' },
  });
  const summaryValue = (valueItem?.value ?? 0) * 1000;

  const { isLoading: isChartLoading, timestampItems } =
    usePrometheusTKMeterBatchQuery({
      params: {
        ...params,
        step: '10m',
        meters: areas.map(({ meter }) => meter),
      },
    });
  const data = timestampItems.map(({ timestamp, ...rest }) => {
    const item: TimestampItem = { timestamp };
    Object.entries(rest).forEach(([key, value]) => {
      item[key] = value * 1000;
    });

    return item;
  });

  if (isSummaryLading || isChartLoading) {
    return <Skeleton height={HEIGHT} />;
  }

  return (
    <ChartContainer
      header={{
        name: '24 小时内 API 调用平均耗时：',
        value: summaryValue,
        valueFormatter: '0,0.00',
        unit: 'ms',
      }}
      sx={{ height: HEIGHT, padding: '16px 16px 0' }}
    >
      {data.length > 0 ? (
        <ResponsiveContainer>
          <AreaChart data={data} barCategoryGap="80%" margin={{ top: 15 }}>
            <XAxis
              {...defaultXAxisProps}
              dataKey="timestamp"
              tickLine={false}
              tickFormatter={(value: number) =>
                formatDateTimeByTimestamp({
                  timestamp: value,
                  template: TEMPLATE,
                })
              }
            />
            <YAxis
              {...defaultYAxisProps}
              allowDecimals={false}
              tickLine={false}
              tickFormatter={(value: number) =>
                numeral.format({ input: value })
              }
            />
            <CartesianGrid {...defaultCartesianGridProps} />
            <Legend
              {...defaultLegendProps}
              formatter={(value: string) => {
                const area = find(areas, { meter: value });
                return area?.label ?? '';
              }}
            />
            {areas.map(({ meter, fill, stroke }) => (
              <Area
                key={meter}
                dataKey={meter}
                fill={fill}
                fillOpacity={0.3}
                stroke={stroke}
              />
            ))}
            <Tooltip
              {...defaultTooltipProps}
              labelFormatter={(label: number) =>
                formatDateTimeByTimestamp({
                  timestamp: label,
                  template: TEMPLATE,
                })
              }
              formatter={(value: number, name: string) => {
                const area = find(areas, { meter: name });
                const res = numeral.format({
                  input: value,
                  formatter: '0,0.00',
                });
                return [`${res} ms`, area?.label];
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <Empty isFullHeight />
      )}
    </ChartContainer>
  );
}
