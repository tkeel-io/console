import { Flex, Text } from '@chakra-ui/react';
import { values } from 'lodash';

import { Tree } from '@tkeel/console-components';
import {
  FolderCloseTwoToneIcon,
  FolderOpenTwoToneIcon,
  RightFilledIcon,
} from '@tkeel/console-icons';

import {
  NodeInfo,
  TreeNodeType,
} from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceGroupQuery';

import NoData from '../NoData';

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

function getTreeIcon(props: { selected: boolean; expanded: boolean }) {
  const { selected, expanded } = props;
  const color = selected ? 'primary' : 'gray.700';
  const twoToneColor = selected ? 'primarySub2' : 'gray.300';
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

type Props = {
  deviceGroupTree: TreeNodeType;
  onNodeTitleClick: ({
    groupId,
    title,
  }: {
    groupId: string;
    title: string;
  }) => unknown;
};

export default function DeviceGroup({
  deviceGroupTree,
  onNodeTitleClick,
}: Props) {
  const treeNodeData = getTreeNodeData(deviceGroupTree);
  if (treeNodeData.length === 0) {
    return <NoData title="暂无设备分组,请重新选择" />;
  }

  return (
    <Tree
      // eslint-disable-next-line react/no-unstable-nested-components
      titleRender={(node) => {
        const { id: groupId } = node as TreeNodeData;
        return (
          <Flex
            justifyContent="space-between"
            onClick={() => {
              onNodeTitleClick({ groupId, title: node.title as string });
              // onSpreadClick(groupId);
            }}
          >
            <Text>{node.title}</Text>
            <Flex
              alignItems="center"
              color="primary"
              fontSize="12px"
              // onClick={() => onSpreadClick(groupId)}
            >
              <Text marginRight="4px">展开</Text>
              <RightFilledIcon color="primary" />
            </Flex>
          </Flex>
        );
      }}
      extras={{ isTreeTitleFullWidth: true }}
      // icon={FolderCloseTwoToneIcon}
      treeData={treeNodeData}
    />
  );
}
