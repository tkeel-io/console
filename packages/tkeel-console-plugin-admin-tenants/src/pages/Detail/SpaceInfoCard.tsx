import React, { ReactElement } from 'react';
import { Box, Center, Flex, List, ListItem, Text } from '@chakra-ui/react';
import { BoxTwoToneIcon } from '@tkeel/console-icons';

interface Props {
  infos: {
    title: string;
    desc: string;
    list: Array<{ label: string; value: string }>;
  };
}
function SpaceInfoCard({ infos }: Props): ReactElement {
  const { title, desc, list } = infos;
  return (
    <Box w="360px" mr="20px">
      <Flex bg="gray.50" p="16px 20px" align="center">
        <Center bg="gray.100" w="48px" h="48px" borderRadius="16px">
          <BoxTwoToneIcon size="26px" />
        </Center>
        <Box ml="16px" flex="1">
          <Text fontSize="14">{title}</Text>
          <Text fontSize="12" color="gray.500">
            {desc}
          </Text>
        </Box>
      </Flex>
      <Box bg="white" p="16px 20px">
        <Text fontSize="14px" color="gray.800" mb="16px">
          基本信息
        </Text>
        <List spacing="14px" fontSize="12px">
          {list.map((item) => (
            <ListItem key={item.value} display="flex">
              <Text w="60px" color="gray.500">
                {item.label}
              </Text>
              <Text flex="1">{item.value}</Text>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default SpaceInfoCard;
