import { Flex, Text } from '@chakra-ui/react';

import { CloseFilledIcon, SmartObjectTwoToneIcon } from '@tkeel/console-icons';
import { DeviceItem } from '@tkeel/console-request-hooks';

import Empty from '@/tkeel-console-plugin-tenant-routing-rules/pages/Detail/components/DataSelect/Empty';

type Props = {
  groupId: string;
  devices: DeviceItem[];
  removeDevice: (deviceId: string) => unknown;
};

export default function SelectedDevices({
  groupId,
  devices,
  removeDevice,
}: Props) {
  if (groupId && devices.length === 0) {
    return (
      <Empty
        text={
          <Flex flexDirection="column" alignItems="center">
            <Text>请从左侧设备列表选择</Text>
            <Text>需要添加的设备</Text>
          </Flex>
        }
        styles={{ wrapper: { width: '100%', height: '100%' } }}
      />
    );
  }

  return (
    <>
      {devices.map((device) => {
        const { basicInfo } = device?.properties ?? {};
        const { parentName, name } = basicInfo || {};
        let deviceName = name || '';
        if (parentName) {
          deviceName = `${parentName}/${deviceName}`;
        }
        return (
          <Flex
            key={device.id}
            justifyContent="space-between"
            alignItems="center"
            padding="0 10px"
            height="32px"
            _hover={{ backgroundColor: 'grayAlternatives.50' }}
          >
            <Flex alignItems="center">
              <SmartObjectTwoToneIcon />
              <Text
                marginLeft="4px"
                color="gray.800"
                fontSize="14px"
                lineHeight="24px"
                isTruncated
                title={deviceName}
              >
                {deviceName}
              </Text>
            </Flex>
            <CloseFilledIcon
              style={{ cursor: 'pointer' }}
              onClick={() => removeDevice(device.id)}
            />
          </Flex>
        );
      })}
    </>
  );
}
