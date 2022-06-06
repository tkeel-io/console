import { useQuery } from '@tkeel/console-hooks';

interface ApiData {
  '@type': string;
}

interface RequestParams {
  query: string;
  st?: number;
  et?: number;
  step?: number;
}

interface Options {
  params: RequestParams;
}

// TODO: DELETE ?
export default function usePrometheusQuery({ params }: Options) {
  return useQuery<ApiData, RequestParams>({
    url: '/tkeel-monitor/v1/prometheus/query',
    method: 'GET',
    params,
  });
}
