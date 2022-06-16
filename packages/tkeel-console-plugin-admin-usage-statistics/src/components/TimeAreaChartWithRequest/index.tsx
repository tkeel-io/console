import type { TimeAreaChartProps } from '@/tkeel-console-plugin-admin-usage-statistics/components/TimeAreaChart';
import TimeAreaChartComplex from '@/tkeel-console-plugin-admin-usage-statistics/components/TimeAreaChartComplex';
import type { TimeAreaChartHeaderProps } from '@/tkeel-console-plugin-admin-usage-statistics/components/TimeAreaChartHeader';
import usePrometheusTKMeterBatchQuery from '@/tkeel-console-plugin-admin-usage-statistics/hooks/queries/usePrometheusTKMeterBatchQuery';

interface Props extends Omit<TimeAreaChartProps, 'data'> {
  requestParams: {
    st: number;
    step: string;
  };
  header: TimeAreaChartHeaderProps;
}

export default function TimeAreaChartWithRequest({
  requestParams,
  header,
  ...timeAreaChartProps
}: Props) {
  const { dataKeys } = timeAreaChartProps;
  const { isLoading, timestampItems } = usePrometheusTKMeterBatchQuery({
    params: { ...requestParams, meters: dataKeys.map(({ key }) => key) },
  });

  return (
    <TimeAreaChartComplex
      isLoading={isLoading}
      header={header}
      data={timestampItems}
      {...timeAreaChartProps}
    />
  );
}
