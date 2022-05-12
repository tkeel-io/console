import { useQuery } from '@tkeel/console-hooks';

interface RequestParams {
  page_num?: number;
  page_size?: number;
  order_by?: string;
  is_descending?: boolean;
  name?: string;
  status?: 'running' | 'stopped' | 'updating';
}

interface Item {
  metadata: Record<string, unknown>;
  spec: Record<string, unknown>;
  status: Record<string, unknown>;
}

interface AipData {
  '@type': string;
  items: Item[];
}

interface Options {
  params?: RequestParams;
}

export default function useMonitorPluginsQuery(options?: Options) {
  const params = options?.params;

  const result = useQuery<AipData, RequestParams>({
    url: '/tkeel-monitor/v1/monitoring/plugins',
    method: 'GET',
    params,
  });
  const plugins = result.data?.items ?? [];

  return { plugins, ...result };
}
