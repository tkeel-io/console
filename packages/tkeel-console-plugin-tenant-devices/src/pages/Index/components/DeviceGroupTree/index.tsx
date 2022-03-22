/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-console */
import { Box } from '@chakra-ui/react';

import { Tree } from '@tkeel/console-components';

import { TreeNodeData } from '@/tkeel-console-plugin-tenant-devices/pages/Index/types';

interface Props {
  handleSelectGroup: (selectedKeys: React.Key[], e: unknown) => void;
  treeNodeData: TreeNodeData[];
  selectedKeys?: string[];
}

export default function DeviceGroupTree({
  handleSelectGroup,
  treeNodeData,
  selectedKeys = [],
}: Props) {
  return (
    <Box mt="16px" flex="1" minWidth="258px" overflowY="scroll">
      <Tree
        extras={{ isTreeTitleFullWidth: true }}
        treeData={treeNodeData}
        selectedKeys={selectedKeys}
        showIcon
        selectable
        onSelect={handleSelectGroup}
        styles={{
          treeTitle: 'font-size:14px;height:32px;line-height:32px;',
        }}
      />
    </Box>
  );
}
