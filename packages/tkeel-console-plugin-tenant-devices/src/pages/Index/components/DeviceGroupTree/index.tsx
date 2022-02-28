/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-console */
import { Box, Center, Flex, Text } from '@chakra-ui/react';
import { isEmpty, values } from 'lodash';
import { Fragment, ReactNode } from 'react';

import { MoreAction, Tree } from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';
import {
  FolderCloseTwoToneIcon,
  FolderOpenTwoToneIcon,
  MoreVerticalFilledIcon,
} from '@tkeel/console-icons';

import useGroupTreeQuery, {
  NodeInfo,
  TreeNodeType,
} from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useGroupTreeQuery';
import DeleteGroupButton from '@/tkeel-console-plugin-tenant-devices/pages/Index/components/DeleteGroupButton';
import UpdateGroupButton from '@/tkeel-console-plugin-tenant-devices/pages/Index/components/UpdateGroupButton';

import CreateGroupButton from '../CreateGroupButton';

interface Props {
  handleSelectGroup: (item: {
    nodeInfo: NodeInfo;
    subNode: TreeNodeType;
  }) => void;
}
type TreeNodeData = {
  title: ReactNode;
  key: string;
  children: TreeNodeData[];
  icon?: any;
  originData: {
    nodeInfo: NodeInfo;
    subNode: TreeNodeType;
  };
};

export default function DeviceGroupTree({ handleSelectGroup }: Props) {
  const { groupTree, refetch } = useGroupTreeQuery();

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
      const { group } = properties;
      const { name, description, ext, parentId } = group;
      const defaultFormValues = {
        id,
        description,
        name,
        ext,
        parentId,
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
                isEmpty(subNode) ? (
                  <DeleteGroupButton
                    key="delete"
                    id={id}
                    groupName={name}
                    callback={refetch}
                  />
                ) : (
                  <Fragment key="empty" />
                ),
                <UpdateGroupButton
                  key="update"
                  defaultFormValues={defaultFormValues}
                />,
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

  const onSelect = (selectedKeys: React.Key[], e: any) => {
    console.log('selectedKeys', selectedKeys);
    console.log('event', e);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const originData = e?.node?.originData;
    handleSelectGroup(
      originData as {
        nodeInfo: NodeInfo;
        subNode: TreeNodeType;
      }
    );
  };
  return (
    <Flex bg="gray.50" h="100%" p="12px" flexDir="column">
      <Text
        color="grayAlternatives.300"
        fontSize="12px"
        lineHeight="24px"
        fontWeight="500"
        mb="8px"
      >
        设备组
      </Text>
      <CreateGroupButton
        callback={() => {
          refetch();
        }}
      />
      <Box mt="16px" flex="1" minWidth="200px">
        <Tree
          extras={{ isTreeTitleFullWidth: true }}
          treeData={treeNodeData}
          showIcon
          selectable
          onSelect={onSelect}
        />
      </Box>
    </Flex>
  );
}
