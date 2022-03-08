/* eslint-disable no-underscore-dangle */
import { Box, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useState } from 'react';

import { CustomTab, CustomTabList } from '@tkeel/console-components';

import {
  // Attributes,
  DeviceObject,
} from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';
import AttributesData from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/AttributesData';
import ConnectionInfo from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/ConnectionInfo';
import RawData from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/RawData';

type Props = {
  deviceObject: DeviceObject;
  refetch?: () => void;
};

function DeviceDetailRightPanel({ deviceObject, refetch }: Props): JSX.Element {
  const { properties } = deviceObject;
  // const { properties, configs } = deviceObject;
  // const attributes = configs?.attributes;
  const { connectInfo, rawData, basicInfo } = properties;
  const tabs = [
    {
      label: '连接信息',
      key: 'connectionInfo',
      component: <ConnectionInfo data={connectInfo} />,
    },
    {
      label: '原始数据',
      key: 'rawData',
      component: (
        <RawData data={rawData} online={connectInfo?._online ?? false} />
      ),
    },
    {
      label: '属性数据',
      key: 'attributeData',
      component: (
        <AttributesData
          // data={attributes as Attributes}
          refetch={refetch}
          deviceName={basicInfo?.name}
        />
      ),
    },
  ];
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <Box minWidth="700px" flex="2.5" bg="white" borderRadius="4px">
      <Tabs variant="unstyled" index={tabIndex} onChange={handleTabChange}>
        <CustomTabList>
          {tabs.map((r, index) => (
            <CustomTab
              borderTopLeftRadius={index === 0 ? '4px' : '0'}
              key={r.key}
            >
              {r.label}
            </CustomTab>
          ))}
        </CustomTabList>
        <TabPanels>
          {tabs.map((r) => (
            <TabPanel key={r.key} p="12px 20px">
              {r.component}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default DeviceDetailRightPanel;
