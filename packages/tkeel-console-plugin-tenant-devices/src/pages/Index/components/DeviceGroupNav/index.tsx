/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable no-console */
// import SortableTree from 'react-sortable-tree';
import { Box, Text } from '@chakra-ui/react';
import { isEmpty, values } from 'lodash';
import Tree, { TreeNode } from 'rc-tree';

import CreateDeviceGroupButton from '../CreateDeviceGroupButton';

import 'react-sortable-tree/style.css';

import useGroupTreeQuery, {
  TreeNodeType,
} from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useGroupTreeQuery';

type NodeType = {
  title: string;
  key: string;
  children: NodeType[];
};
function getTreeNodeData(data: TreeNodeType): NodeType[] {
  return values(data).map((item) => {
    const { nodeInfo, subNode } = item;
    const { id, properties } = nodeInfo;
    return {
      title: properties?.group?.name ?? '暂无数据',
      key: id,
      children: getTreeNodeData(subNode),
    };
  });
}

function renderTreeNode(item: NodeType) {
  const { title, key, children } = item;
  return (
    <TreeNode title={title} key={key}>
      {!isEmpty(children) &&
        children.map((subItem: NodeType) => {
          return renderTreeNode(subItem);
        })}
    </TreeNode>
  );
}

export default function DeviceGroupNav() {
  const { groupTree } = useGroupTreeQuery();
  console.log(`%c groupTree: \n`, 'color:deeppink', groupTree);
  const treeNodeData = getTreeNodeData(groupTree);
  console.log('treeNodeData', treeNodeData);
  return (
    <Box w="258px" bg="gray.50" h="100%" p="12px">
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
      <Tree showLine>
        {treeNodeData.map((item: NodeType) => renderTreeNode(item))}
      </Tree>
    </Box>
  );
}
