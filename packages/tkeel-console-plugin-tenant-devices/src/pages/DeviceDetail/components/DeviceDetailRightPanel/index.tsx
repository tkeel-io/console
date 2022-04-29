import { TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { mapValues, values } from 'lodash';
import { useState } from 'react';

import { CustomTab, CustomTabList } from '@tkeel/console-components';
import { CommandItem } from '@tkeel/console-types';

import { DeviceObject } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';
import AttributesData from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/AttributesData';
import ConnectionInfo from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/ConnectionInfo';
import RawData from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/RawData';
import RelationData from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/RelationData';
import ServiceCommand from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/ServiceCommand';
import TelemetryData from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/TelemetryData';

type Props = {
  deviceObject: DeviceObject;
  refetch?: () => void;
  wsReadyState: number;
};

function DeviceDetailRightPanel({
  deviceObject,
  refetch,
  wsReadyState,
}: Props): JSX.Element {
  const { properties, configs, id } = deviceObject;
  const attributeFields = configs?.attributes?.define?.fields ?? {};
  const telemetryFields = configs?.telemetry?.define?.fields ?? {};
  const commandFields = configs?.commands?.define?.fields ?? {};
  const {
    connectInfo,
    rawData,
    basicInfo,
    attributes: attributeValues,
    telemetry: telemetryValues,
    commands: commandValues,
    telemetryDefaultValues,
    attributeDefaultValues,
  } = properties;
  const tabs = [
    {
      label: '连接信息',
      key: 'connectionInfo',
      isVisible: true,
      component: <ConnectionInfo data={connectInfo} />,
    },
    {
      label: '原始数据',
      key: 'rawData',
      isVisible: true,
      component: (
        <RawData
          data={rawData}
          // eslint-disable-next-line no-underscore-dangle
          online={connectInfo?._online ?? false}
          deviceId={id}
        />
      ),
    },
    {
      label: '属性数据',
      key: 'attributeData',
      isVisible: !!basicInfo?.templateId || basicInfo?.selfLearn,
      component: (
        <AttributesData
          attributeValues={attributeValues}
          attributeFields={values(attributeFields)}
          deviceId={id}
          basicInfo={basicInfo}
          refetch={refetch}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          attributeDefaultValues={attributeDefaultValues}
          wsReadyState={wsReadyState}
        />
      ),
    },
    {
      label: '遥测数据',
      key: 'telemetry',
      isVisible: !!basicInfo?.templateId || basicInfo?.selfLearn,
      component: (
        <TelemetryData
          basicInfo={basicInfo}
          deviceId={id}
          refetch={refetch}
          telemetryFields={values(telemetryFields)}
          telemetryValues={telemetryValues}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          telemetryDefaultValues={telemetryDefaultValues}
          wsReadyState={wsReadyState}
        />
      ),
    },
    {
      label: '服务命令',
      key: 'command',
      isVisible: !!basicInfo?.templateId || basicInfo?.selfLearn,
      component: (
        <ServiceCommand
          basicInfo={basicInfo}
          deviceId={id}
          refetch={refetch}
          // eslint-disable-next-line no-underscore-dangle
          online={connectInfo?._online ?? false}
          commandFields={values(
            mapValues(commandFields, (val: CommandItem, key) => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-return
              return { ...val, id: key };
            })
          )}
          commandValues={commandValues}
        />
      ),
    },
    {
      label: '关系映射',
      key: 'relation',
      isVisible: !!basicInfo?.templateId || basicInfo?.selfLearn,
      component: <RelationData deviceObject={deviceObject} />,
    },
  ];
  const [tabIndex, setTabIndex] = useState(0);
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
        {tabs.map(
          (r, index) =>
            r.isVisible && (
              <CustomTab
                borderTopLeftRadius={index === 0 ? '4px' : '0'}
                key={r.key}
              >
                {r.label}
              </CustomTab>
            )
        )}
      </CustomTabList>
      <TabPanels flex="1" display="flex" overflow="hidden">
        {tabs.map(
          (r) =>
            r.isVisible && (
              <TabPanel key={r.key} p="12px 20px" flex="1">
                {r.component}
              </TabPanel>
            )
        )}
      </TabPanels>
    </Tabs>
  );
}

export default DeviceDetailRightPanel;
