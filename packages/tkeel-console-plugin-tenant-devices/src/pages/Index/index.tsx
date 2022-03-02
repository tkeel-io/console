/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Box, Center, Flex, Text } from '@chakra-ui/react';
import { isEmpty, values } from 'lodash';
import { Fragment, useState } from 'react';

import { MoreAction, PageHeaderToolbar } from '@tkeel/console-components';
import { useColor, usePagination } from '@tkeel/console-hooks';
import {
  FolderCloseTwoToneIcon,
  FolderOpenTwoToneIcon,
  MoreVerticalFilledIcon,
} from '@tkeel/console-icons';

import { ApiData as DeviceResData } from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useCreateDeviceMutation';
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

type NodeType = {
  nodeInfo: NodeInfo;
  subNode: TreeNodeType;
};
const defaultGroupItem = {
  nodeInfo: {
    id: '',
    properties: {
      group: {
        name: '暂无数据',
        description: '暂无描述',
        ext: {},
        parentId: '',
      },
      sysField: {},
    },
  },
  subNode: {},
};

function Index(): JSX.Element {
  const [tableKey, setTableKey] = useState('');
  const [groupId, setGroupId] = useState('');
  const [groupItem, setGroupItem] = useState(defaultGroupItem);
  const [keyWords, setKeyWords] = useState('');
  const pagination = usePagination();
  const { setPageNum } = pagination;
  const handleSelectGroup = (
    selectedKeys: React.Key[],
    e: { node: { originData: NodeType } }
  ) => {
    const originData = e?.node?.originData;
    setGroupItem(originData);
    setGroupId(selectedKeys[0] as string);
    setKeyWords('');
  };
  const { groupTree, refetch: refetchGroupTree } = useGroupTreeQuery();
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

  function getTreeNodeData({ data }: { data: TreeNodeType }): TreeNodeData[] {
    return values(data).map((item) => {
      const { nodeInfo, subNode } = item;
      const { id, properties } = nodeInfo;
      const group = properties?.group ?? {};
      const { name, description, ext, parentId, parentName } = group;
      const defaultFormValues = {
        id,
        description,
        name,
        ext,
        parentId,
        parentName,
      };
      return {
        title: (
          <Flex justify="space-between" key={id}>
            <Text>{name}</Text>
            <MoreAction
              element={
                <Center h="100%">
                  <MoreVerticalFilledIcon color="primary" size="12px" />
                </Center>
              }
              buttons={[
                <CreateGroupButton
                  key="add"
                  type="MORE_ACTION"
                  groupTree={groupTree}
                  callback={refetchGroupTree}
                  defaultFormValues={{ parentId: id }}
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
        parentId,
        parentName,
      };
    });
  }
  const treeNodeData = getTreeNodeData({ data: groupTree });
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
          defaultValue: keyWords,
        }}
        buttons={[
          <CreateDeviceButton
            key="create"
            variant="solid"
            onSuccess={({ data }: { data: DeviceResData }) => {
              setTableKey(data?.deviceObject?.id ?? '');
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
        <DeviceGroupTree
          handleSelectGroup={handleSelectGroup}
          treeNodeData={treeNodeData}
          refetch={refetchGroupTree}
        />
        <Flex flex="1" bg="white" p="12px 20px" flexDirection="column">
          <Box
            color="grayAlternatives.300"
            h="24px"
            fontSize="14px"
            lineHeight="24px"
            mb="8px"
          >
            当前分组：默认分组/自定义分组3
          </Box>
          <GroupBasicInfo groupItem={groupItem} />
          <DeviceListTable
            groupId={groupId}
            key={tableKey}
            // groupItem={groupItem}
            keyWords={keyWords}
            groupTree={groupTree}
          />
        </Flex>
      </Box>
    </Flex>
  );
}

export default Index;
