import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { Loading, Modal, SearchInput, Tree } from '@tkeel/console-components';
import { BroomFilledIcon, FileBoxTwoToneIcon } from '@tkeel/console-icons';
import { values } from 'lodash';
import { DataNode, Key } from 'node_modules/rc-tree/es/interface';

import useCreateSubscribeEntitiesDeviceMutation from '@/tkeel-console-plugin-tenant-data-subscription/hooks/mutations/useCreateSubscribeEntitiesDeviceMutation';
import useCreateSubscribeEntitiesTemplateMutation from '@/tkeel-console-plugin-tenant-data-subscription/hooks/mutations/useCreateSubscribeEntitiesTemplateMutation';
import useDeviceGroupQuery, {
  RequestParams,
  TreeNodeData,
  TreeNodeType,
} from '@/tkeel-console-plugin-tenant-data-subscription/hooks/queries/useDeviceGroupQuery';
import useDeviceTemplateQuery, {
  TemplateTreeNodeDataType,
  TemplateTreeNodeType,
} from '@/tkeel-console-plugin-tenant-data-subscription/hooks/queries/useDeviceTemplateQuery';

type Props = {
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  onClose: () => unknown;
  onConfirm: () => unknown;
};

export interface FormFields {
  role?: {
    disabled?: boolean;
  };

  plugins?: {
    disabled?: boolean;
  };
}

export interface FormValues {
  role: string;
  plugins: string[];
}

type SelectedKeyCheck =
  | Key[]
  | {
      checked: Key[];
      halfChecked: Key[];
    };

function getTreeNodeData(data: TreeNodeType): TreeNodeData[] {
  return values(data).map((item) => {
    const { nodeInfo, subNode } = item;
    const { id, properties } = nodeInfo;
    return {
      title: properties?.group?.name ?? '暂无数据',
      id,
      children: getTreeNodeData(subNode),
      originData: item,
      key: id,
    };
  });
}

function getTemplateTreeNodeData(
  data: TemplateTreeNodeType
): TemplateTreeNodeDataType[] {
  return values(data).map((item) => {
    return {
      title: item?.properties?.basicInfo?.name,
      id: item?.id,
      key: item?.id,
    };
  });
}

