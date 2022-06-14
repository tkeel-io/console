import { Skeleton } from '@chakra-ui/react';

import { useColor } from '@tkeel/console-hooks';

import TimeAreaChart from '@/tkeel-console-plugin-admin-usage-statistics/components/TimeAreaChart';
import usePrometheusTKMeterBatchQuery from '@/tkeel-console-plugin-admin-usage-statistics/hooks/queries/usePrometheusTKMeterBatchQuery';
import usePrometheusTKMeterQuery from '@/tkeel-console-plugin-admin-usage-statistics/hooks/queries/usePrometheusTKMeterQuery';
import { formatTimestampItems } from '@/tkeel-console-plugin-admin-usage-statistics/utils/data';
import { getQueryParamsLast24Hours } from '@/tkeel-console-plugin-admin-usage-statistics/utils/query';

import ChartContainer from './ChartContainer';

const params = getQueryParamsLast24Hours();

const HEIGHT = '184px';

export default function TimeChart() {
  const dataKeys = [
    {
      key: 'p95_tkapi_request_latency',
      label: 'P95',
      fill: useColor('green.50'),
      stroke: useColor('green.300'),
    },
    {
      key: 'p99_tkapi_request_latency',
      label: 'P99',
      fill: useColor('blue.50'),
      stroke: useColor('blue.300'),
    },
    {
      key: 'p999_tkapi_request_latency',
      label: 'P99.9',
      fill: useColor('orange.50'),
      stroke: useColor('orange.300'),
    },
  ];

  const { isLoading: isSummaryLading, valueItem } = usePrometheusTKMeterQuery({
    params: { meter: 'avg_tkapi_request_latency_24h' },
  });
  const summaryValue = (valueItem?.value ?? 0) * 1000;

  const { isLoading: isChartLoading, timestampItems } =
    usePrometheusTKMeterBatchQuery({
      params: {
        ...params,
        step: '10m',
        meters: dataKeys.map(({ key }) => key),
      },
    });
  const data = formatTimestampItems({
    data: timestampItems,
    formatter: (value) => value * 1000,
  });
  const isLoading = isSummaryLading || isChartLoading;

  if (isLoading) {
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
      <TimeAreaChart
        data={data}
        dataKeys={dataKeys}
        area={{ fillOpacity: '0.4' }}
        tooltip={{ formatterString: '0,0.00' }}
      />
    </ChartContainer>
  );
}
