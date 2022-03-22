/* eslint-disable no-underscore-dangle */
import { TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { values } from 'lodash';
import { useState } from 'react';

import { CustomTab, CustomTabList } from '@tkeel/console-components';

import { DeviceObject } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';
import AttributesData from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/AttributesData';
import ConnectionInfo from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/ConnectionInfo';
import RawData from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/RawData';

type Props = {
  deviceObject: DeviceObject;
  refetch?: () => void;
};

function DeviceDetailRightPanel({ deviceObject, refetch }: Props): JSX.Element {
  const { properties, configs, id } = deviceObject;
  const attributeDefines = configs?.attributes?.define?.fields ?? {};
  const {
    connectInfo,
    rawData,
    basicInfo,
    attributes: attributeValues,
  } = properties;
  // eslint-disable-next-line no-console
  console.log(attributeValues);
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
          attributeValues={attributeValues}
          attributeDefines={values(attributeDefines)}
          deviceName={basicInfo?.name ?? ''}
          deviceId={id}
          refetch={refetch}
        />
      ),
    },
  ];
  const [tabIndex, setTabIndex] = useState(2);
  const handleTabChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <Tabs
      flex="1"
      bg="white"
      borderRadius="4px"
      variant="unstyled"
      index={tabIndex}
      onChange={handleTabChange}
      display="flex"
      flexDirection="column"
    >
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
      <TabPanels flex="1" display="flex" overflow="hidden">
        {tabs.map((r) => (
          <TabPanel key={r.key} p="12px 20px" flex="1">
            {r.component}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}

export default DeviceDetailRightPanel;
