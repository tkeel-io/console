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
  isMultipleChoice?: boolean;
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

export default function CheckDeviceList({
  isLoading,
  empty = null,
  deviceList,
  keywords = '',
  selectedDevices,
  handleSetSelectedDevices,
  isMultipleChoice,
}: Props) {
  const checkedDevices = selectedDevices.filter(
    ({ id, hasSelected }) =>
      deviceList.some((device) => device.id === id) || hasSelected
  );

  const hasSelectedDevices = deviceList.filter(
    ({ hasSelected }) => hasSelected
  );

  const { length } = checkedDevices;
  const { length: hasSelectedLength } = hasSelectedDevices;
  const totalLength = length + hasSelectedLength;
  const hasDevices = totalLength > 0;
  const isAllChecked = hasDevices && totalLength === deviceList.length;
  const isIndeterminate = hasDevices && totalLength < deviceList.length;
  const textStyle = {
    color: 'gray.800',
    fontSize: '14px',
    lineHeight: '32px',
  };

  const handleAllCheckBoxChange = (checked: boolean) => {
    let newSelectedDevices = [];
    if (checked) {
      const addDevices = deviceList.filter(
        ({ id, hasSelected }) =>
          !selectedDevices.some((device) => device.id === id) && !hasSelected
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
    handleSetSelectedDevices(
      newSelectedDevices.filter((selectedDevice) => !selectedDevice.hasSelected)
    );
  };

  const handleRadioChange = (device: DeviceItemExtended) => {
    // const { id } = device;
    // setIsRadioId(id);
    handleSetSelectedDevices([device]);
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

  const selectAllDisabled =
    deviceList.filter((device) => device.hasSelected).length ===
    deviceList.length;

  return (
    <Flex flexDirection="column" width="100%">
      {isMultipleChoice && (
        <Checkbox
          isChecked={isAllChecked}
          isIndeterminate={isIndeterminate}
          onChange={(e) => {
            if (!selectAllDisabled) {
              handleAllCheckBoxChange(e.target.checked);
            }
          }}
          marginLeft="20px"
          cursor={selectAllDisabled ? 'not-allowed' : 'pointer'}
          opacity={selectAllDisabled ? '.5' : '1'}
        >
          <Text {...textStyle}>全选</Text>
        </Checkbox>
      )}
      <Box flex={1} overflowY="auto">
        {filteredDeviceList.map((device) => {
          const { id, properties, hasSelected } = device;
          return (
            <Flex
              key={id}
              height="32px"
              alignItems="center"
              _hover={{
                backgroundColor: hasSelected
                  ? 'transparent'
                  : 'grayAlternatives.50',
              }}
            >
              {isMultipleChoice ? (
                <Checkbox
                  paddingLeft="20px"
                  isChecked={
                    checkedDevices.some((item) => item.id === id) || hasSelected
                  }
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
              ) : (
                <Flex
                  alignItems="center"
                  paddingLeft="20px"
                  width="100%"
                  cursor="pointer"
                  bgColor={
                    selectedDevices[0]?.id === id
                      ? 'grayAlternatives.50'
                      : 'opacity'
                  }
                  onClick={() => {
                    handleRadioChange(device);
                  }}
                >
                  <SmartObjectTwoToneIcon size={20} />
                  <Text marginLeft="6px" {...textStyle}>
                    {properties?.basicInfo?.name ?? ''}
                  </Text>
                </Flex>
              )}
            </Flex>
          );
        })}
      </Box>
    </Flex>
  );
}
