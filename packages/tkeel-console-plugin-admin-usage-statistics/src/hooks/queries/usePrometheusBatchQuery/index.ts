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

interface Params extends Omit<RequestParams, 'query'> {
  queries: string[];
}

interface Options {
  params: Params;
}

export default function usePrometheusBatchQuery({ params }: Options) {
  const { queries, ...rest } = params;
  const query = queries.join('|');

  return useQuery<ApiData, RequestParams>({
    url: '/tkeel-monitor/v1/prometheus/batch_query',
    method: 'GET',
    params: { query, ...rest },
  });
}
