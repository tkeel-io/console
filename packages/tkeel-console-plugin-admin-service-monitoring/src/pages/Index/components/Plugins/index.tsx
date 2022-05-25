import { Accordion, Center, VStack } from '@chakra-ui/react';
import { find } from 'lodash';
import { useMemo, useState } from 'react';

import { Empty, Loading } from '@tkeel/console-components';

import type { Plugin as PluginData } from '@/tkeel-console-plugin-admin-service-monitoring/hooks/queries/useMonitoringPluginsQuery';
import type { StatusItem } from '@/tkeel-console-plugin-admin-service-monitoring/hooks/queries/useMonitoringPluginsStatusQuery';
import type { PluginStatus } from '@/tkeel-console-plugin-admin-service-monitoring/types';

import Plugin from '../Plugin';

function MemoizedPlugin({
  data,
  statusValue,
  isExpanded,
}: {
  data: PluginData;
  statusValue: PluginStatus | undefined;
  isExpanded: boolean;
}) {
  return useMemo(
    () => (
      <Plugin
        data={data}
        statusValue={statusValue}
        isExpanded={isExpanded}
        styles={{ root: { width: '100%' } }}
      />
    ),
    [data, statusValue, isExpanded]
  );
}

interface Props {
  isLoading: boolean;
  data: PluginData[];
  statusItems: StatusItem[];
}

export default function Plugins({
  isLoading,
  data: plugins,
  statusItems,
}: Props) {
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
          const statusItem = find(statusItems, { uid });
          const statusValue = statusItem?.status;
          const isExpanded = index === expandedIndex;

          return (
            <MemoizedPlugin
              key={uid}
              data={data}
              statusValue={statusValue}
              isExpanded={isExpanded}
            />
          );
        })}
      </VStack>
    </Accordion>
  );
}
