import { Box, Flex, Text } from '@chakra-ui/react';
import { values } from 'lodash';

import { Empty, Loading } from '@tkeel/console-components';
import { DuotoneTwoToneIcon } from '@tkeel/console-icons';

import { DeviceObject } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';

const textStyle = {
  color: 'gray.800',
  fontSize: '14px',
  lineHeight: '32px',
};

interface Props {
  type: 'telemetry' | 'attribute';
  isLoading?: boolean;
  deviceObject: DeviceObject | undefined;
  // configList: TelemetryItem[] | AttributeItem[];
}

export default function DeviceConfigList({
  deviceObject,
  isLoading,
  type,
}: Props) {
  if (isLoading) {
    return <Loading styles={{ wrapper: { flex: '1' } }} />;
  }
  const telemetryList =
    values(deviceObject?.configs?.telemetry?.define?.fields) || [];
  const attributesList =
    values(deviceObject?.configs?.attributes?.define?.fields) || [];
  const configList = type === 'telemetry' ? telemetryList : attributesList;
  return (
    <Box flex="1" overflowY="auto">
      {configList.length > 0 ? (
        configList.map((item) => {
          const { id, name } = item;

          return (
            <Flex
              key={id}
              height="32px"
              paddingLeft="20px"
              alignItems="center"
              cursor="pointer"
              // bg={hasSelected ? 'grayAlternatives.50' : ''}
              onClick={() => {
                // if (uid !== id) {
                //   handleSelectDevice(device);
                // }
              }}
              _hover={{ backgroundColor: 'grayAlternatives.50' }}
            >
              <DuotoneTwoToneIcon size={20} />
              <Text marginLeft="6px" {...textStyle}>
                {name}
              </Text>
            </Flex>
          );
        })
      ) : (
        <Empty
          type="component"
          title={
            <Flex flexDirection="column" alignItems="center">
              <Text>该设备暂无{type === 'attribute' ? '属性' : '遥测'}</Text>
              <Text>请重新选择</Text>
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
