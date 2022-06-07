import { useQuery } from '@tkeel/console-hooks';

interface ApiData {
  '@type': string;
}

interface RequestParams {
  meters: string;
  et?: number;
  st?: number;
  step?: string;
  tenant_id?: string;
}

interface Params extends Omit<RequestParams, 'meters'> {
  meters: string[];
}

interface Options {
  params: Params;
}

export default function usePrometheusTKMeterBatchQuery({ params }: Options) {
  const { meters: meterList, ...rest } = params;
  const meters = meterList.join('|');

  return useQuery<ApiData, RequestParams>({
    url: '/tkeel-monitor/v1/prometheus/batch_tkmeter',
    method: 'GET',
    params: { meters, ...rest },
  });
}
