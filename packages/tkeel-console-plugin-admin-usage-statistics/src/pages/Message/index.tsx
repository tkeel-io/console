import ChartsPage from '@/tkeel-console-plugin-admin-usage-statistics/components/ChartsPage';
import TimeAreaChartWithRequest from '@/tkeel-console-plugin-admin-usage-statistics/components/TimeAreaChartWithRequest';
import type { ChartItem } from '@/tkeel-console-plugin-admin-usage-statistics/types/chart';
import { getQueryParamsLast24HoursPer5Mins } from '@/tkeel-console-plugin-admin-usage-statistics/utils/query';

const DESCRIPTION = '（单位：条，间隔：5分钟）';

const CHART_ITEMS: ChartItem[] = [
  {
    key: 0,
    header: {
      title: '[北向] 云端',
      description: DESCRIPTION,
    },
    dataKeys: [{ key: 'upstream_msg', label: '[北向] 云端' }],
  },
  {
    key: 1,
    header: {
      title: '[南向] 设备',
      description: DESCRIPTION,
    },
    dataKeys: [{ key: 'downstream_msg', label: '[南向] 设备' }],
  },
  {
    key: 2,
    header: {
      title: '[IOT Hub] 设备连接数',
      description: DESCRIPTION,
    },
    dataKeys: [{ key: 'sum_iothub_connected', label: '[IOT Hub] 设备连接数' }],
  },
  {
    key: 3,
    header: {
      title: '时序数据库使用统计',
      description: '（单位：MB ，间隔：5分钟）',
    },
    dataKeys: [{ key: 'core_msg_days', label: '时序数据库使用统计' }],
  },
];

const params = getQueryParamsLast24HoursPer5Mins();

export default function Message() {
  return (
    <ChartsPage title="消息数据统计">
      {CHART_ITEMS.map(({ key, header, dataKeys, areaChart }) => {
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
