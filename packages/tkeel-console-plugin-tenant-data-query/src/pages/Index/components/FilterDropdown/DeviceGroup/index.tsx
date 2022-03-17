import { Flex, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { Tree } from '@tkeel/console-components';
import { TreeNodeType } from '@tkeel/console-request-hooks';
import { getTreeNodeData, TreeNodeData } from '@tkeel/console-utils';

import NoData from '../NoData';
import SpreadButton from '../SpreadButton';

const TitleWrapper = styled(Flex)`
  &:hover .spread-wrapper {
    display: flex;
  }
`;

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
  const treeNodeData = getTreeNodeData({ data: deviceGroupTree });
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
