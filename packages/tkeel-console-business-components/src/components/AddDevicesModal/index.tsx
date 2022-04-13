import {
  Box,
  Flex,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { Modal, SearchInput } from '@tkeel/console-components';
import { BroomFilledIcon } from '@tkeel/console-icons';
import {
  RequestDataCondition,
  TemplateItem,
  useDeviceGroupQuery,
  useDeviceListQuery,
  useTemplatesQuery,
} from '@tkeel/console-request-hooks';
import { getTreeNodeData, TreeNodeData } from '@tkeel/console-utils';

import CheckDeviceList, { DeviceItemExtended } from './CheckDeviceList';
import CustomTab from './CustomTab';
import DeviceGroupTree from './DeviceGroupTree';
import DeviceTemplates from './DeviceTemplates';
import Empty from './Empty';
import SelectedDevices from './SelectedDevices';

export interface Device {
  id: string;
  name: string;
  status: 'online' | 'offline';
  templateName: string;
  parentName: string;
}

type Props = {
  type?: 'group' | 'template' | 'all';
  isOpen: boolean;
  onClose: () => unknown;
  isLoading: boolean;
  hasSelectedDeviceIds?: string[];
  onConfirm: (devices: DeviceItemExtended[]) => unknown;
};

export default function AddDevicesModal({
  type = 'all',
  isOpen,
  onClose,
  isLoading,
  hasSelectedDeviceIds = [],
  onConfirm,
}: Props) {
  const [tabType, setTabType] = useState<'group' | 'template'>(
    type === 'template' ? 'template' : 'group'
  );
  const [deviceGroupKeywords, setDeviceGroupKeywords] = useState('');
  const [deviceTemplateKeywords, setDeviceTemplateKeywords] = useState('');
  const [treeNodeData, setTreeNodeData] = useState<TreeNodeData[]>([]);
  const [templates, setTemplates] = useState<TemplateItem[]>([]);
  const [groupId, setGroupId] = useState('');
  const [templateId, setTemplateId] = useState('');
  const [deviceKeywords, setDeviceKeywords] = useState('');
  const [deviceGroupConditions, setDeviceGroupConditions] = useState<
    RequestDataCondition[]
  >([]);
  const [deviceTemplateConditions, setDeviceTemplateConditions] = useState<
    RequestDataCondition[]
  >([]);
  const [deviceList, setDeviceList] = useState<DeviceItemExtended[]>([]);
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
    enabled: ['group', 'all'].includes(type),
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

  const { isLoading: isDeviceTemplateLoading } = useTemplatesQuery({
    requestData: {
      condition: deviceTemplateConditions,
    },
    enabled: ['template', 'all'].includes(type),
    onSuccess(data) {
      const items = data?.data?.listDeviceObject.items ?? [];
      setTemplates(items);
      const id = items[0]?.id;
      if (id) {
        setTemplateId(id);
      }
    },
  });

  const tabTypeIsGroup = tabType === 'group';
  const tabTypeIsTemplate = tabType === 'template';

  const { isLoading: isDeviceListLoading } = useDeviceListQuery({
    requestData: {
      condition: [
        {
          field: tabTypeIsTemplate
            ? 'basicInfo.templateId'
            : 'sysField._spacePath',
          operator: '$wildcard',
          value: tabTypeIsTemplate ? templateId : groupId,
        },
      ],
    },
    enabled: tabTypeIsTemplate ? !!templateId : !!groupId,
    onSuccess(data) {
      const items = data?.data?.listDeviceObject?.items ?? [];
      const devices = items.map((device) => ({
        ...device,
        hasSelected: hasSelectedDeviceIds.includes(device.id),
      }));
      setDeviceList(devices);
    },
  });

  const clearState = () => {
    setGroupId('');
    setTemplateId('');
    setDeviceGroupKeywords('');
    setDeviceTemplateKeywords('');
    setDeviceGroupConditions([]);
    setDeviceTemplateConditions([]);
    setDeviceList([]);
    setSelectedDevices([]);
    setDeviceKeywords('');
    setFilteredSelectedDevices([]);
  };

  const handleDeviceGroupSearch = (keywords: string) => {
    setDeviceGroupKeywords(keywords);
    setDeviceGroupConditions([
      {
        field: 'group.name',
        operator: '$wildcard',
        value: keywords,
      },
    ]);
  };

  const handleDeviceTemplateSearch = () => {
    setDeviceTemplateConditions([
      {
        field: 'basicInfo.name',
        operator: '$wildcard',
        value: deviceTemplateKeywords,
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

  useEffect(() => {
    handleSetSelectedDevices([]);
    setDeviceKeywords('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabType]);

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
          <Tabs display="flex" flexDirection="column" flex="1">
            <TabList display="flex" borderBottom="none">
              {type === 'group' && (
                <CustomTab _selected={{}} cursor="default">
                  <Text {...titleStyle}>设备组</Text>
                </CustomTab>
              )}
              {type === 'template' && (
                <CustomTab _selected={{}} cursor="default">
                  <Text {...titleStyle}>设备模板</Text>
                </CustomTab>
              )}
              {type === 'all' && (
                <>
                  <CustomTab onClick={() => setTabType('group')}>
                    <Text {...titleStyle}>设备组</Text>
                  </CustomTab>
                  <CustomTab
                    marginLeft="30px"
                    onClick={() => setTabType('template')}
                  >
                    <Text {...titleStyle}>设备模板</Text>
                  </CustomTab>
                </>
              )}
            </TabList>
            <TabPanels flex="1">
              {type !== 'template' && (
                <TabPanel height="100%" padding="0">
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
                      <CheckDeviceList
                        isLoading={isDeviceListLoading}
                        empty={
                          groupId ? (
                            <Empty
                              text={
                                <Flex
                                  flexDirection="column"
                                  alignItems="center"
                                >
                                  <Text>该设备组暂无设备请</Text>
                                  <Text>重新选择</Text>
                                </Flex>
                              }
                              styles={{
                                wrapper: { width: '100%', height: '100%' },
                              }}
                            />
                          ) : null
                        }
                        deviceList={deviceList}
                        selectedDevices={selectedDevices}
                        handleSetSelectedDevices={handleSetSelectedDevices}
                      />
                    </Flex>
                  </Flex>
                </TabPanel>
              )}
              <TabPanel height="100%" padding="0">
                <SearchInput
                  placeholder="支持搜索模板名称"
                  value={deviceTemplateKeywords}
                  onChange={(value) => {
                    setDeviceTemplateKeywords(value);
                  }}
                  onSearch={handleDeviceTemplateSearch}
                  inputGroupStyle={inputGroupStyle}
                />
                <Flex justifyContent="space-between">
                  <Box {...contentStyle} overflowY="auto">
                    <DeviceTemplates
                      isLoading={isDeviceTemplateLoading}
                      templates={templates}
                      templateId={templateId}
                      onTemplateClick={(id) => setTemplateId(id)}
                    />
                  </Box>
                  <Flex marginLeft="20px" {...contentStyle}>
                    <CheckDeviceList
                      isLoading={isDeviceListLoading}
                      empty={
                        templateId ? (
                          <Empty
                            text={
                              <Flex flexDirection="column" alignItems="center">
                                <Text>该模板暂无设备请</Text>
                                <Text>重新选择</Text>
                              </Flex>
                            }
                            styles={{
                              wrapper: { width: '100%', height: '100%' },
                            }}
                          />
                        ) : null
                      }
                      deviceList={deviceList}
                      selectedDevices={selectedDevices}
                      handleSetSelectedDevices={handleSetSelectedDevices}
                    />
                  </Flex>
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
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
              type={tabType}
              hasSelectedGroupOrTemplate={
                (tabTypeIsGroup && !!groupId) ||
                (tabTypeIsTemplate && !!templateId)
              }
              keywords={deviceKeywords}
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
