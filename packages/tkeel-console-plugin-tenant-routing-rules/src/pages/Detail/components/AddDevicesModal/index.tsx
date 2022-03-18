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

import SelectedDevices from './SelectedDevices';

type Props = {
  isOpen: boolean;
  onClose: () => unknown;
  onConfirm: () => unknown;
};

export default function AddDevicesModal({ isOpen, onClose, onConfirm }: Props) {
  const [deviceGroupKeywords, setDeviceGroupKeywords] = useState('');
  const [groupId, setGroupId] = useState('');
  const [deviceKeywords, setDeviceKeywords] = useState('');
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

  const treeNodeData = getTreeNodeData({ data: deviceGroupTree });

  const handleAllCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
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
    const newSelectedDevices = getNewDevices({
      devices: selectedDevices,
      device,
      checked,
    });
    setSelectedDevices(newSelectedDevices);
  };

  const checkedDevices = selectedDevices.filter(({ id }) =>
    deviceList.some((device) => device.id === id)
  );
  const isAllChecked = checkedDevices.length === deviceList.length;
  const isIndeterminate =
    checkedDevices.length > 0 && checkedDevices.length < deviceList.length;

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
            <Box {...contentStyle}>
              {isDeviceGroupLoading ? (
                <Loading styles={{ wrapper: { height: '100%' } }} />
              ) : (
                <Tree
                  extras={{ isTreeTitleFullWidth: true }}
                  treeData={treeNodeData}
                  selectedKeys={[groupId]}
                  selectable
                  showIcon
                  onSelect={(_, info) => {
                    const key = info.node.key as string;
                    if (key && key !== groupId) {
                      setGroupId(key);
                    }
                  }}
                  styles={{
                    treeNodeContentWrapper: 'flex: 1',
                    treeTitle: 'font-size:14px; line-height: 32px;',
                  }}
                />
              )}
            </Box>
            <Flex marginLeft="20px" {...contentStyle}>
              {isDeviceListLoading ? (
                <Loading styles={{ wrapper: { flex: '1' } }} />
              ) : (
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
            <Flex
              alignItems="center"
              cursor="pointer"
              onClick={() => {
                setSelectedDevices([]);
              }}
            >
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
            <SelectedDevices
              devices={selectedDevices}
              removeDevice={(deviceId) => {
                setSelectedDevices(
                  selectedDevices.filter((device) => device.id !== deviceId)
                );
              }}
            />
          </Box>
        </Flex>
      </Flex>
    </Modal>
  );
}
