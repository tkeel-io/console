import { Flex, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { SpreadButton, Tree } from '@tkeel/console-components';
import { TreeNodeType } from '@tkeel/console-request-hooks';
import { getTreeNodeData, TreeNodeData } from '@tkeel/console-utils';

import NoData from '../NoData';

const TitleWrapper = styled(Flex)`
  &:hover .spread-wrapper {
    display: flex;
  }
`;

type Props = {
  isShowSpreadButton: boolean;
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
  isShowSpreadButton,
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
        const { id: groupId, title } = node as TreeNodeData;
        return (
          <TitleWrapper
            justifyContent="space-between"
            onClick={() => {
              onNodeTitleClick({ groupId, title });
            }}
          >
            <Text marginLeft="4px" color="gray.800">
              {title}
            </Text>
            {isShowSpreadButton && <SpreadButton style={{ display: 'none' }} />}
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
