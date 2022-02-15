import { Button, Flex, Spacer, Text } from '@chakra-ui/react';

import CompleteCheck from '@/tkeel-console-plugin-tenant-devices/assets/images/complete_check.svg?svgr';

export default function CompletedInfoPart() {
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
          已成功创建设备组, 可继续为该组 &nbsp;
          <Button colorScheme="primary" size="sm" variant="link">
            创建设备
          </Button>
        </Text>
        <Text fontSize="12px" color="gray.500" mt="20px">
          当前弹窗将在5秒后自动关闭
        </Text>
      </Flex>
      <Spacer />
    </Flex>
  );
}
