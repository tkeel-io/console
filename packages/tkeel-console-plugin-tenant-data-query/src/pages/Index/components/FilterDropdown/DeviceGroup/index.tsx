import { Flex, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { values } from 'lodash';

import { Tree } from '@tkeel/console-components';
import {
  FolderCloseTwoToneIcon,
  FolderOpenTwoToneIcon,
} from '@tkeel/console-icons';

import {
  NodeInfo,
  TreeNodeType,
} from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceGroupQuery';

import NoData from '../NoData';
import SpreadButton from '../SpreadButton';

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

const TitleWrapper = styled(Flex)`
  &:hover .spread-wrapper {
    display: flex;
  }
`;

function getTreeIcon(props: { selected: boolean; expanded: boolean }) {
  const { selected, expanded } = props;
  const color = selected ? 'primary' : 'gray.700';
  const twoToneColor = selected ? 'primarySub2' : 'gray.300';
  return expanded ? (
    <FolderOpenTwoToneIcon
      size={20}
      color={color}
      twoToneColor={twoToneColor}
      style={{ position: 'relative', bottom: '2px' }}
    />
  ) : (
    <FolderCloseTwoToneIcon
      size={20}
      color={color}
      twoToneColor={twoToneColor}
      style={{ position: 'relative', bottom: '2px' }}
    />
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
          <TitleWrapper
            justifyContent="space-between"
            onClick={() => {
              onNodeTitleClick({ groupId, title: node.title as string });
            }}
          >
            <Text marginLeft="4px" color="gray.800">
              {node.title}
            </Text>
            <SpreadButton style={{ display: 'none' }} />
          </TitleWrapper>
        );
      }}
      extras={{ isTreeTitleFullWidth: true }}
      showIcon
      treeData={treeNodeData}
      styles={{
        treeTitle: 'font-size:14px; line-height: 32px;',
      }}
    />
  );
}
