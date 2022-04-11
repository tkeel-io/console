import { Box, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { Modal, SearchInput } from '@tkeel/console-components';
import { BroomFilledIcon } from '@tkeel/console-icons';
import {
  RequestDataCondition,
  useDeviceGroupQuery,
  useDeviceListQuery,
} from '@tkeel/console-request-hooks';
import { getTreeNodeData, TreeNodeData } from '@tkeel/console-utils';

// import useRuleDevicesIdArrayQuery from '@/tkeel-console-plugin-tenant-routing-rules/hooks/queries/useRuleDevicesIdArrayQuery';
import DeviceList, { DeviceItemExtended } from '../DeviceList';
import Empty from '../Empty';
import DeviceGroupTree from './DeviceGroupTree';
import SelectedDevices from './SelectedDevices';

export interface Device {
  id: string;
  name: string;
  status: 'online' | 'offline';
  templateName: string;
  parentName: string;
}

type Props = {
  isOpen: boolean;
  onClose: () => unknown;
  isLoading: boolean;
  onConfirm: (devices: DeviceItemExtended[]) => unknown;
};

export default function AddGroupDevicesModal({
  isOpen,
  onClose,
  isLoading,
  onConfirm,
}: Props) {
  const [deviceGroupKeywords, setDeviceGroupKeywords] = useState('');
  const [treeNodeData, setTreeNodeData] = useState<TreeNodeData[]>([]);
  const [groupId, setGroupId] = useState('');
  const [deviceKeywords, setDeviceKeywords] = useState('');
  const [deviceGroupConditions, setDeviceGroupConditions] = useState<
    RequestDataCondition[]
  >([]);
  const [selectedDevices, setSelectedDevices] = useState<DeviceItemExtended[]>(
    []
  );
  const [filteredSelectedDevices, setFilteredSelectedDevices] = useState<
    DeviceItemExtended[]
  >([]);

  const { isLoading: isDeviceGroupLoading } = useDeviceGroupQuery({
    requestData: {
      condition: deviceGroupConditions,
    },
    onSuccess(data) {
      const groupTree = data?.data?.GroupTree ?? {};
      const groupTreeNodeData = getTreeNodeData({ data: groupTree });
      setTreeNodeData(groupTreeNodeData);
      const key = groupTreeNodeData[0]?.key;
      if (key) {
        setGroupId(key);
      }
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

  const clearState = () => {
    setGroupId('');
    setDeviceGroupConditions([]);
    setSelectedDevices([]);
    setDeviceKeywords('');
    setFilteredSelectedDevices([]);
  };

  const handleDeviceGroupSearch = () => {
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
    devices: DeviceItemExtended[];
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

  const handleSetSelectedDevices = (devices: DeviceItemExtended[]) => {
    setSelectedDevices(devices);
    setFilteredSelectedDevices(searchDevicesByKeywords({ devices }));
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

  useEffect(() => {
    if (!isOpen) {
      clearState();
    }
  }, [isOpen]);

  return (
    <Modal
      title="添加设备"
      width="900px"
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={() =>
        onConfirm(selectedDevices.filter((device) => !device.hasSelected))
      }
      isConfirmButtonLoading={isLoading}
      isConfirmButtonDisabled={selectedDevices.length === 0}
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
              <DeviceGroupTree
                isLoading={isDeviceGroupLoading}
                treeNodeData={treeNodeData}
                groupId={groupId}
                setGroupId={(key: string) => setGroupId(key)}
              />
            </Box>
            <Flex marginLeft="20px" {...contentStyle}>
              <DeviceList
                isLoading={isDeviceListLoading}
                empty={
                  groupId ? (
                    <Empty
                      text={
                        <Flex flexDirection="column" alignItems="center">
                          <Text>该设备组暂无设备请</Text>
                          <Text>重新选择</Text>
                        </Flex>
                      }
                      styles={{ wrapper: { width: '100%', height: '100%' } }}
                    />
                  ) : null
                }
                deviceList={deviceList}
                selectedDevices={selectedDevices}
                handleSetSelectedDevices={handleSetSelectedDevices}
              />
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
              groupId={groupId}
              devices={filteredSelectedDevices}
              removeDevice={(deviceId) => {
                handleSetSelectedDevices(
                  selectedDevices.filter((device) => device.id !== deviceId)
                );
              }}
              styles={{ wrapper: { height: '439px' } }}
            />
          </Box>
        </Flex>
      </Flex>
    </Modal>
  );
}
