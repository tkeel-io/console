import { useQuery } from '@tkeel/console-hooks';

import type { PluginStatus } from '@/tkeel-console-plugin-admin-service-monitoring/types';

interface RequestParams {
  page_num?: number;
  page_size?: number;
  order_by?: string;
  is_descending?: boolean;
  name?: string;
  status?: PluginStatus;
}

interface Item {
  metadata: {
    uid: string;
  };
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
