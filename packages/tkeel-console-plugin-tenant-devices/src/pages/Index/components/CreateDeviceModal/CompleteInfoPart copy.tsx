import { Box, Button, Flex, Spacer, Text } from '@chakra-ui/react';

import CompleteCheck from '@/tkeel-console-plugin-tenant-devices/assets/images/complete_check.svg?svgr';

export default function CompletedInfoPart() {
  const timestamp = '2021-11-26 18:03:21';
  return (
    <Flex flexDirection="column" h="100%">
      <Flex
        h="280px"
        align="center"
        w="100%"
        justify="center"
        flexDirection="column"
      >
        <CompleteCheck />
        <Text color="gray.800" fontSize="14px" fontWeight="600">
          已成功创建
          <Text as="span" color="primary" px="2px">
            1
          </Text>
          台设备,请点击下载设备凭证
        </Text>
        <Button colorScheme="primary" w="200px" my="32px">
          下载
        </Button>
      </Flex>
      <Spacer />
      <Flex mb="48px" align="flex-start" flexDirection="column">
        <Text color="gray.700" mb="13px">
          设备凭证：
        </Text>
        <Box h="40px" w="400px" bg="gray.400" mb="14px" />
        <Text fontSize="12px" color="gray.500">
          凭证截止到期时间： {`${timestamp}`}
        </Text>
      </Flex>
    </Flex>
  );
}
