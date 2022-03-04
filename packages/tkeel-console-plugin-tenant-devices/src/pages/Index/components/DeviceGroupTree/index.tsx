/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-console */
import { Box, Flex, Text } from '@chakra-ui/react';

import { Tree } from '@tkeel/console-components';

import CreateGroupButton from '@/tkeel-console-plugin-tenant-devices/pages/Index/components/CreateGroupButton';
import { TreeNodeData } from '@/tkeel-console-plugin-tenant-devices/pages/Index/types';

interface Props {
  handleSelectGroup: (selectedKeys: React.Key[], e: any) => void;
  treeNodeData: TreeNodeData[];
  refetch?: () => void;
  selectedKeys?: string[];
}

export default function DeviceGroupTree({
  handleSelectGroup,
  treeNodeData,
  refetch = () => {},
  selectedKeys = [],
}: Props) {
  return (
    <Flex bg="gray.50" h="100%" p="12px" flexDir="column">
      <Text
        color="grayAlternatives.300"
        fontSize="12px"
        lineHeight="32px"
        fontWeight="500"
        mb="8px"
        height="32px"
      >
        设备组
      </Text>
      <CreateGroupButton callback={refetch} />
      <Box mt="16px" flex="1" minWidth="200px" overflowY="scroll">
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
    </Flex>
  );
}
