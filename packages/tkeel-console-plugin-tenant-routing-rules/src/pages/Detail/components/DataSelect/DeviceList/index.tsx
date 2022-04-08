import { Box, Flex, Text } from '@chakra-ui/react';

import { Checkbox, Loading } from '@tkeel/console-components';
import { SmartObjectTwoToneIcon } from '@tkeel/console-icons';
import { DeviceItem } from '@tkeel/console-request-hooks';

type Props = {
  isLoading: boolean;
  empty?: JSX.Element | null;
  deviceList: DeviceItem[];
  selectedDevices: DeviceItem[];
  handleSetSelectedDevices: (selectedDevices: DeviceItem[]) => unknown;
};

const getNewDevices = ({
  devices,
  device,
  checked,
}: {
  devices: DeviceItem[];
  device: DeviceItem;
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
        ({ id }) => !deviceList.some((device) => device.id === id)
      );
    }
    handleSetSelectedDevices(newSelectedDevices);
  };

  const handleItemCheckBoxChange = ({
    checked,
    device,
  }: {
    checked: boolean;
    device: DeviceItem;
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

  if (deviceList.length === 0) {
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
        {deviceList.map((device) => (
          <Flex
            key={device.id}
            height="32px"
            paddingLeft="20px"
            alignItems="center"
            _hover={{ backgroundColor: 'grayAlternatives.50' }}
          >
            <Checkbox
              isChecked={checkedDevices.some((item) => item.id === device.id)}
              onChange={(e) =>
                handleItemCheckBoxChange({
                  checked: e.target.checked,
                  device,
                })
              }
              width="100%"
            >
              <Flex alignItems="center">
                <SmartObjectTwoToneIcon size={20} />
                <Text marginLeft="6px" {...textStyle}>
                  {device?.properties?.basicInfo?.name ?? ''}
                </Text>
              </Flex>
            </Checkbox>
          </Flex>
        ))}
      </Box>
    </Flex>
  );
}
