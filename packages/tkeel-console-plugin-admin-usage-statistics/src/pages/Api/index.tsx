import { useColors } from '@tkeel/console-hooks';
import { numeral } from '@tkeel/console-utils';

import ChartsPage from '@/tkeel-console-plugin-admin-usage-statistics/components/ChartsPage';
import TimeAreaChartWithRequest from '@/tkeel-console-plugin-admin-usage-statistics/components/TimeAreaChartWithRequest';
import type { ChartItem } from '@/tkeel-console-plugin-admin-usage-statistics/types/chart';
import { getQueryParamsLast24HoursPer5Mins } from '@/tkeel-console-plugin-admin-usage-statistics/utils/query';

const params = getQueryParamsLast24HoursPer5Mins();

export default function Api() {
  const colors = useColors();
  const chartItems: ChartItem[] = [
    {
      key: 0,
      header: {
        title: 'API 调用次数',
        description: '（单位：次，间隔：5 分钟）',
      },
      dataKeys: [
        {
          key: 'num_tkapi_request',
          label: 'API 调用次数',
        },
      ],
      tooltip: {
        formatterUnit: '次',
      },
    },
    {
      key: 1,
      header: {
        title: 'API 调用平均耗时',
        description: '（单位：ms ，间隔：5分钟）',
      },
      dataKeys: [
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
      ],
      valueFormatter: (value) => value * 1000,
      yAxis: {
        tickFormatter: (value: number) => numeral.format({ input: value }),
      },
      tooltip: { formatterString: '0,0.00' },
    },
  ];

  return (
    <ChartsPage title="API 调用统计">
      {chartItems.map(({ key, ...rest }) => {
        return (
          <TimeAreaChartWithRequest
            requestParams={params}
            key={key}
            {...rest}
          />
        );
      })}
    </ChartsPage>
  );
}
