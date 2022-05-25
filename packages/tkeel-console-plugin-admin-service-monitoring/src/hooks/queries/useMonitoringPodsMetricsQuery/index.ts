import { useQuery } from '@tkeel/console-hooks';

interface RequestParams {
  plugin: string;
  resources: string;
}

interface MetricData {
  metric: {
    namespace: string;
    node: string;
    owner_kind: string;
    owner_name: string;
    pod: string;
  };
  values: [number, string][];
}

interface Result {
  data: {
    result: MetricData[];
  };
  metric_name: 'pod_memory_usage_wo_cache' | 'pod_cpu_usage';
}

interface AipData {
  '@type': string;
  results: Result[];
}

interface Options {
  params: {
    plugin: string;
    pods: string[];
  };
  enabled?: boolean;

  refetchInterval?: number | false;
}

export type { MetricData };

export default function useMonitoringPodsMetricsQuery({
  params,
  enabled = true,
  refetchInterval = false,
}: Options) {
  const { plugin, pods } = params;
  const resources = `${pods.join('|')}$`;

  const res = useQuery<AipData, RequestParams>({
    url: '/tkeel-monitor/v1/monitoring/pods/metrics',
    method: 'GET',
    params: { plugin, resources },
    reactQueryOptions: {
      enabled,
      refetchInterval,
    },
  });
  const results = res.data?.results ?? [];

  return { ...res, results };
}
