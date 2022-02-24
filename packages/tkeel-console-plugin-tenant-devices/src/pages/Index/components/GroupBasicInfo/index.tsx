/* eslint-disable no-console */
import { useState } from 'react';
import { Button, Flex, HStack, SimpleGrid, Text } from '@chakra-ui/react';

import {
  NodeInfo,
  TreeNodeType,
} from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useGroupTreeQuery';

interface Props {
  groupItem: {
    nodeInfo: NodeInfo;
    subNode: TreeNodeType;
  };
}

const defaultCount = 4;

function renderInfoItem(item: { key: string; value: string }) {
  const { key, value } = item;

  return (
    <HStack key={key} fontSize="12px" lineHeight="24px" fontWeight="500">
      <Text color="grayAlternatives.300">{key}:</Text>
      <Text color="gray.600">{value}</Text>
    </HStack>
  );
}
function GroupBasicInfo({ groupItem }: Props): JSX.Element {
  const [isExpend, setIsExpend] = useState(false);
  const { nodeInfo } = groupItem;
  const { description, name, ext } = nodeInfo.properties.group;
  // const ext = nodeInfo.properties.group.ext ?? {};
  const groupInfoArray = [
    { key: '设备组名称', value: name },
    { key: '描述信息', value: description || '暂无描述' },
    ...Object.entries(ext).map(([key, value]) => {
      return { key, value };
    }),
  ];
  return (
    <Flex
      width="100%"
      bg="gray.100"
      p="12px"
      borderRadius="4px"
      borderColor="gray.200"
      borderWidth="1px"
      mb="12px"
    >
      <SimpleGrid
        columns={4}
        spacing="16px"
        minChildWidth="160px"
        minWidth="640px"
        flex="1"
      >
        {groupInfoArray
          .slice(0, isExpend ? groupInfoArray.length * 2 : defaultCount)
          .map((item) => renderInfoItem(item))}
      </SimpleGrid>
      <Button
        ml="16px"
        visibility={groupInfoArray.length > defaultCount ? 'visible' : 'hidden'}
        variant="link"
        colorScheme="primary"
        fontSize="12px"
        onClick={() => {
          setIsExpend(!isExpend);
        }}
        _hover={{ textDecoration: 'none' }}
      >
        {!isExpend ? '展开' : '收起'}
      </Button>
    </Flex>
  );
}
export default GroupBasicInfo;
