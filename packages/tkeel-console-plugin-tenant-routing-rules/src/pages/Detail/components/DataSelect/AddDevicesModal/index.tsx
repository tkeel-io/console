import { Box, Flex, Text } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';

import { Loading, Modal, SearchInput, Tree } from '@tkeel/console-components';
import { BroomFilledIcon } from '@tkeel/console-icons';
import {
  DeviceItem,
  RequestDataCondition,
  useDeviceGroupQuery,
  useDeviceListQuery,
} from '@tkeel/console-request-hooks';
import { getTreeNodeData } from '@tkeel/console-utils';

import DeviceList from './DeviceList';
import SelectedDevices from './SelectedDevices';

type Props = {
  isOpen: boolean;
  onClose: () => unknown;
  onConfirm: (devices: DeviceItem[]) => unknown;
};

export default function AddDevicesModal({ isOpen, onClose, onConfirm }: Props) {
  const [deviceGroupKeywords, setDeviceGroupKeywords] = useState('');
  const [groupId, setGroupId] = useState('');
  const [deviceKeywords, setDeviceKeywords] = useState('');
  const [deviceGroupConditions, setDeviceGroupConditions] = useState<
    RequestDataCondition[]
  >([]);
  const [selectedDevices, setSelectedDevices] = useState<DeviceItem[]>([]);
  const [filteredSelectedDevices, setFilteredSelectedDevices] = useState<
    DeviceItem[]
  >([]);

  const { deviceGroupTree, isLoading: isDeviceGroupLoading } =
    useDeviceGroupQuery({
      requestData: {
        condition: deviceGroupConditions,
      },
    });

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
    setDeviceGroupConditions([
      {
        field: 'group.name',
        operator: '$wildcard',
        value: deviceGroupKeywords,
      },
    ]);
  };

  const searchDevicesByKeywords = ({
    devices,
    keywords = deviceKeywords,
  }: {
    devices: DeviceItem[];
    keywords?: string;
  }) => {
    return devices.filter((device) =>
      (device.properties?.basicInfo?.name || '').includes(keywords)
    );
  };

  const handleDeviceSearch = () => {
    const newFilteredSelectedDevices = searchDevicesByKeywords({
      devices: selectedDevices,
    });

    setFilteredSelectedDevices(newFilteredSelectedDevices);
  };

  const treeNodeData = getTreeNodeData({ data: deviceGroupTree });

  const handleSetSelectedDevices = (devices: DeviceItem[]) => {
    setSelectedDevices(devices);
    setFilteredSelectedDevices(searchDevicesByKeywords({ devices }));
  };

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
    handleSetSelectedDevices(newSelectedDevices);
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
    handleSetSelectedDevices(newSelectedDevices);
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

  const contentStyle = {
    flex: '1',
    padding: '12px 0',
    height: '463px',
    borderRadius: '4px',
    backgroundColor: 'gray.50',
  };

  return (
    <Modal
      title="添加设备"
      width="900px"
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={() => onConfirm(selectedDevices)}
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
                <DeviceList
                  deviceList={deviceList}
                  selectedDevices={selectedDevices}
                  handleAllCheckBoxChange={handleAllCheckBoxChange}
                  handleItemCheckBoxChange={handleItemCheckBoxChange}
                />
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
                handleSetSelectedDevices([]);
                setDeviceKeywords('');
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
              devices={filteredSelectedDevices}
              removeDevice={(deviceId) => {
                handleSetSelectedDevices(
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
