import { useQuery } from '@tkeel/console-hooks';

import type { PluginStatus } from '@/tkeel-console-plugin-admin-service-monitoring/types';

interface RequestParams {
  only_status: boolean;
}

interface StatusItem {
  uid: string;
  status: PluginStatus;
}

interface AipData {
  items: StatusItem[];
}

interface Options {
  enabled?: boolean;
  refetchInterval?: number | false;
}

export type { StatusItem };

export default function useMonitoringPluginsStatusQuery(options?: Options) {
  const enabled = options?.enabled ?? true;
  const refetchInterval = options?.refetchInterval;

  const result = useQuery<AipData, RequestParams>({
    url: '/tkeel-monitor/v1/monitoring/plugins',
    method: 'GET',
    params: { only_status: true },
    reactQueryOptions: {
      enabled,
      refetchInterval,
    },
  });
  const statusItems = result.data?.items ?? [];

  return { statusItems, ...result };
}
