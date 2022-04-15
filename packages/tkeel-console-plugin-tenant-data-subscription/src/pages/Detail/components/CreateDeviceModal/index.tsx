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
import { DataNode } from 'node_modules/rc-tree/es/interface';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  Empty,
  Loading,
  Modal,
  SearchInput,
  Tree,
} from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';
import { BroomFilledIcon, FolderOpenTwoToneIcon } from '@tkeel/console-icons';
import { getTreeIcon } from '@tkeel/console-utils';

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

function assemblePath(nodes: TreeNodeData[], defaultPath: string) {
  return nodes.map((n) => {
    const node = n;
    const path = defaultPath ? `${defaultPath}/${n.title}` : n.title;
    node.path = path;
    if (n.children && Array.isArray(n.children)) {
      assemblePath(n.children, path);
    }
    return node;
  });
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
      icon: ({ expanded }: { expanded: boolean }) => getTreeIcon({ expanded }),
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
      icon: ({ expanded }: { expanded: boolean }) => getTreeIcon({ expanded }),
    };
  });
}

export default function CreateDeviceModal({
  isOpen,
  isConfirmButtonLoading,
  onClose,
  onConfirm,
}: Props) {
  const defaultParams = {
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
  };

  const [defaultRequestParams, setDefaultRequestParams] =
    useState<RequestParams>(defaultParams);

  const [defaultTemplateRequestParams, setDefaultTemplateRequestParams] =
    useState<RequestParams>({
      ...defaultParams,
      condition: [
        {
          field: 'type',
          operator: '$eq',
          value: 'template',
        },
      ],
    });

  const [selectNode, setSelectNode] = useState<DataNode[]>([]);
  const [searchSelectNode, setSearchSelectNode] = useState<DataNode[]>([]);

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [selectIndex, setSelectIndex] = useState<number>(0);

  const { id } = useParams();

  const { groupTree, isLoading } = useDeviceGroupQuery(defaultRequestParams);
  const treeNodeData = assemblePath(getTreeNodeData(groupTree), '');
  const { items, isLoading: templateIsLoading } = useDeviceTemplateQuery(
    defaultTemplateRequestParams
  );
  const templateTreeNodeData = getTemplateTreeNodeData(items);

  const mutationProps = {
    onSuccess() {
      // TODO 添加设备后有延迟，临时解决方案
      setTimeout(() => {
        onConfirm();
      }, 800);
    },
    id: id || '',
  };

  const { mutate: createSubscribeEntitiesDeviceMutate } =
    useCreateSubscribeEntitiesDeviceMutation(mutationProps);

  const { mutate: createSubscribeEntitiesTemplateMutation } =
    useCreateSubscribeEntitiesTemplateMutation(mutationProps);

  const handleConfirm = () => {
    if (!id) {
      return;
    }

    if (selectIndex === 0) {
      createSubscribeEntitiesDeviceMutate({
        data: { groups: selectedKeys },
      });
    } else {
      createSubscribeEntitiesTemplateMutation({
        data: { models: selectedKeys },
      });
    }
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

  const getSelectKey = (data: DataNode[]) => {
    return data.map(({ key }) => key as string);
  };

  const isDisable = (type: number) => {
    return selectIndex === type && selectedKeys?.length > 0;
  };

  const disableStyles = (type: number) => {
    return {
      margin: '0 30px',
      fontSize: '12px',
      cursor: isDisable(type) ? 'not-allowed' : 'default',
      color: isDisable(type) ? '#CCD3DB' : '#242E42',
    };
  };

  const selectedStyles = {
    color: `${useColor('green.300')} !important`,
    boxShadow: 'none',
    borderBottom: '1px solid',
    borderBottomColor: 'green.300',
    margin: '0 30px',
  };

  const localSearch = (keyWord: string, list: DataNode[]) => {
    const arr = list.filter(
      (item) => item.title && String(item.title).includes(keyWord)
    );

    setSearchSelectNode(arr);
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  function TREE() {
    return treeNodeData.length > 0 ? (
      <Tree
        style={{ marginTop: '16px' }}
        icon={FolderOpenTwoToneIcon}
        checkable
        selectable={false}
        treeData={treeNodeData}
        checkedKeys={selectedKeys}
        onCheck={(keys, el) => {
          if (keys) {
            const { checkedNodes } = el;
            const selectNodeData = getSelectNode(checkedNodes);
            const selectKeyData = getSelectKey(selectNodeData);
            setSelectNode(selectNodeData);
            setSearchSelectNode(selectNodeData);
            setSelectedKeys(selectKeyData);
          }
        }}
      />
    ) : (
      <Empty title="暂无数据" styles={{ wrapper: { height: '100%' } }} />
    );
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  function TemplateTree() {
    return templateTreeNodeData.length > 0 ? (
      <Tree
        style={{ marginTop: '16px' }}
        icon={FolderOpenTwoToneIcon}
        checkable
        treeData={templateTreeNodeData}
        checkedKeys={selectedKeys}
        onCheck={(key, el) => {
          if (key) {
            const { checkedNodes } = el;
            const selectNodeData = getSelectNode(checkedNodes);
            const selectKeyData = getSelectKey(selectNodeData);
            setSelectNode(selectNodeData);
            setSearchSelectNode(selectNodeData);
            setSelectedKeys(selectKeyData);
          }
        }}
      />
    ) : (
      <Empty title="暂无数据" styles={{ wrapper: { height: '100%' } }} />
    );
  }

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
              setSearchSelectNode([]);
              setSelectedKeys([]);
              setSelectIndex(index);
            }}
          >
            <TabList>
              <Tab
                style={disableStyles(1)}
                _selected={selectedStyles}
                isDisabled={isDisable(1)}
              >
                设备组
              </Tab>
              <Tab
                style={disableStyles(0)}
                _selected={selectedStyles}
                isDisabled={isDisable(0)}
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
                  <TREE />
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
                  <TemplateTree />
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
            mt="13px"
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
                setSearchSelectNode([]);
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
            onSearch={(value) => localSearch(value, selectNode)}
          />

          <Tree
            style={{ marginTop: '16px' }}
            icon={FolderOpenTwoToneIcon}
            checkable
            fieldNames={
              selectIndex === 0 ? { title: 'path' } : { title: 'title' }
            }
            treeData={searchSelectNode}
            checkedKeys={selectedKeys}
            onCheck={(keys) => {
              setSelectedKeys(keys as string[]);
            }}
          />
        </Flex>
      </Flex>
    </Modal>
  );
}
