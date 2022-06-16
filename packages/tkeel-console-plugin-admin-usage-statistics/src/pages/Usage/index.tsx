import { useColors } from '@tkeel/console-hooks';

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
        description: '（单位：台，间隔：5分钟）',
      },
      dataKeys: [
        {
          key: 'sum_device_num',
          label: '总数',
          fill: colors.blue[50],
          fillOpacity: '0.4',
          stroke: colors.blue[300],
        },
        { key: 'sum_iothub_connected', label: '在线' },
        { key: 'sum_device_offline', label: '离线' },
      ],
    },
    {
      key: 1,
      header: {
        title: '订阅量',
        description: '（单位：条，间隔：5分钟）',
      },
      dataKeys: [{ key: 'downstream_msg', label: '[南向] 设备' }],
    },
    {
      key: 2,
      header: {
        title: '规则执行次数',
        description: '（单位：次，间隔：5分钟）',
      },
      dataKeys: [
        { key: 'sum_iothub_connected', label: '成功' },
        { key: 'sum_iothub_connected', label: '失败' },
      ],
    },
    {
      key: 3,
      header: {
        title: '规则执行速率',
        description: '（单位：次/秒，间隔：5分钟）',
      },
      dataKeys: [
        { key: 'sum_iothub_connected', label: '成功' },
        { key: 'sum_iothub_connected', label: '失败' },
      ],
    },
  ];

  return (
    <ChartsPage title="使用数据统计">
      {chartItems.map(({ key, header, dataKeys, areaChart }) => {
        return (
          <TimeAreaChartWithRequest
            key={key}
            requestParams={params}
            header={header}
            dataKeys={dataKeys}
            areaChart={areaChart}
          />
        );
      })}
    </ChartsPage>
  );
}
