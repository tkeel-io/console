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
}

export default function DeviceGroupTree({
  handleSelectGroup,
  treeNodeData,
  refetch = () => {},
}: Props) {
  return (
    <Flex bg="gray.50" h="100%" p="12px" flexDir="column">
      <Text
        color="grayAlternatives.300"
        fontSize="12px"
        lineHeight="24px"
        fontWeight="500"
        mb="8px"
      >
        设备组
      </Text>
      <CreateGroupButton callback={refetch} />
      <Box mt="16px" flex="1" minWidth="200px">
        <Tree
          extras={{ isTreeTitleFullWidth: true }}
          treeData={treeNodeData}
          showIcon
          selectable
          onSelect={handleSelectGroup}
        />
      </Box>
    </Flex>
  );
}
