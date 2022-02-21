import { Box, Button, Flex, HStack, Spacer, Text } from '@chakra-ui/react';

import { CreateType } from './types';

import CompleteCheck from '@/tkeel-console-plugin-tenant-devices/assets/images/complete_check.svg?svgr';

interface Props {
  type: CreateType;
}

export default function CompletedInfoPart({ type }: Props) {
  const timestamp = '2021-11-26 18:03:21';
  const token = 'ZGQyMmU5Y2UtZTc0NS0zYmQ5LThjNjktYTNiNjg2MzU4M2Vk';
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
          <Button
            colorScheme="primary"
            size="sm"
            variant="link"
            _hover={{ textDecoration: 'none' }}
          >
            创建设备
          </Button>
        </Text>
        <Text fontSize="12px" color="gray.500" mt="20px">
          当前弹窗将在5秒后自动关闭
        </Text>
      </Flex>
      <Spacer />
      {type === CreateType.DEVICE && (
        <Flex mb="48px" align="flex-start" flexDirection="column">
          <Text color="gray.700" mb="13px" fontSize="14px" lineHeight="24px">
            设备凭证：
          </Text>
          <HStack
            h="40px"
            w="400px"
            bg="gray.400"
            mb="14px"
            borderWidth="1px"
            borderRadius="4px"
            borderColor="grayAlternatives.300"
          >
            <Text>设备名称</Text>
            <Box>{`${token.slice(0, 4)}**** ****${token.slice(-5, -1)}`}</Box>
          </HStack>
          <Text fontSize="12px" color="gray.500">
            凭证截止到期时间： {`${timestamp}`}
          </Text>
        </Flex>
      )}
    </Flex>
  );
}
