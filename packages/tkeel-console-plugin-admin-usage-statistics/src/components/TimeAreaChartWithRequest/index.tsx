import TimeAreaChartComplex from '@/tkeel-console-plugin-admin-usage-statistics/components/TimeAreaChartComplex';
import usePrometheusTKMeterBatchQuery from '@/tkeel-console-plugin-admin-usage-statistics/hooks/queries/usePrometheusTKMeterBatchQuery';
import type { ChartItem } from '@/tkeel-console-plugin-admin-usage-statistics/types/chart';

interface Props extends Omit<ChartItem, 'key'> {
  requestParams: {
    st: number;
    step: string;
  };
}

export default function TimeAreaChartWithRequest({
  requestParams,
  header,
  dataKeys,
  areaChart,
}: Props) {
  const { isLoading, timestampItems } = usePrometheusTKMeterBatchQuery({
    params: { ...requestParams, meters: dataKeys.map(({ key }) => key) },
  });

  return (
    <TimeAreaChartComplex
      isLoading={isLoading}
      header={header}
      data={timestampItems}
      dataKeys={dataKeys}
      areaChart={areaChart}
    />
  );
}
