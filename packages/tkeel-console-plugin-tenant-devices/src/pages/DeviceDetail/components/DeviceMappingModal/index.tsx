import {
  Box,
  Flex,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

import CustomTab from '@tkeel/console-business-components/src/components/AddDevicesModal/CustomTab';
import DeviceGroupTree from '@tkeel/console-business-components/src/components/AddDevicesModal/DeviceGroupTree';
import DeviceTemplates from '@tkeel/console-business-components/src/components/AddDevicesModal/DeviceTemplates';
import { Modal, SearchInput } from '@tkeel/console-components';
import {
  DeviceItem,
  RequestDataCondition,
  TemplateItem,
  useDeviceGroupQuery,
  useDeviceListQuery,
  useTemplatesQuery,
} from '@tkeel/console-request-hooks';
import { getTreeNodeData, TreeNodeData } from '@tkeel/console-utils';

import DeviceList from './DeviceList';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (device: DeviceItem) => void;
}
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

export default function DeviceMappingModal({
  isOpen,
  onClose,
  onConfirm,
}: Props) {
  const [deviceGroupKeywords, setDeviceGroupKeywords] = useState('');
  const [deviceTemplateKeywords, setDeviceTemplateKeywords] = useState('');
  const [groupId, setGroupId] = useState('');
  const [treeNodeData, setTreeNodeData] = useState<TreeNodeData[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [templateId, setTemplateId] = useState('');
  const [templates, setTemplates] = useState<TemplateItem[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<DeviceItem>();
  const [tabType, setTabType] = useState<'group' | 'template'>('group');
  const [deviceGroupConditions, setDeviceGroupConditions] = useState<
    RequestDataCondition[]
  >([]);
  const [deviceTemplateConditions, setDeviceTemplateConditions] = useState<
    RequestDataCondition[]
  >([]);
  const [deviceList, setDeviceList] = useState<DeviceItem[]>([]);
  const handleDeviceGroupSearch = (keywords: string) => {
    setDeviceGroupKeywords(keywords);
    if (keywords) {
      setDeviceGroupConditions([
        {
          field: 'group.name',
          operator: '$wildcard',
          value: keywords,
        },
      ]);
    } else {
      setDeviceGroupConditions([]);
    }
    setGroupId('');
    setDeviceList([]);
  };
  const handleDeviceTemplateSearch = (keywords: string) => {
    setDeviceTemplateKeywords(keywords);
    if (keywords) {
      setDeviceTemplateConditions([
        {
          field: 'basicInfo.name',
          operator: '$wildcard',
          value: keywords,
        },
      ]);
    } else {
      setDeviceTemplateConditions([]);
    }
  };

  const { isFetching: isDeviceGroupFetching } = useDeviceGroupQuery({
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
  const { isFetching: isDeviceTemplateFetching } = useTemplatesQuery({
    requestData: {
      condition: deviceTemplateConditions,
    },
    onSuccess(data) {
      const items = data?.data?.listDeviceObject.items ?? [];
      setTemplates(items);
      const id = items[0]?.id;
      if (id) {
        setTemplateId(id);
      }
    },
  });

  // const tabTypeIsGroup = tabType === 'group';
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
      setDeviceList(items);
    },
  });

  const handleSelectDevice = (device: DeviceItem) => {
    setSelectedDevice(device);
  };
  const handleSubmit = () => {
    onConfirm(selectedDevice as DeviceItem);
  };
  return (
    <Modal
      height="694px"
      onConfirm={handleSubmit}
      title="自动映射"
      isOpen={isOpen}
      onClose={onClose}
      modalBodyStyle={{ padding: '20px' }}
      isConfirmButtonDisabled={!selectedDevice}
    >
      <Flex flexDirection="column" width="540px">
        <Tabs display="flex" flexDirection="column" flex="1">
          <TabList display="flex" borderBottom="none">
            <CustomTab onClick={() => setTabType('group')}>
              <Text {...titleStyle}>设备组</Text>
            </CustomTab>
            <CustomTab marginLeft="30px" onClick={() => setTabType('template')}>
              <Text {...titleStyle}>设备模板</Text>
            </CustomTab>
          </TabList>
          <TabPanels flex="1">
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
                    isLoading={isDeviceGroupFetching}
                    treeNodeData={treeNodeData}
                    groupId={groupId}
                    keywords={deviceGroupKeywords}
                    setGroupId={(key: string) => setGroupId(key)}
                  />
                </Box>
                <Flex marginLeft="20px" {...contentStyle}>
                  <DeviceList
                    isLoading={isDeviceListLoading}
                    selectedDevice={selectedDevice}
                    deviceList={deviceList}
                    handleSelectDevice={handleSelectDevice}
                  />
                </Flex>
              </Flex>
            </TabPanel>
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
                    isLoading={isDeviceTemplateFetching}
                    templates={templates}
                    templateId={templateId}
                    keywords={deviceTemplateKeywords}
                    onTemplateClick={(id) => setTemplateId(id)}
                  />
                </Box>
                <Flex ml="20px" {...contentStyle}>
                  <DeviceList
                    isLoading={isDeviceListLoading}
                    selectedDevice={selectedDevice}
                    deviceList={deviceList}
                    handleSelectDevice={handleSelectDevice}
                  />
                </Flex>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Modal>
  );
}
