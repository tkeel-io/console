import { useColors } from '@tkeel/console-hooks';
import { numeral } from '@tkeel/console-utils';

import ChartsPage from '@/tkeel-console-plugin-admin-usage-statistics/components/ChartsPage';
import TimeAreaChartWithRequest from '@/tkeel-console-plugin-admin-usage-statistics/components/TimeAreaChartWithRequest';
import type { ChartItem } from '@/tkeel-console-plugin-admin-usage-statistics/types/chart';
import { getQueryParamsLast24HoursPer5Mins } from '@/tkeel-console-plugin-admin-usage-statistics/utils/query';

const params = getQueryParamsLast24HoursPer5Mins();

export default function Usage() {
  const colors = useColors();
  const chartItems: ChartItem[] = [
    {
      key: 0,
      header: {
        title: '设备状态',
        description: '（单位：台，间隔：5 分钟）',
      },
      dataKeys: [
        {
          key: 'sum_device_num',
          label: '总数',
          fill: colors.blue[50],
          stroke: colors.blue[300],
        },
        {
          key: 'sum_iothub_connected',
          label: '在线',
          fill: colors.green[50],
          stroke: colors.green[300],
        },
        {
          key: 'sum_device_offline',
          label: '离线',
          fill: colors.gray[50],
          fillOpacity: '0.2',
          stroke: colors.gray[500],
        },
      ],
      yAxis: {
        tickFormatter: (value: number) =>
          numeral.format({ input: value, formatter: '0,0' }),
      },
      tooltip: {
        formatterUnit: '台',
      },
    },
    {
      key: 1,
      header: {
        title: '订阅量',
        description: '（单位：条，间隔：5 分钟）',
      },
      dataKeys: [{ key: 'subscribe_num', label: '订阅量' }],
      tooltip: {
        formatterUnit: '条',
      },
    },
    {
      key: 2,
      header: {
        title: '规则执行次数',
        description: '（单位：次，间隔：5 分钟）',
      },
      dataKeys: [
        {
          key: 'num_rule_execute_success',
          label: '成功',
          fill: colors.green[50],
          stroke: colors.green[300],
        },
        {
          key: 'num_rule_execute_failure',
          label: '失败',
          fill: colors.red[50],
          stroke: colors.red[300],
        },
      ],
      tooltip: {
        formatterUnit: '次',
      },
    },
    {
      key: 3,
      header: {
        title: '规则执行速率',
        description: '（单位：次/秒，间隔：5 分钟）',
      },
      dataKeys: [
        {
          key: 'rate_rule_execute_success_5m',
          label: '成功',
          fill: colors.green[50],
          stroke: colors.green[300],
        },
        {
          key: 'rate_rule_execute_failure_5m',
          label: '失败',
          fill: colors.red[50],
          stroke: colors.red[300],
        },
      ],
      tooltip: {
        formatterUnit: '次/秒',
      },
    },
  ];

  return (
    <ChartsPage title="使用数据统计">
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
