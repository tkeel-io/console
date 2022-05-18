import { VStack } from '@chakra-ui/react';
import { find } from 'lodash';

import { Empty, Loading } from '@tkeel/console-components';

import type { Plugin as PluginData } from '@/tkeel-console-plugin-admin-service-monitoring/hooks/queries/useMonitoringPluginsQuery';
import useMonitoringPodsMetricsQuery from '@/tkeel-console-plugin-admin-service-monitoring/hooks/queries/useMonitoringPodsMetricsQuery';
import useMonitoringPodsQuery from '@/tkeel-console-plugin-admin-service-monitoring/hooks/queries/useMonitoringPodsQuery';

import Pod from '../Pod';

const REFETCH_INTERVAL = 5000;

interface Props {
  pluginData: PluginData;
}

export default function Pods({ pluginData }: Props) {
  const pluginName = pluginData.metadata.name;

  const { isLoading, pods } = useMonitoringPodsQuery({
    params: { plugin: pluginName },
    refetchInterval: REFETCH_INTERVAL,
  });
  const { results } = useMonitoringPodsMetricsQuery({
    params: {
      plugin: pluginName,
      pods: pods.map((item) => item.metadata.name),
    },
    enabled: pods.length > 0,
    refetchInterval: REFETCH_INTERVAL,
  });
  const cpuData = find(results, { metric_name: 'pod_cpu_usage' });
  const memoryData = find(results, {
    metric_name: 'pod_memory_usage_wo_cache',
  });

  if (isLoading) {
    return <Loading styles={{ wrapper: { height: '74px' } }} />;
  }

  if (pods.length === 0) {
    return <Empty />;
  }

  return (
    <VStack spacing="12px">
      {pods.map((data) => {
        const cpu = find(cpuData?.data.result, {
          metric: { pod: data.metadata.name },
        });
        const memory = find(memoryData?.data.result, {
          metric: { pod: data.metadata.name },
        });

        if (!cpu || !memory) {
          return null;
        }

        const metrics = {
          cpu,
          memory,
        };

        return (
          <Pod
            key={data.metadata.uid}
            data={data}
            metrics={metrics}
            styles={{ root: { width: '100%' } }}
          />
        );
      })}
    </VStack>
  );
}
