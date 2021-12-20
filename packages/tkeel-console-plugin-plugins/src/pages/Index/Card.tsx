import React from 'react';
import { Box, Center, Flex, Tag, Text } from '@chakra-ui/react';
import { BoxTwoToneIcon } from '@tkeel/console-icons';

function Card() {
  const installed = true;
  return (
    <Flex
      position="relative"
      marginBottom="8px"
      padding="12px"
      flexDirection="column"
      justifyContent="space-between"
      width="24.4%"
      height="108px"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="gray.200"
      borderRadius="4px"
      backgroundColor="white"
    >
      <Box
        position="absolute"
        left="0"
        top="0"
        width="100%"
        height="2px"
        backgroundColor="blue.700"
        borderTopLeftRadius="2px"
        borderTopRightRadius="2px"
      />
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <BoxTwoToneIcon size={28} />
          <Text marginLeft="8px" color="gray.800" fontSize="14px">
            device
          </Text>
        </Flex>
        <Center
          width="60px"
          height="28px"
          color={installed ? '#329dce' : '#f9fbfd'}
          fontSize="12px"
          backgroundColor={installed ? '#eff4f9' : '#329dce'}
          borderRadius="15px"
          cursor={installed ? 'default' : 'pointer'}
        >
          已安装
        </Center>
      </Flex>
      <Text color="gray.500" fontSize="12px" height="20px" isTruncated>
        安装用于管理设备的插件
      </Text>
      <Flex justifyContent="space-between">
        <Tag colorScheme="orange">用户</Tag>
        <Flex alignItems="center" color="gray.500" fontSize="12px">
          <Text>Ver：4.4.10</Text>
          <Text marginLeft="20px">Repo：tKeel</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Card;
