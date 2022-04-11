import { Box, Flex, Text } from '@chakra-ui/react';

import { Checkbox, Loading } from '@tkeel/console-components';
import { SmartObjectTwoToneIcon } from '@tkeel/console-icons';
import { DeviceItem } from '@tkeel/console-request-hooks';

export interface DeviceItemExtended extends DeviceItem {
  hasSelected?: boolean;
}

type Props = {
  isLoading: boolean;
  empty?: JSX.Element | null;
  deviceList: DeviceItemExtended[];
  keywords?: string;
  selectedDevices: DeviceItemExtended[];
  handleSetSelectedDevices: (selectedDevices: DeviceItemExtended[]) => unknown;
};

const getNewDevices = ({
  devices,
  device,
  checked,
}: {
  devices: DeviceItemExtended[];
  device: DeviceItemExtended;
  checked: boolean;
}) => {
  return checked
    ? [...devices, device]
    : devices.filter((item) => item.id !== device.id);
};

export default function DeviceList({
  isLoading,
  empty = null,
  deviceList,
  keywords = '',
  selectedDevices,
  handleSetSelectedDevices,
}: Props) {
  const checkedDevices = selectedDevices.filter(({ id }) =>
    deviceList.some((device) => device.id === id)
  );

  const { length } = checkedDevices;
  const hasDevices = length > 0;
  const isAllChecked = hasDevices && length === deviceList.length;
  const isIndeterminate = hasDevices && length < deviceList.length;

  const textStyle = {
    color: 'gray.800',
    fontSize: '14px',
    lineHeight: '32px',
  };

  const handleAllCheckBoxChange = (checked: boolean) => {
    let newSelectedDevices = [];
    if (checked) {
      const addDevices = deviceList.filter(
        ({ id }) => !selectedDevices.some((device) => device.id === id)
      );
      newSelectedDevices = [...selectedDevices, ...addDevices];
    } else {
      newSelectedDevices = selectedDevices.filter(
        ({ id }) =>
          !deviceList.some((device) => !device.hasSelected && device.id === id)
      );
    }
    handleSetSelectedDevices(newSelectedDevices);
  };

  const handleItemCheckBoxChange = ({
    checked,
    device,
  }: {
    checked: boolean;
    device: DeviceItemExtended;
  }) => {
    const newSelectedDevices = getNewDevices({
      devices: selectedDevices,
      device,
      checked,
    });
    handleSetSelectedDevices(newSelectedDevices);
  };

  if (isLoading) {
    return <Loading styles={{ wrapper: { flex: '1' } }} />;
  }

  const filteredDeviceList = deviceList.filter((device) =>
    (device?.properties?.basicInfo?.name ?? '').includes(keywords)
  );

  if (filteredDeviceList.length === 0) {
    return empty;
  }

  return (
    <Flex flexDirection="column" width="100%">
      <Checkbox
        isChecked={isAllChecked}
        isIndeterminate={isIndeterminate}
        onChange={(e) => handleAllCheckBoxChange(e.target.checked)}
        marginLeft="20px"
      >
        <Text {...textStyle}>全选</Text>
      </Checkbox>
      <Box flex={1} overflowY="auto">
        {filteredDeviceList.map((device) => {
          const { id, properties, hasSelected } = device;
          return (
            <Flex
              key={id}
              height="32px"
              paddingLeft="20px"
              alignItems="center"
              _hover={{ backgroundColor: 'grayAlternatives.50' }}
            >
              <Checkbox
                isChecked={checkedDevices.some((item) => item.id === id)}
                onChange={(e) => {
                  if (!hasSelected) {
                    handleItemCheckBoxChange({
                      checked: e.target.checked,
                      device,
                    });
                  }
                }}
                width="100%"
                cursor={hasSelected ? 'not-allowed' : 'pointer'}
                opacity={hasSelected ? '.5' : '1'}
              >
                <Flex alignItems="center">
                  <SmartObjectTwoToneIcon size={20} />
                  <Text marginLeft="6px" {...textStyle}>
                    {properties?.basicInfo?.name ?? ''}
                  </Text>
                </Flex>
              </Checkbox>
            </Flex>
          );
        })}
      </Box>
    </Flex>
  );
}
