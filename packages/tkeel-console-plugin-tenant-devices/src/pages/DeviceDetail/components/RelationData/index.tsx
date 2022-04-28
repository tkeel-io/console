import { Flex, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useState } from 'react';

import {
  PageHeaderToolbar,
  SegmentedControlTab,
  SegmentedControlTabList,
} from '@tkeel/console-components';

import { DeviceObject } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';
import useDeviceRelationListQuery from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceRelationListQuery';

import AutoRelationButton from '../AutoRelationButton';
import AttributeRelationTable from './AttributeRelationTable';
import TelemetryRelationTable from './TelemetryRelationTable';

interface Props {
  deviceObject: DeviceObject;
}

export default function RelationData({ deviceObject }: Props) {
  const [keywords, setKeywords] = useState('');
  const { id } = deviceObject;
  const { expressionList, refetch: refetchDeviceRelation } =
    useDeviceRelationListQuery({
      id,
    });
  const handleSearch = (value: string) => {
    setKeywords(value.trim());
  };
  const telemetryRelationList =
    expressionList?.filter((v) => v.path.includes('telemetry')) ?? [];
  const attributeRelationList =
    expressionList?.filter((v) => v.path.includes('attribute')) ?? [];
  const mapTabs = [
    {
      label: '遥测关系',
      key: 'telemetry',
      component: (
        <TelemetryRelationTable
          deviceObject={deviceObject}
          telemetryRelationList={telemetryRelationList}
          refetch={refetchDeviceRelation}
          keywords={keywords}
        />
      ),
    },
    {
      label: '属性关系',
      key: 'attribute',
      component: (
        <AttributeRelationTable
          keywords={keywords}
          deviceObject={deviceObject}
          attributeRelationList={attributeRelationList}
          refetch={refetchDeviceRelation}
        />
      ),
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
        onChange={() => {
          setKeywords('');
        }}
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
            onChange(value) {
              setKeywords(value);
            },
            inputStyle: { background: 'gray.50' },
            value: keywords,
          }}
          buttons={[
            <AutoRelationButton
              key="add"
              deviceObject={deviceObject}
              refetch={refetchDeviceRelation}
            />,
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
