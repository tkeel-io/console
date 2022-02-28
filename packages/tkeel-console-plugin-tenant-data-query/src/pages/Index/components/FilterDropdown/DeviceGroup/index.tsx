import { Flex, Text } from '@chakra-ui/react';
import { values } from 'lodash';

import { Tree } from '@tkeel/console-components';
import { FolderCloseTwoToneIcon, RightFilledIcon } from '@tkeel/console-icons';

import {
  NodeInfo,
  TreeNodeType,
} from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceGroupQuery';

export interface TreeNodeData {
  title: string;
  id: string;
  children: TreeNodeData[];
  originData: {
    nodeInfo: NodeInfo;
    subNode: TreeNodeType;
  };
  key: string;
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
    };
  });
}

type Props = {
  deviceGroupTree: TreeNodeType;
  onClick: () => unknown;
  onSpreadClick: (id: string) => unknown;
};

export default function DeviceGroup({
  deviceGroupTree,
  onClick,
  onSpreadClick,
}: Props) {
  const treeNodeData = getTreeNodeData(deviceGroupTree);
  // eslint-disable-next-line no-console
  console.log('DeviceGroup ~ treeNodeData', treeNodeData);

  return (
    <Tree
      // eslint-disable-next-line react/no-unstable-nested-components
      titleRender={(node) => {
        return (
          <Flex justifyContent="space-between">
            <Text>{node.title}</Text>
            <Flex
              alignItems="center"
              color="primary"
              fontSize="12px"
              onClick={() => onSpreadClick((node as TreeNodeData).id)}
            >
              <Text marginRight="4px">展开</Text>
              <RightFilledIcon color="primary" />
            </Flex>
          </Flex>
        );
      }}
      checkable={false}
      extras={{ isTreeTitleFullWidth: true }}
      icon={<FolderCloseTwoToneIcon />}
      treeData={treeNodeData}
      onClick={onClick}
    />
  );
}
