import { Box, Flex, Text } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';

import {
  Checkbox,
  Loading,
  Modal,
  SearchInput,
  Tree,
} from '@tkeel/console-components';
import { BroomFilledIcon, SmartObjectTwoToneIcon } from '@tkeel/console-icons';
import {
  DeviceItem,
  useDeviceGroupQuery,
  useDeviceListQuery,
} from '@tkeel/console-request-hooks';
import { getTreeNodeData } from '@tkeel/console-utils';

type Props = {
  isOpen: boolean;
  onClose: () => unknown;
  onConfirm: () => unknown;
};

export default function AddDevicesModal({ isOpen, onClose, onConfirm }: Props) {
  const [deviceGroupKeywords, setDeviceGroupKeywords] = useState('');
  const [groupId, setGroupId] = useState('');
  const [deviceKeywords, setDeviceKeywords] = useState('');
  const [checkedDevices, setCheckedDevices] = useState<DeviceItem[]>([]);
  const [selectedDevices, setSelectedDevices] = useState<DeviceItem[]>([]);

  const { deviceGroupTree, isLoading: isDeviceGroupLoading } =
    useDeviceGroupQuery();
  const { deviceList, isLoading: isDeviceListLoading } = useDeviceListQuery({
    requestData: {
      condition: [
        {
          field: 'sysField._spacePath',
          operator: '$wildcard',
          value: groupId,
        },
      ],
    },
    enabled: Boolean(groupId),
  });

  const handleDeviceGroupSearch = () => {
    // eslint-disable-next-line no-console
    console.log('deviceGroupKeywords', deviceGroupKeywords);
  };

  const handleDeviceSearch = () => {
    // eslint-disable-next-line no-console
    console.log('deviceKeywords', deviceKeywords);
  };

  const titleStyle = {
    color: 'gray.800',
    fontSize: '14px',
    lineHeight: '24px',
    fontWeight: '600',
  };

  const inputGroupStyle = {
    marginTop: '8px',
    marginBottom: '12px',
    width: '100%',
  };

  const treeNodeData = getTreeNodeData({ data: deviceGroupTree });

  const handleSelectGroup = (selectedKeys: React.Key[]) => {
    const id = selectedKeys[0] as string;
    setGroupId(id);
  };

  const handleAllCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    let newSelectedDevices = [];
    if (checked) {
      setCheckedDevices([...deviceList]);
      const addDevices = deviceList.filter(
        ({ id }) => !selectedDevices.some((device) => device.id === id)
      );
      newSelectedDevices = [...selectedDevices, ...addDevices];
    } else {
      setCheckedDevices([]);
      newSelectedDevices = selectedDevices.filter(
        ({ id }) => !selectedDevices.some((device) => device.id === id)
      );
    }
    setSelectedDevices(newSelectedDevices);
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

  const handleItemCheckBoxChange = ({
    checked,
    device,
  }: {
    checked: boolean;
    device: DeviceItem;
  }) => {
    const newCheckedDevices = getNewDevices({
      devices: checkedDevices,
      device,
      checked,
    });
    const newSelectedDevices = getNewDevices({
      devices: selectedDevices,
      device,
      checked,
    });
    setCheckedDevices(newCheckedDevices);
    setSelectedDevices(newSelectedDevices);
  };

  const contentStyle = {
    flex: '1',
    padding: '12px 0',
    height: '463px',
    borderRadius: '4px',
    backgroundColor: 'gray.50',
  };

  const textStyle = {
    color: 'gray.800',
    fontSize: '14px',
    lineHeight: '24px',
  };

  return (
    <Modal
      title="添加设备"
      width="900px"
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      modalBodyStyle={{ padding: '20px' }}
    >
      <Flex justifyContent="space-between">
        <Flex flexDirection="column" width="540px">
          <Text {...titleStyle}>设备组</Text>
          <SearchInput
            placeholder="支持搜索设备分组名称"
            value={deviceGroupKeywords}
            onChange={(value) => {
              setDeviceGroupKeywords(value);
            }}
            onSearch={handleDeviceGroupSearch}
            inputGroupStyle={inputGroupStyle}
          />
          <Flex justifyContent="space-between">
            <Flex {...contentStyle}>
              {isDeviceGroupLoading ? (
                <Loading styles={{ wrapper: { flex: '1' } }} />
              ) : (
                <Tree
                  extras={{ isTreeTitleFullWidth: true }}
                  treeData={treeNodeData}
                  selectedKeys={[groupId]}
                  selectable
                  showIcon
                  onSelect={handleSelectGroup}
                  styles={{
                    treeTitle: 'font-size:14px; line-height: 32px;',
                  }}
                />
              )}
            </Flex>
            <Flex marginLeft="20px" {...contentStyle}>
              {isDeviceListLoading ? (
                <Loading styles={{ wrapper: { flex: '1' } }} />
              ) : (
                <Flex flexDirection="column" paddingLeft="20px">
                  <Checkbox
                    isChecked={checkedDevices.length === deviceList.length}
                    isIndeterminate={
                      checkedDevices.length > 0 &&
                      checkedDevices.length < deviceList.length
                    }
                    onChange={handleAllCheckBoxChange}
                  >
                    <Text {...textStyle}>全选</Text>
                  </Checkbox>
                  {deviceList.map((device) => (
                    <Flex key={device.id} margin="8px 0" alignItems="center">
                      <Checkbox
                        isChecked={checkedDevices.some(
                          (item) => item.id === device.id
                        )}
                        onChange={(e) =>
                          handleItemCheckBoxChange({
                            checked: e.target.checked,
                            device,
                          })
                        }
                      >
                        <Flex alignItems="center">
                          <SmartObjectTwoToneIcon />
                          <Text marginLeft="6px" {...textStyle}>
                            {device?.properties?.basicInfo?.name ?? ''}
                          </Text>
                        </Flex>
                      </Checkbox>
                    </Flex>
                  ))}
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>
        <Flex flexDirection="column" width="300px">
          <Flex justifyContent="space-between" alignItems="center">
            <Text {...titleStyle}>已选择（{selectedDevices.length}）</Text>
            <Flex alignItems="center" cursor="pointer">
              <BroomFilledIcon size="14px" color="grayAlternatives.300" />
              <Text
                marginLeft="5px"
                color="gray.700"
                fontSize="12px"
                lineHeight="18px"
              >
                清空
              </Text>
            </Flex>
          </Flex>
          <SearchInput
            placeholder="支持搜索设备名称"
            value={deviceKeywords}
            onChange={(value) => {
              setDeviceKeywords(value);
            }}
            onSearch={handleDeviceSearch}
            inputGroupStyle={inputGroupStyle}
          />
          <Box {...contentStyle}>
            {selectedDevices.map((device) => (
              <Flex key={device.id} alignItems="center">
                <SmartObjectTwoToneIcon />
                <Text {...textStyle}>
                  {device?.properties?.basicInfo?.name ?? ''}
                </Text>
              </Flex>
            ))}
          </Box>
        </Flex>
      </Flex>
    </Modal>
  );
}
