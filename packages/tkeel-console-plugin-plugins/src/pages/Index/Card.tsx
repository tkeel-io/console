import React from 'react';
import { Button, Flex, Tag, Text } from '@chakra-ui/react';
import { BoxTwoToneIcon, DownloadFilledIcon } from '@tkeel/console-icons';

function Card() {
  return (
    <Flex
      position="relative"
      padding="12px"
      flexDirection="column"
      justifyContent="space-between"
      height="108px"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="gray.200"
      borderRadius="4px"
      backgroundColor="white"
      cursor="pointer"
      _after={{
        content: '""',
        position: 'absolute',
        left: '0',
        top: '-1px',
        width: '100%',
        height: '2px',
        backgroundColor: 'tKeel',
        borderTopLeftRadius: '2px',
        borderTopRightRadius: '2px',
      }}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <BoxTwoToneIcon size={28} />
          <Text marginLeft="8px" color="gray.800" fontSize="14px">
            device
          </Text>
        </Flex>
        <Button
          colorScheme="tKeel"
          size="xs"
          leftIcon={<DownloadFilledIcon size={12} />}
        >
          安装
        </Button>
      </Flex>
      <Text color="gray.500" fontSize="12px" height="20px" isTruncated>
        安装用于管理设备的插件
      </Text>
      <Flex justifyContent="space-between">
        <Tag colorScheme="orange" size="sm">
          用户
        </Tag>
        <Flex alignItems="center" color="gray.500" fontSize="12px">
          <Text>Ver：4.4.10</Text>
          <Text marginLeft="20px">Repo：tKeel</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Card;
