/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Box, Center, Flex, HStack, Text } from '@chakra-ui/react';
import { isEmpty, values } from 'lodash';
import { Fragment, useState } from 'react';

import { MoreAction, PageHeaderToolbar } from '@tkeel/console-components';
import { useColor, usePagination } from '@tkeel/console-hooks';
import {
  FolderCloseTwoToneIcon,
  FolderOpenTwoToneIcon,
  MoreVerticalFilledIcon,
} from '@tkeel/console-icons';

import useDeviceListQuery from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceListQuery';
import useGroupTreeQuery, {
  NodeInfo,
  TreeNodeType,
} from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useGroupTreeQuery';
import CreateGroupButton from '@/tkeel-console-plugin-tenant-devices/pages/Index/components/CreateGroupButton';
import DeleteGroupButton from '@/tkeel-console-plugin-tenant-devices/pages/Index/components/DeleteGroupButton';
import UpdateGroupButton from '@/tkeel-console-plugin-tenant-devices/pages/Index/components/UpdateGroupButton';
import { TreeNodeData } from '@/tkeel-console-plugin-tenant-devices/pages/Index/types';

import CreateDeviceButton from './components/CreateDeviceButton';
import DeviceGroupTree from './components/DeviceGroupTree';
import DeviceListTable from './components/DeviceListTable';
import GroupBasicInfo from './components/GroupBasicInfo';

const defaultGroupItem = {
  title: '',
  children: [],
  key: '',
};

function getParentTreeNode({
  list,
  key,
}: {
  list: TreeNodeData[];
  key: string;
}): TreeNodeData[] {
  // eslint-disable-next-line no-restricted-syntax
  for (const item of list) {
    if (item.key === key) {
      return [item];
    }
    if (!isEmpty(item.children)) {
      const node = getParentTreeNode({ list: item.children, key });
      if (!isEmpty(node)) {
        return [item, ...node];
      }
    }
  }
  return [];
}
function getTreeNode({
  list,
  key,
}: {
  list: TreeNodeData[];
  key: string;
}): TreeNodeData | any {
  // eslint-disable-next-line no-restricted-syntax
  for (const item of list) {
    if (item.key === key) {
      return item;
    }
    if (!isEmpty(item.children)) {
      const node = getTreeNode({ list: item.children, key });
      if (!isEmpty(node)) {
        return node;
      }
    }
  }
  return {};
}
function getDefaultFormValues({ groupItem }: { groupItem: TreeNodeData }) {
  const nodeInfo = groupItem?.originData?.nodeInfo as NodeInfo;
  const id = nodeInfo?.id;
  const group = nodeInfo?.properties?.group ?? {};
  const { name, description, ext, parentId, parentName } = group;
  return {
    id,
    description,
    name,
    ext,
    parentId,
    parentName,
  };
}

