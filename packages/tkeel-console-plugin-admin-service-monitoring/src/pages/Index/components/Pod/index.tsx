import { Flex } from '@chakra-ui/react';

import type { Pod as PodData } from '@/tkeel-console-plugin-admin-service-monitoring/hooks/queries/useMonitoringPodsQuery';

interface Props {
  data: PodData;
}

export default function Pod({ data }: Props) {
  return <Flex>{data.metadata.name}</Flex>;
}
