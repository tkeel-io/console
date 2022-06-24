import { Skeleton } from '@chakra-ui/react';
import * as dayjs from 'dayjs';
import {
  Bar,
  BarChart,
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

import usePrometheusTKMeterQuery from '@/tkeel-console-plugin-admin-usage-statistics/hooks/queries/usePrometheusTKMeterQuery';
import { fillDataLast24Hours } from '@/tkeel-console-plugin-admin-usage-statistics/utils/data';
import { getQueryParamsLast24Hours } from '@/tkeel-console-plugin-admin-usage-statistics/utils/query';

import ChartContainer from './ChartContainer';
import { CHART_CONTAINER_STYLE } from './constants';

const params = getQueryParamsLast24Hours();

function getShowTime(timestamp: number) {
  return dayjs(timestamp - 1)
    .startOf('hour')
    .valueOf();
}

const TEMPLATE = 'HH:mm';

export default function FrequencyChart() {
  const defaultXAxisProps = useXAxisProps();
  const defaultYAxisProps = useYAxisProps();
  const defaultCartesianGridProps = useCartesianGridProps();
  const defaultLegendProps = useLegendProps();
  const defaultTooltipProps = useTooltipProps();
  const fill = useColor('green.300');

  const { isLoading: isSummaryLading, valueItem } = usePrometheusTKMeterQuery({
    params: { meter: 'sum_tkapi_request_24h' },
  });
  const summaryValue = valueItem?.value ?? 0;

  const { isLoading: isChartLoading, valueItems } = usePrometheusTKMeterQuery({
    params: { ...params, meter: 'sum_tkapi_request_1h' },
  });
  const data = fillDataLast24Hours({ data: valueItems });

  const isLoading = isSummaryLading || isChartLoading;

  if (isLoading) {
    return <Skeleton height="100%" />;
  }

  return (
    <ChartContainer
      header={{
        name: '24 小时内 API 调用总次数：',
        value: summaryValue,
        unit: '次',
      }}
      sx={CHART_CONTAINER_STYLE}
    >
      {valueItems.length > 0 ? (
        <ResponsiveContainer>
          <BarChart data={data} barCategoryGap="80%" margin={{ top: 15 }}>
            <XAxis
              {...defaultXAxisProps}
              dataKey="timestamp"
              tickFormatter={(value: number) =>
                formatDateTimeByTimestamp({
                  timestamp: getShowTime(value),
                  template: TEMPLATE,
                })
              }
            />
            <YAxis
              {...defaultYAxisProps}
              tickCount={5}
              allowDecimals={false}
              tickFormatter={(value: number) =>
                numeral.format({ input: value, formatter: '0 a' })
              }
            />
            <CartesianGrid {...defaultCartesianGridProps} />
            <Legend
              {...defaultLegendProps}
              wrapperStyle={{ top: 0, right: 0, visibility: 'hidden' }}
            />
            <Bar dataKey="value" fill={fill} />
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
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <Empty isFullHeight />
      )}
    </ChartContainer>
  );
}