function Index(): JSX.Element {
  const [groupId, setGroupId] = useState('');
  const [keyWords, setKeyWords] = useState('');
  const pagination = usePagination();
  const { setPageNum, pageNum, pageSize, setTotalSize } = pagination;

  const { groupTree, refetch: refetchGroupTree } = useGroupTreeQuery();
  const selectedColor = useColor('primary');
  const selectedTwoTone = useColor('primarySub2');
  const unselectedColor = useColor('gray.700');
  const unselectedTwoTone = useColor('gray.300');
  function getTreeIcon(props: { selected: boolean; expanded: boolean }) {
    const { selected, expanded } = props;
    const color = selected ? selectedColor : unselectedColor;
    const twoToneColor = selected ? selectedTwoTone : unselectedTwoTone;
    return (
      <Center h="100%">
        {expanded ? (
          <FolderOpenTwoToneIcon
            size="20px"
            color={color}
            twoToneColor={twoToneColor}
          />
        ) : (
          <FolderCloseTwoToneIcon
            size="20px"
            color={color}
            twoToneColor={twoToneColor}
          />
        )}
      </Center>
    );
  }

  function getTreeNodeData({ data }: { data: TreeNodeType }): TreeNodeData[] {
    return values(data).map((item) => {
      const { nodeInfo, subNode } = item;
      const { id, properties } = nodeInfo;
      const group = properties?.group ?? {};
      const {
        name,
        description,
        ext,
        parentId,
        parentName,
        templateId,
        templateName,
      } = group;
      const defaultFormValues = {
        id,
        description,
        name,
        ext,
        parentId,
        parentName,
        templateId,
        templateName,
      };
      return {
        name,
        title: (
          <Flex
            justify="space-between"
            key={id}
            _hover={{
              'svg.verticalFilled': {
                fill: `${selectedColor} !important`,
              },
            }}
          >
            <Text>{name}</Text>
            <MoreAction
              styles={{ actionList: { width: '119px' } }}
              element={
                <Center h="100%">
                  <MoreVerticalFilledIcon
                    size="16px"
                    color="transparent"
                    className="verticalFilled"
                  />
                </Center>
              }
              buttons={[
                <CreateGroupButton
                  key="add"
                  type="MORE_ACTION"
                  groupTree={groupTree}
                  callback={refetchGroupTree}
                  defaultFormValues={{
                    parentId: id,
                    parentName: name,
                  }}
                />,
                <UpdateGroupButton
                  key="update"
                  groupTree={groupTree}
                  defaultFormValues={defaultFormValues}
                  callback={refetchGroupTree}
                />,
                isEmpty(subNode) ? (
                  <DeleteGroupButton
                    key="delete"
                    id={id}
                    groupName={name}
                    callback={refetchGroupTree}
                  />
                ) : (
                  <Fragment key="empty" />
                ),
              ]}
            />
          </Flex>
        ),
        key: id,
        children: getTreeNodeData({ data: subNode }),
        icon: ({
          expanded,
          selected,
        }: {
          expanded: boolean;
          selected: boolean;
        }) => getTreeIcon({ expanded, selected }),
        originData: item,
      };
    });
  }
  const treeNodeData = getTreeNodeData({ data: groupTree });
  const handleSelectGroup = (selectedKeys: React.Key[]) => {
    const id = selectedKeys[0] as string;
    setGroupId(id);
    setKeyWords('');
    refetchGroupTree();
  };
  const groupCrumb = getParentTreeNode({
    list: treeNodeData,
    key: groupId,
  });
  const groupItem = getTreeNode({
    list: treeNodeData,
    key: groupId,
  });
  const defaultFormValues = getDefaultFormValues({
    groupItem: isEmpty(groupItem) ? defaultGroupItem : groupItem,
  });

  const params = {
    query: keyWords || '',
    page_num: pageNum,
    page_size: pageSize,
    order_by: 'name',
    is_descending: false,
    condition: [
      {
        field: 'sysField._spacePath',
        operator: '$wildcard',
        value: groupId,
      },
      {
        field: 'type',
        operator: '$eq',
        value: 'device',
      },
    ],
  };
  const {
    refetch: refetchDeviceList,
    deviceList,
    isLoading,
  } = useDeviceListQuery({
    params,
    onSuccess: (data) => {
      const total = data?.data?.listDeviceObject?.total ?? 0;
      setTotalSize(total as number);
    },
  });

  return (
    <Flex flexDirection="column" h="100%">
      <PageHeaderToolbar
        name="设备列表"
        hasSearchInput
        searchInputProps={{
          onSearch(value) {
            setPageNum(1);
            setKeyWords(value.trim());
          },
          inputStyle: { background: 'gray.50' },
          value: keyWords,
        }}
        buttons={[
          <CreateDeviceButton
            key="create"
            variant="solid"
            defaultFormValues={{
              parentId: groupId,
              parentName: groupItem.name,
            }}
            onSuccess={() => {
              const timer = setTimeout(() => {
                refetchDeviceList();
                clearTimeout(timer);
              }, 800);
            }}
          />,
        ]}
      />
      <Box
        position="relative"
        display="flex"
        flex="1"
        overflow="hidden"
        marginTop="8px"
      >
        <Flex bg="gray.50" h="100%" p="12px" flexDir="column">
          <Text
            color="grayAlternatives.300"
            fontSize="12px"
            lineHeight="32px"
            fontWeight="500"
            mb="8px"
            height="32px"
          >
            设备组
          </Text>
          <CreateGroupButton
            callback={refetchGroupTree}
            defaultFormValues={{
              parentId: groupId,
              parentName: groupItem.name,
            }}
          />
          <DeviceGroupTree
            handleSelectGroup={handleSelectGroup}
            treeNodeData={treeNodeData}
            selectedKeys={[groupId]}
          />
        </Flex>

        <Flex flex="1" bg="white" p="12px 20px" flexDirection="column">
          <HStack
            color="grayAlternatives.300"
            h="24px"
            fontSize="12px"
            lineHeight="24px"
            mb="8px"
            spacing="4px"
          >
            <Text mr="4px">当前位置: </Text>
            {groupCrumb.map((item: TreeNodeData, index) => {
              const isTarget = index === groupCrumb.length - 1;
              return (
                <Fragment key={item.key}>
                  <Box
                    cursor={isTarget ? 'default' : 'pointer'}
                    _hover={{
                      color: isTarget ? 'grayAlternatives.700' : 'primary',
                    }}
                    onClick={() => {
                      setGroupId(item.key);
                    }}
                    color={`grayAlternatives.${isTarget ? 700 : 300}`}
                    fontWeight={isTarget ? 500 : 400}
                  >
                    {item.name || '暂无'}
                  </Box>
                  <Text>{isTarget ? '' : '/'}</Text>
                </Fragment>
              );
            })}
            {groupCrumb.length > 0 && (
              <UpdateGroupButton
                type="icon"
                groupTree={groupTree}
                defaultFormValues={defaultFormValues}
              />
            )}
          </HStack>
          <GroupBasicInfo groupItem={groupItem} />
          <DeviceListTable
            pagination={pagination}
            deviceList={deviceList}
            groupTree={groupTree}
            isLoading={isLoading}
            refetch={refetchDeviceList}
          />
        </Flex>
      </Box>
    </Flex>
  );
}

export default Index;