export default function CreateDeviceModal({
  isOpen,
  isConfirmButtonLoading,
  onClose,
  onConfirm,
}: Props) {
  const [defaultRequestParams, setDefaultRequestParams] =
    useState<RequestParams>({
      page_num: 1,
      page_size: 1000,
      order_by: 'name',
      is_descending: false,
      query: '',
      condition: [
        {
          field: 'type',
          operator: '$eq',
          value: 'group',
        },
      ],
    });

  const [defaultTemplateRequestParams, setDefaultTemplateRequestParams] =
    useState<RequestParams>({
      page_num: 1,
      page_size: 1000,
      order_by: 'name',
      is_descending: false,
      query: '',
      condition: [
        {
          field: 'type',
          operator: '$eq',
          value: 'template',
        },
      ],
    });

  const [keywords, setKeywords] = useState('');
  const [selectNode, setSelectNode] = useState<DataNode[]>();
  const [selectedKeys, setSelectedKeys] = useState<SelectedKeyCheck>([]);
  const [selectIndex, setSelectIndex] = useState<number>(0);

  const location = useLocation();
  const { pathname }: { pathname: string } = location;
  const ID = pathname.split('/')[pathname.split('/').length - 1];

  const { groupTree, isLoading } = useDeviceGroupQuery(defaultRequestParams);
  const treeNodeData = getTreeNodeData(groupTree);

  const { items } = useDeviceTemplateQuery(defaultTemplateRequestParams);
  const templateTreeNodeData = getTemplateTreeNodeData(items);

  const {
    mutate: createSubscribeEntitiesDeviceMutate,
    isSuccess: deviceIsSuccess,
  } = useCreateSubscribeEntitiesDeviceMutation({
    onSuccess() {},
    id: ID,
  });

  const {
    mutate: createSubscribeEntitiesTemplateMutation,
    isSuccess: templateIsSuccess,
  } = useCreateSubscribeEntitiesTemplateMutation({
    onSuccess() {},
    id: ID,
  });

  const handleConfirm = async () => {
    if (selectIndex === 0) {
      createSubscribeEntitiesDeviceMutate({
        data: { groups: selectedKeys as string[] },
      });
      if (deviceIsSuccess) {
        onConfirm();
      }
    } else {
      createSubscribeEntitiesTemplateMutation({
        data: { models: selectedKeys as string[] },
      });
      if (templateIsSuccess) {
        onConfirm();
      }
    }

    if (selectIndex && keywords) {
      onConfirm();
    }

    // }
  };

  const getSelectNode = (data: DataNode[]) => {
    const arr: DataNode[] = [];
    data.forEach((el) => {
      const { children } = el;
      if (Array.isArray(children) && children.length > 0) {
        getSelectNode(children);
        return;
      }
      arr.push(el);
    });
    return arr;
  };

  return (
    <Modal
      title="添加设备"
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={onClose}
      onConfirm={handleConfirm}
      width="900px"
    >
      <Flex>
        <Box flex="1">
          <Tabs
            isFitted
            variant="unstyled"
            onChange={(index) => {
              setSelectNode([]);
              setSelectedKeys([]);
              setSelectIndex(index);
            }}
          >
            <TabList>
              <Tab _selected={{ color: 'green.300', boxShadow: 'none' }}>
                设备组
              </Tab>
              <Tab _selected={{ color: 'green.300', boxShadow: 'none' }}>
                设备模板
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <SearchInput
                  width="100%"
                  placeholder="搜索设备组"
                  onSearch={(value) => {
                    setDefaultRequestParams({
                      ...defaultRequestParams,
                      query: value,
                    });
                  }}
                />

                {!isLoading ? (
                  <Tree
                    style={{ marginTop: '16px' }}
                    icon={FileBoxTwoToneIcon}
                    checkable
                    treeData={treeNodeData}
                    checkedKeys={selectedKeys}
                    onCheck={(keys, el) => {
                      const { checkedNodes } = el;
                      setSelectNode(getSelectNode(checkedNodes));
                      setSelectedKeys(keys);
                    }}
                  />
                ) : (
                  <Loading styles={{ wrapper: { height: '100%' } }} />
                )}
              </TabPanel>
              <TabPanel>
                <SearchInput
                  width="100%"
                  placeholder="搜索设备模板"
                  onSearch={(value) => {
                    setDefaultTemplateRequestParams({
                      ...defaultTemplateRequestParams,
                      query: value,
                    });
                  }}
                />
                <Tree
                  style={{ marginTop: '16px' }}
                  icon={FileBoxTwoToneIcon}
                  checkable
                  treeData={templateTreeNodeData}
                  checkedKeys={selectedKeys}
                  onCheck={(keys, el) => {
                    const { checkedNodes } = el;
                    setSelectNode(checkedNodes);
                    setSelectedKeys(keys);
                  }}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <Flex flex="1" flexDirection="column">
          <Flex
            justifyContent="space-between"
            alignItems="center"
            mt="12px"
            mb="19px"
          >
            <Text>已选中</Text>
            <Flex alignItems="center">
              <BroomFilledIcon />
              清空
            </Flex>
          </Flex>

          <SearchInput
            width="100%"
            placeholder="搜索"
            onSearch={(value) => setKeywords(value)}
          />

          <Tree
            style={{ marginTop: '16px' }}
            icon={FileBoxTwoToneIcon}
            checkable
            treeData={selectNode}
            checkedKeys={selectedKeys}
            onCheck={(keys) => {
              setSelectedKeys(keys);
            }}
          />
        </Flex>
      </Flex>
    </Modal>
  );
}
