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
import { values } from 'lodash';
import { DataNode, Key } from 'node_modules/rc-tree/es/interface';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
  Empty,
  Loading,
  Modal,
  SearchInput,
  Tree,
} from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';
import {
  BroomFilledIcon,
  FolderCloseTwoToneIcon,
  FolderOpenTwoToneIcon,
} from '@tkeel/console-icons';

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

function assembleTree(nodes: TreeNodeData[], defaultPath: string) {
  return nodes.map((n) => {
    const node = n;
    const path = defaultPath ? `${defaultPath}/${n.title}` : n.title;
    node.path = path;
    if (n.children && Array.isArray(n.children)) {
      assembleTree(n.children, path);
    }
    return node;
  });
}
export default function CreateDeviceModal({
  isOpen,
  isConfirmButtonLoading,
  onClose,
  onConfirm,
}: Props) {
  const selectedColor = useColor('primary');
  const selectedTwoTone = useColor('primarySub2');
  const unselectedColor = useColor('gray.700');
  const unselectedTwoTone = useColor('gray.300');

  function getTreeIcon(props: { selected: boolean; expanded: boolean }) {
    const { selected, expanded } = props;

    const color = selected ? selectedColor : unselectedColor;
    const twoToneColor = selected ? selectedTwoTone : unselectedTwoTone;
    return expanded ? (
      <FolderOpenTwoToneIcon color={color} twoToneColor={twoToneColor} />
    ) : (
      <FolderCloseTwoToneIcon color={color} twoToneColor={twoToneColor} />
    );
  }

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
        icon: ({
          expanded,
          selected,
        }: {
          expanded: boolean;
          selected: boolean;
        }) => getTreeIcon({ expanded, selected }),
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
        icon: ({
          expanded,
          selected,
        }: {
          expanded: boolean;
          selected: boolean;
        }) => getTreeIcon({ expanded, selected }),
      };
    });
  }

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
  const treeNodeData = assembleTree(getTreeNodeData(groupTree), '');
  const { items, isLoading: templateIsLoading } = useDeviceTemplateQuery(
    defaultTemplateRequestParams
  );
  const templateTreeNodeData = getTemplateTreeNodeData(items);

  const { mutate: createSubscribeEntitiesDeviceMutate } =
    useCreateSubscribeEntitiesDeviceMutation({
      onSuccess() {
        onConfirm();
      },
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
      <Flex minH="300px">
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
              <Tab
                style={{ margin: '0 30px' }}
                _selected={{
                  color: 'green.300',
                  boxShadow: 'none',
                  borderBottom: '1px solid',
                  borderBottomColor: 'green.300',
                  margin: '0 30px',
                }}
              >
                设备组
              </Tab>
              <Tab
                style={{ margin: '0 30px' }}
                _selected={{
                  color: 'green.300',
                  boxShadow: 'none',
                  borderBottom: '1px solid',
                  borderBottomColor: 'green.300',
                }}
              >
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
                  treeNodeData.length > 0 ? (
                    <Tree
                      style={{ marginTop: '16px' }}
                      icon={FolderOpenTwoToneIcon}
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
                    <Empty
                      title="暂无数据"
                      styles={{ wrapper: { height: '100%' } }}
                    />
                  )
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
                {!templateIsLoading ? (
                  templateTreeNodeData.length > 0 ? (
                    <Tree
                      style={{ marginTop: '16px' }}
                      icon={FolderOpenTwoToneIcon}
                      checkable
                      treeData={templateTreeNodeData}
                      checkedKeys={selectedKeys}
                      onCheck={(keys, el) => {
                        const { checkedNodes } = el;
                        setSelectNode(checkedNodes);
                        setSelectedKeys(keys);
                      }}
                    />
                  ) : (
                    <Empty
                      title="暂无数据"
                      styles={{ wrapper: { height: '100%' } }}
                    />
                  )
                ) : (
                  <Loading styles={{ wrapper: { height: '100%' } }} />
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <Flex flex="1" flexDirection="column">
          <Flex
            justifyContent="space-between"
            alignItems="center"
            mt="19px"
            mb="19px"
          >
            <Text color="gray.800" fontSize="12px" fontWeight="600">
              已选择
            </Text>
            <Flex
              alignItems="center"
              color="gray.700"
              fontSize="12px"
              cursor="pointer"
              onClick={() => {
                setSelectNode([]);
                setSelectedKeys([]);
              }}
            >
              <BroomFilledIcon style={{ marginRight: '4px' }} size="14px" />
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
            icon={FolderOpenTwoToneIcon}
            checkable
            fieldNames={
              selectIndex === 0 ? { title: 'path' } : { title: 'title' }
            }
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
