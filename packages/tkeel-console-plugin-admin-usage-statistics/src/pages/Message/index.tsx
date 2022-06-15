import ChartsPage from '@/tkeel-console-plugin-admin-usage-statistics/components/ChartsPage';
import TimeAreaChartComplex from '@/tkeel-console-plugin-admin-usage-statistics/components/TimeAreaChartComplex';
import type { TimeAreaChartHeaderProps } from '@/tkeel-console-plugin-admin-usage-statistics/components/TimeAreaChartHeader';
import usePrometheusTKMeterBatchQuery from '@/tkeel-console-plugin-admin-usage-statistics/hooks/queries/usePrometheusTKMeterBatchQuery';
import { getQueryParamsLast24HoursPer5Mins } from '@/tkeel-console-plugin-admin-usage-statistics/utils/query';

const DESCRIPTION = '（单位：条  间隔：5分钟）';

const params = getQueryParamsLast24HoursPer5Mins();

export default function Message() {
  const charts: {
    key: string;
    header: TimeAreaChartHeaderProps;
  }[] = [
    {
      key: 'downstream_msg',
      header: {
        title: '[北向] 云端',
        description: DESCRIPTION,
      },
    },
    {
      key: 'upstream_msg',
      header: {
        title: '[南向] 设备',
        description: DESCRIPTION,
      },
    },
    {
      key: 'sum_iothub_connected',
      header: {
        title: '[IOT Hub] 设备连接数',
        description: DESCRIPTION,
      },
    },
    {
      key: 'core_msg_days',
      header: {
        title: '时序数据库使用统计',
        description: '（单位：MB  间隔：5分钟）',
      },
    },
  ];

  const { isLoading, timestampItems } = usePrometheusTKMeterBatchQuery({
    params: { ...params, meters: charts.map(({ key }) => key) },
  });

  return (
    <ChartsPage title="消息数据统计">
      {charts.map(({ key, header }) => {
        return (
          <TimeAreaChartComplex
            key={key}
            isLoading={isLoading}
            header={header}
            data={timestampItems}
            dataKeys={charts.map(({ key: k }) => ({ key: k }))}
          />
        );
      })}
    </ChartsPage>
  );
}
