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

interface Plugin {
  metadata: {
    uid: string;
    name: string;
  };
  status: {
    availableReplicas: number;
    replicas: number;
    status: PluginStatus;
    updateTime: number;
  };
}

interface AipData {
  '@type': string;
  items: Plugin[];
  totalItems: number;
}

interface Options {
  params?: RequestParams;
}

export type { Plugin, RequestParams };

export default function useMonitoringPluginsQuery(options?: Options) {
  const params = options?.params;

  const result = useQuery<AipData, RequestParams>({
    url: '/tkeel-monitor/v1/monitoring/plugins',
    method: 'GET',
    params: { is_descending: true, ...params },
  });
  const total = result.data?.totalItems ?? 0;
  const plugins = result.data?.items ?? [];

  return { total, plugins, ...result };
}
