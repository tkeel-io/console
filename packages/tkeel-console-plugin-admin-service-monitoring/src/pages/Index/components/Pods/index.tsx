import { VStack } from '@chakra-ui/react';

import type { Plugin as PluginData } from '@/tkeel-console-plugin-admin-service-monitoring/hooks/queries/useMonitoringPluginsQuery';
import useMonitoringPodsQuery from '@/tkeel-console-plugin-admin-service-monitoring/hooks/queries/useMonitoringPodsQuery';

import Pod from '../Pod';

interface Props {
  pluginData: PluginData;
}

export default function Pods({ pluginData }: Props) {
  const pluginName = pluginData.metadata.name;

  const { pods } = useMonitoringPodsQuery({
    params: { plugin: pluginName },
    refetchInterval: 5000,
  });

  return (
    <VStack spacing="12px">
      {pods.map((data) => (
        <Pod key={data.metadata.uid} data={data} />
      ))}
    </VStack>
  );
}
