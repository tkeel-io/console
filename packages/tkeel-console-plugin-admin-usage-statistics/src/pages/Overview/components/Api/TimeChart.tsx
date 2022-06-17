import { Skeleton } from '@chakra-ui/react';

import { useColors } from '@tkeel/console-hooks';
import { numeral } from '@tkeel/console-utils';

import TimeAreaChart from '@/tkeel-console-plugin-admin-usage-statistics/components/TimeAreaChart';
import usePrometheusTKMeterBatchQuery from '@/tkeel-console-plugin-admin-usage-statistics/hooks/queries/usePrometheusTKMeterBatchQuery';
import usePrometheusTKMeterQuery from '@/tkeel-console-plugin-admin-usage-statistics/hooks/queries/usePrometheusTKMeterQuery';
import { getHourTimestamp } from '@/tkeel-console-plugin-admin-usage-statistics/utils/data';
import { getQueryParamsLast24HoursPer5Mins } from '@/tkeel-console-plugin-admin-usage-statistics/utils/query';

import ChartContainer from './ChartContainer';
import { CHART_CONTAINER_STYLE } from './constants';

const params = getQueryParamsLast24HoursPer5Mins();

function valueFormatter(value: number) {
  return value * 1000;
}

export default function TimeChart() {
  const colors = useColors();
  const dataKeys = [
    {
      key: 'p95_tkapi_request_latency',
      label: 'P95',
      fill: colors.green[50],
      stroke: colors.green[300],
    },
    {
      key: 'p99_tkapi_request_latency',
      label: 'P99',
      fill: colors.blue[50],
      stroke: colors.blue[300],
    },
    {
      key: 'p999_tkapi_request_latency',
      label: 'P99.9',
      fill: colors.orange[50],
      stroke: colors.orange[300],
    },
  ];

  const { isLoading: isSummaryLading, valueItem } = usePrometheusTKMeterQuery({
    params: { meter: 'avg_tkapi_request_latency_24h' },
  });
  const summaryValue = valueFormatter(valueItem?.value ?? 0);

  const { isLoading: isChartLoading, timestampItems } =
    usePrometheusTKMeterBatchQuery({
      params: {
        ...params,
        meters: dataKeys.map(({ key }) => key),
      },
    });
  const isLoading = isSummaryLading || isChartLoading;

  if (isLoading) {
    return <Skeleton height="100%" />;
  }

  return (
    <ChartContainer
      header={{
        name: '24 小时内 API 调用平均耗时：',
        value: summaryValue,
        valueFormatter: '0,0.00',
        unit: 'ms',
      }}
      sx={CHART_CONTAINER_STYLE}
    >
      <TimeAreaChart
        data={timestampItems}
        dataKeys={dataKeys}
        valueFormatter={valueFormatter}
        xAxis={{
          ticks: getHourTimestamp({
            startTimestamp: params.st,
            endTimestamp: params.et,
          }),
        }}
        yAxis={{
          tickFormatter: (value: number) => numeral.format({ input: value }),
        }}
        tooltip={{ formatterString: '0,0.00' }}
      />
    </ChartContainer>
  );
}
