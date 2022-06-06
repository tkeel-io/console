import { useQuery } from '@tkeel/console-hooks';

interface ApiData {
  '@type': string;
}

interface RequestParams {
  meter: string;
  st?: number;
  et?: number;
  step?: number;
  tenant_id?: string;
}

interface Options {
  params: RequestParams;
}

export default function usePrometheusTKMeterQuery({ params }: Options) {
  return useQuery<ApiData, RequestParams>({
    url: '/tkeel-monitor/v1/prometheus/query',
    method: 'GET',
    params,
  });
}
