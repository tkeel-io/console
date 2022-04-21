import { Box, Flex, Text } from '@chakra-ui/react';

import { Empty, Loading } from '@tkeel/console-components';
import { SmartObjectTwoToneIcon } from '@tkeel/console-icons';
import { DeviceItem } from '@tkeel/console-request-hooks';

interface Props {
  isLoading: boolean;
  selectedDevice?: DeviceItem;
  deviceList: DeviceItem[];
  handleSelectDevice: (selectedDevice: DeviceItem) => void;
}
const textStyle = {
  color: 'gray.800',
  fontSize: '14px',
  lineHeight: '32px',
};
export default function DeviceList({
  isLoading,
  selectedDevice,
  deviceList,
  handleSelectDevice,
}: Props) {
  if (isLoading) {
    return <Loading styles={{ wrapper: { flex: '1' } }} />;
  }
  return (
    <Box flex="1" overflowY="auto">
      {deviceList.length > 0 ? (
        deviceList.map((device) => {
          const { id, properties } = device;
          const hasSelected = selectedDevice?.id === id;
          return (
            <Flex
              key={id}
              height="32px"
              paddingLeft="20px"
              alignItems="center"
              cursor="pointer"
              bg={hasSelected ? 'grayAlternatives.50' : ''}
              onClick={() => {
                handleSelectDevice(device);
              }}
              _hover={{ backgroundColor: 'grayAlternatives.50' }}
            >
              <SmartObjectTwoToneIcon size={20} />
              <Text marginLeft="6px" {...textStyle}>
                {properties?.basicInfo?.name ?? ''}
              </Text>
            </Flex>
          );
        })
      ) : (
        <Empty
          type="component"
          title={
            <Flex flexDirection="column" alignItems="center">
              <Text>该设备组暂无设备请</Text>
              <Text>重新选择</Text>
            </Flex>
          }
          styles={{
            wrapper: { width: '100%', height: '100%' },
          }}
        />
      )}
    </Box>
  );
}
