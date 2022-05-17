import { useQuery } from '@tkeel/console-hooks';

import type { PodStatus } from '@/tkeel-console-plugin-admin-service-monitoring/types';

interface RequestParams {
  plugin: string;
}

interface Pod {
  metadata: {
    uid: string;
    name: string;
  };
  status: {
    hostIP: string;
    phase: PodStatus;
    podIP: string;
    startTime: string;
  };
}

interface AipData {
  '@type': string;
  items: Pod[];
  totalItems: number;
}

interface Options {
  params: RequestParams;
  refetchInterval?: number | false;
}

export type { Pod };

export default function useMonitoringPodsQuery({
  params,
  refetchInterval,
}: Options) {
  const result = useQuery<AipData, RequestParams>({
    url: '/tkeel-monitor/v1/monitoring/plugins/pods',
    method: 'GET',
    params,
    reactQueryOptions: {
      refetchInterval,
    },
  });
  const total = result.data?.totalItems ?? 0;
  const pods = result.data?.items ?? [];

  return { total, pods, ...result };
}
