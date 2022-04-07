import { Flex, Text } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

import { Checkbox, Loading } from '@tkeel/console-components';
import { SmartObjectTwoToneIcon } from '@tkeel/console-icons';
import { DeviceItem } from '@tkeel/console-request-hooks';

import Empty from '@/tkeel-console-plugin-tenant-routing-rules/pages/Detail/components/DataSelect/Empty';

type Props = {
  groupId: string;
  isLoading: boolean;
  deviceList: DeviceItem[];
  selectedDevices: DeviceItem[];
  handleAllCheckBoxChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleItemCheckBoxChange: ({
    checked,
    device,
  }: {
    checked: boolean;
    device: DeviceItem;
  }) => void;
};

export default function DeviceList({
  groupId,
  isLoading,
  deviceList,
  selectedDevices,
  handleAllCheckBoxChange,
  handleItemCheckBoxChange,
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
    lineHeight: '24px',
  };

  if (isLoading) {
    return <Loading styles={{ wrapper: { flex: '1' } }} />;
  }

  if (deviceList.length === 0) {
    if (groupId) {
      return (
        <Empty
          text={
            <Flex flexDirection="column" alignItems="center">
              <Text>该设备组暂无设备请</Text>
              <Text>重新选择</Text>
            </Flex>
          }
          styles={{ wrapper: { width: '100%', height: '100%' } }}
        />
      );
    }

    return null;
  }

  return (
    <Flex flexDirection="column" paddingLeft="20px">
      <Checkbox
        isChecked={isAllChecked}
        isIndeterminate={isIndeterminate}
        onChange={handleAllCheckBoxChange}
      >
        <Text {...textStyle}>全选</Text>
      </Checkbox>
      {deviceList.map((device) => (
        <Flex key={device.id} margin="8px 0" alignItems="center">
          <Checkbox
            isChecked={checkedDevices.some((item) => item.id === device.id)}
            onChange={(e) =>
              handleItemCheckBoxChange({
                checked: e.target.checked,
                device,
              })
            }
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
    </Flex>
  );
}
