/* eslint-disable no-shadow-restricted-names */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-console */
// import { ReactNode } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Tree } from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';
import {
  FolderCloseTwoToneIcon,
  FolderOpenTwoToneIcon,
} from '@tkeel/console-icons';
import { values } from 'lodash';

import CreateDeviceGroupButton from '../CreateDeviceGroupButton';

import useGroupTreeQuery, {
  NodeInfo,
  TreeNodeType,
} from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useGroupTreeQuery';

interface Props {
  handleSelectGroup: (item: {
    nodeInfo: NodeInfo;
    subNode: TreeNodeType;
  }) => void;
}
type TreeNodeData = {
  title: string;
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
      return {
        title: properties?.group?.name ?? '暂无数据',
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

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selectedKeys', selectedKeys);
    const originData = info?.node?.originData;
    handleSelectGroup(
      originData as {
        nodeInfo: NodeInfo;
        subNode: TreeNodeType;
      }
    );
  };
  return (
    <Flex w="258px" bg="gray.50" h="100%" p="12px" flexDir="column">
      <Text
        color="grayAlternatives.300"
        fontSize="12px"
        lineHeight="24px"
        fontWeight="500"
        mb="8px"
      >
        设备组
      </Text>
      <CreateDeviceGroupButton
        callback={() => {
          refetch();
        }}
      />
      <Box mt="16px" overflowY="scroll" flex="1">
        <Tree
          showLine
          treeData={treeNodeData}
          showIcon
          selectable
          onSelect={onSelect}
        />
      </Box>
    </Flex>
  );
}
