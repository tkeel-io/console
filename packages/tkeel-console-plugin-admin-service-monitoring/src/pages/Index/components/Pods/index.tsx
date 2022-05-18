import { VStack } from '@chakra-ui/react';

import { Empty, Loading } from '@tkeel/console-components';

import type { Plugin as PluginData } from '@/tkeel-console-plugin-admin-service-monitoring/hooks/queries/useMonitoringPluginsQuery';
import useMonitoringPodsQuery from '@/tkeel-console-plugin-admin-service-monitoring/hooks/queries/useMonitoringPodsQuery';

import Pod from '../Pod';

interface Props {
  pluginData: PluginData;
}

export default function Pods({ pluginData }: Props) {
  const pluginName = pluginData.metadata.name;

  const { isLoading, pods } = useMonitoringPodsQuery({
    params: { plugin: pluginName },
    refetchInterval: 5000,
  });

  if (isLoading) {
    return <Loading styles={{ wrapper: { height: '74px' } }} />;
  }

  if (pods.length === 0) {
    return <Empty />;
  }

  return (
    <VStack spacing="12px">
      {pods.map((data) => (
        <Pod
          key={data.metadata.uid}
          data={data}
          styles={{ root: { width: '100%' } }}
        />
      ))}
    </VStack>
  );
}
