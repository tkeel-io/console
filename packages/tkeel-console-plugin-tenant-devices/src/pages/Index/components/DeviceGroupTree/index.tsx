/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable no-console */
// import { useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Tree } from '@tkeel/console-components';
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
  originData: {
    nodeInfo: NodeInfo;
    subNode: TreeNodeType;
  };
};

function getTreeNodeData(data: TreeNodeType): TreeNodeData[] {
  return values(data).map((item) => {
    const { nodeInfo, subNode } = item;
    const { id, properties } = nodeInfo;
    return {
      title: properties?.group?.name ?? '暂无数据',
      key: id,
      children: getTreeNodeData(subNode),
      originData: item,
    };
  });
}

export default function DeviceGroupTree({ handleSelectGroup }: Props) {
  const { groupTree } = useGroupTreeQuery();
  const treeNodeData = getTreeNodeData(groupTree);
  // const [groupId, setGroupId] = useState(treeNodeData[0]?.key);
  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selectedKeys', selectedKeys);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const originData = info?.node?.originData;
    // setGroupId(selectedKeys[0] as string);
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
      <CreateDeviceGroupButton />
      <Box mt="16px" overflowY="scroll" flex="1">
        <Tree
          treeData={treeNodeData}
          showIcon={false}
          selectable
          onSelect={onSelect}
        />
      </Box>
    </Flex>
  );
}
