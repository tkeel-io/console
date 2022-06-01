import { Flex, StyleProps, Text } from '@chakra-ui/react';

import { Empty, SearchEmpty } from '@tkeel/console-components';
import { CloseFilledIcon, SmartObjectTwoToneIcon } from '@tkeel/console-icons';
import { DeviceItem } from '@tkeel/console-request-hooks';

type Props = {
  type: 'group' | 'template';
  hasSelectedGroupOrTemplate: boolean;
  keywords: string;
  devices: DeviceItem[];
  removeDevice: (deviceId: string) => unknown;
  styles?: {
    wrapper?: StyleProps;
  };
};

export default function SelectedDevices({
  type,
  hasSelectedGroupOrTemplate,
  keywords,
  devices,
  removeDevice,
  styles,
}: Props) {
  if (hasSelectedGroupOrTemplate && devices.length === 0) {
    if (keywords) {
      return (
        <SearchEmpty
          styles={{ wrapper: { height: '100%' }, text: { color: 'gray.600' } }}
        />
      );
    }

    return (
      <Empty
        type="component"
        title={
          <Flex flexDirection="column" alignItems="center">
            <Text>请从左侧设备列表选择</Text>
            <Text>需要添加的设备</Text>
          </Flex>
        }
        styles={{
          wrapper: { width: '100%', height: '100%' },
        }}
      />
    );
  }

  return (
    <Flex flexDirection="column" overflowY="auto" {...styles?.wrapper}>
      {devices.map((device) => {
        const { basicInfo } = device?.properties ?? {};
        const { parentName, name } = basicInfo || {};
        let deviceName = name || '';
        if (type === 'group' && parentName) {
          deviceName = `${parentName}/${deviceName}`;
        }
        return (
          <Flex
            key={device.id}
            justifyContent="space-between"
            alignItems="center"
            flexShrink={0}
            padding="0 12px"
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
                noOfLines={1}
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
    </Flex>
  );
}
