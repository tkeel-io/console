import { Flex, Text } from '@chakra-ui/react';

import { CloseFilledIcon, SmartObjectTwoToneIcon } from '@tkeel/console-icons';
import { DeviceItem } from '@tkeel/console-request-hooks';

type Props = {
  devices: DeviceItem[];
  removeDevice: (deviceId: string) => unknown;
};

export default function SelectedDevices({ devices, removeDevice }: Props) {
  return (
    <>
      {devices.map((device) => {
        const { basicInfo } = device?.properties ?? {};
        const { parentName, name } = basicInfo || {};
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
              >
                {parentName ? `${parentName}/` : ''}
                {name || ''}
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
