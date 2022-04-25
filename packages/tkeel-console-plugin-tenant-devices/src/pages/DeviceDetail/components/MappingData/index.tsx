import { Flex, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { useState } from 'react';

import {
  PageHeaderToolbar,
  SegmentedControlTab,
  SegmentedControlTabList,
} from '@tkeel/console-components';

import { DeviceObject } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';

import AutoButton from '../AutoButton';
import AutoMappingButton from '../AutoMappingButton';
import TelemetryRelationTable from './TelemetryRelationTable';

interface Props {
  deviceObject: DeviceObject;
}

export default function MappingData({ deviceObject }: Props) {
  const [keywords, setKeywords] = useState('');
  const handleSearch = (value: string) => {
    setKeywords(value.trim());
    // eslint-disable-next-line no-console
    console.log(keywords);
  };
  const mapTabs = [
    {
      label: '遥测关系',
      key: 'telemetry',
      component: <TelemetryRelationTable deviceObject={deviceObject} />,
    },
    {
      label: '属性关系',
      key: 'attribute',
      component: <Text>属性关系</Text>,
    },
  ];
  return (
    <Flex flex="1" direction="column" height="100%">
      <Tabs
        position="relative"
        height="100%"
        display="flex"
        flexDirection="column"
        overflow="hidden"
      >
        <PageHeaderToolbar
          styles={{
            wrapper: { height: '34px', marginBottom: '12px' },
          }}
          name={
            <SegmentedControlTabList>
              {mapTabs.map((item) => (
                <SegmentedControlTab key={item.key}>
                  {item.label}
                </SegmentedControlTab>
              ))}
            </SegmentedControlTabList>
          }
          hasSearchInput
          searchInputProps={{
            onSearch: handleSearch,
          }}
          buttons={[
            <AutoMappingButton key="add" deviceObject={deviceObject} />,
            <AutoButton key="demo" />,
          ]}
        />
        <TabPanels flex="1" overflow="hidden" bg="gray.50">
          {mapTabs.map((item) => (
            <TabPanel key={item.key} padding="0">
              {item.component}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
