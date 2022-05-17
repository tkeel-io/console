import { Accordion, Center, VStack } from '@chakra-ui/react';
import { useMemo, useState } from 'react';

import { Empty, Loading } from '@tkeel/console-components';

import type { Plugin as PluginData } from '@/tkeel-console-plugin-admin-service-monitoring/hooks/queries/useMonitoringPluginsQuery';

import Plugin from '../Plugin';

function MemoizedPlugin({
  data,
  isExpanded,
}: {
  data: PluginData;
  isExpanded: boolean;
}) {
  return useMemo(
    () => (
      <Plugin
        data={data}
        isExpanded={isExpanded}
        styles={{ root: { width: '100%' } }}
      />
    ),
    [data, isExpanded]
  );
}

interface Props {
  isLoading: boolean;
  data: PluginData[];
}

export default function Plugins({ isLoading, data: plugins }: Props) {
  const [expandedIndex, setExpandedIndex] = useState<number>(-1);

  if (isLoading) {
    return (
      <Center height="100%">
        <Loading />
      </Center>
    );
  }

  if (!(plugins?.length > 0)) {
    return (
      <Center height="100%">
        <Empty />
      </Center>
    );
  }

  return (
    <Accordion
      allowToggle
      onChange={(value) => {
        if (typeof value === 'number') {
          setExpandedIndex(value);
        }
      }}
    >
      <VStack padding="0 20px 20px" spacing="12px">
        {plugins.map((data, index) => {
          const { uid } = data.metadata;
          const isExpanded = index === expandedIndex;

          return (
            <MemoizedPlugin key={uid} data={data} isExpanded={isExpanded} />
          );
        })}
      </VStack>
    </Accordion>
  );
}
