import {
  Box,
  Flex,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { values } from 'lodash';
import { useEffect, useState } from 'react';

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
import { AttributeItem, TelemetryItem } from '@tkeel/console-types';
import { getTreeNodeData, TreeNodeData } from '@tkeel/console-utils';

import useDeviceDetailQuery from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery';

import DeviceConfigList from './DeviceConfigList';
import DeviceList from './DeviceList';

type DefaultValues = {
  parentType: string;
  parentId: string;
  deviceId: string;
  configId: string;
};
const DEFAULT_VALUES = {
  parentType: '',
  parentId: '',
  deviceId: '',
  configId: '',
};
interface Props {
  type?: 'auto' | 'telemetry' | 'attributes';
  operateType?: 'create' | 'edit';
  uid: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: ({
    device,
    configItem,
  }: {
    device: DeviceItem;
    configItem: AttributeItem | TelemetryItem | null;
  }) => void;
  isConfirmButtonLoading: boolean;
  defaultValues?: DefaultValues;
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
  padding: '12px 0',
  height: '463px',
  borderRadius: '4px',
  backgroundColor: 'gray.50',
};

export default function DeviceRelationModal({
  type = 'auto',
  uid,
  isOpen,
  onClose,
  onConfirm,
  isConfirmButtonLoading,
  defaultValues = DEFAULT_VALUES,
  operateType = 'create',
}: Props) {
  const [selectedDevice, setSelectedDevice] = useState<DeviceItem | null>(null);
  const [deviceGroupKeywords, setDeviceGroupKeywords] = useState('');
  const [configKeywords, setConfigKeywords] = useState('');
  const [configItem, setConfigItem] = useState<
    AttributeItem | TelemetryItem | null
  >(null);

  const [configList, setConfigList] = useState<
    AttributeItem[] | TelemetryItem[]
  >([]);
  const [deviceTemplateKeywords, setDeviceTemplateKeywords] = useState('');
  const [groupId, setGroupId] = useState('');
  const [treeNodeData, setTreeNodeData] = useState<TreeNodeData[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [templateId, setTemplateId] = useState('');
  const [templates, setTemplates] = useState<TemplateItem[]>([]);

  const [tabType, setTabType] = useState<'group' | 'template'>('group');
  const [deviceGroupConditions, setDeviceGroupConditions] = useState<
    RequestDataCondition[]
  >([]);
  const [deviceTemplateConditions, setDeviceTemplateConditions] = useState<
    RequestDataCondition[]
  >([]);
  const [deviceList, setDeviceList] = useState<DeviceItem[]>([]);
  const [initState, setInitState] = useState<boolean>(true);
  const { isLoading: isDeviceDetailFetching, deviceObject } =
    useDeviceDetailQuery({
      id: selectedDevice?.id ?? '',
      enabled: type !== 'auto' && !!selectedDevice?.id,
    });
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
      if (operateType !== 'edit' && key) {
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
      if (operateType !== 'edit' && id) {
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
      if (initState) {
        setSelectedDevice(
          items.find((v) => v.id === defaultValues?.deviceId) || null
        );
      }
    },
  });

  const handleSelectDevice = (device: DeviceItem) => {
    setSelectedDevice(device);
  };

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleConfigSearch = () => {};
  const handleSubmit = () => {
    onConfirm({ device: selectedDevice as DeviceItem, configItem });
  };

  const clearState = () => {
    setGroupId('');
    setTemplateId('');
    setDeviceGroupKeywords('');
    setDeviceTemplateKeywords('');
    setDeviceGroupConditions([]);
    setDeviceTemplateConditions([]);
    setConfigList([]);
    setDeviceList([]);
    setConfigItem(null);
  };
  useEffect(() => {
    if (deviceObject) {
      const telemetryList =
        values(deviceObject?.configs?.telemetry?.define?.fields) || [];
      const attributesList =
        values(deviceObject?.configs?.attributes?.define?.fields) || [];
      const defaultConfigList =
        type === 'telemetry' ? telemetryList : attributesList;
      setConfigList(defaultConfigList);
      if (initState) {
        setConfigItem(
          defaultConfigList.find((v) => v.id === defaultValues?.configId) ||
            null
        );
        setInitState(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceObject, type]);

  useEffect(() => {
    if (!isOpen) {
      clearState();
    } else if (operateType === 'edit') {
      const { parentId, parentType } = defaultValues;
      if (parentType === 'group') {
        setGroupId(parentId);
      } else {
        setTemplateId(parentId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    setSelectedDevice(null);
    setDeviceList([]);
    setGroupId('');
    setTemplateId('');
    setDeviceGroupKeywords('');
    setDeviceTemplateKeywords('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabType]);

  const isConfirmButtonDisabled =
    (type === 'auto' && !selectedDevice) ||
    (type !== 'auto' && Object.is(null, configItem));

  return (
    <Modal
      height="694px"
      width={type === 'auto' ? '600px' : '900px'}
      onConfirm={handleSubmit}
      title="自动映射"
      isOpen={isOpen}
      onClose={onClose}
      modalBodyStyle={{ padding: '20px' }}
      isConfirmButtonLoading={isConfirmButtonLoading}
      isConfirmButtonDisabled={isConfirmButtonDisabled}
    >
      <Flex justifyContent="space-between">
        <Flex flexDirection="column" width="540px" mr="20px">
          <Tabs display="flex" flexDirection="column" flex="1">
            <TabList display="flex" borderBottom="none">
              <CustomTab onClick={() => setTabType('group')}>
                <Text {...titleStyle}>设备组</Text>
              </CustomTab>
              <CustomTab
                marginLeft="30px"
                onClick={() => setTabType('template')}
              >
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
                  <Box width="50%" {...contentStyle}>
                    <DeviceGroupTree
                      isLoading={isDeviceGroupFetching}
                      treeNodeData={treeNodeData}
                      groupId={groupId}
                      keywords={deviceGroupKeywords}
                      setGroupId={(key: string) => setGroupId(key)}
                    />
                  </Box>
                  <Flex width="50%" marginLeft="20px" {...contentStyle}>
                    <DeviceList
                      uid={uid}
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
                  <Box {...contentStyle} overflowY="auto" width="50%">
                    <DeviceTemplates
                      isLoading={isDeviceTemplateFetching}
                      templates={templates}
                      templateId={templateId}
                      keywords={deviceTemplateKeywords}
                      onTemplateClick={(id) => setTemplateId(id)}
                    />
                  </Box>
                  <Flex ml="20px" width="50%" {...contentStyle}>
                    <DeviceList
                      uid={uid}
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
        {type !== 'auto' && (
          <Flex width="300px" flexDirection="column">
            <Flex justifyContent="space-between" alignItems="center">
              <Text {...titleStyle}>
                {type === 'telemetry' ? '遥测关系' : '属性关系'}
              </Text>
            </Flex>
            <SearchInput
              placeholder={`支持搜索${
                type === 'telemetry' ? '遥测' : '属性'
              }名称`}
              value={configKeywords}
              onChange={(value) => {
                setConfigKeywords(value);
              }}
              onSearch={handleConfigSearch}
              inputGroupStyle={inputGroupStyle}
            />
            <Flex {...contentStyle}>
              <DeviceConfigList
                selectedConfig={configItem}
                handleSelectConfig={(item) => {
                  setConfigItem(item);
                }}
                configKeywords={configKeywords}
                type={type}
                configList={configList}
                // deviceObject={deviceObject}
                isLoading={isDeviceDetailFetching}
              />
            </Flex>
          </Flex>
        )}
      </Flex>
    </Modal>
  );
}
