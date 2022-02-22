/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable no-console */
import { useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
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
  id: string;
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
      id,
      children: getTreeNodeData(subNode),
      originData: item,
    };
  });
}

export default function DeviceGroupTree({ handleSelectGroup }: Props) {
  const [groupId, setGroupId] = useState('');
  const { groupTree } = useGroupTreeQuery();
  console.log(`%c groupTree: \n`, 'color:deeppink', groupTree);
  const treeNodeData = getTreeNodeData(groupTree);
  console.log('treeNodeData', treeNodeData);

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
        {treeNodeData.map((v) => (
          <Box
            lineHeight="24px"
            fontSize="12px"
            cursor="pointer"
            key={v.id}
            p="4px 6px"
            borderWidth="1px"
            boxSizing="border-box"
            borderColor={v.id === groupId ? 'primary' : 'transparent'}
            onClick={() => {
              setGroupId(v.id);
              handleSelectGroup(v.originData);
            }}
          >
            {v.title}
          </Box>
        ))}
      </Box>
    </Flex>
  );
}
