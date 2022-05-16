import { Flex, Text } from '@chakra-ui/react';

import type { Plugin as PluginData } from '@/tkeel-console-plugin-admin-service-monitoring/hooks/queries/useMonitorPluginsQuery';

interface Props {
  data: PluginData;
}

export default function Plugin({ data }: Props) {
  return (
    <Flex>
      <Text>{data.metadata.name}</Text>
    </Flex>
  );
}
