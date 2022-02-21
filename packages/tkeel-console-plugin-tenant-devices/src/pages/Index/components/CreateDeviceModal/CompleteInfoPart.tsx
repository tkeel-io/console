import {
  Button,
  Center,
  Flex,
  Spacer,
  Text,
  useClipboard,
} from '@chakra-ui/react';
import { CopyFilledIcon } from '@tkeel/console-icons';

import { CreateType } from './types';

import CompleteCheck from '@/tkeel-console-plugin-tenant-devices/assets/images/complete_check.svg?svgr';

interface Props {
  type: CreateType;
}

export default function CompletedInfoPart({ type }: Props) {
  const timestamp = '2021-11-26 18:03:21';
  const token = 'ZGQyMmU5Y2UtZTc0NS0zYmQ5LThjNjktYTNiNjg2MzU4M2Vk';
  const { hasCopied, onCopy } = useClipboard(token);
  return (
    <Flex flexDirection="column" h="100%">
      {type === CreateType.DEVICE ? (
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
      ) : (
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
      )}

      <Spacer />
      {type === CreateType.DEVICE && (
        <Flex mb="48px" align="flex-start" flexDirection="column">
          <Text color="gray.700" mb="13px" fontSize="14px" lineHeight="24px">
            设备凭证：
          </Text>
          <Flex
            w="400px"
            mb="14px"
            fontSize="14px"
            lineHeight="20px"
            color="gray.800"
          >
            <Center
              borderBottomLeftRadius="4px"
              borderTopLeftRadius="4px"
              p="9px 11px"
              bgColor="gray.100"
              borderWidth="1px"
              borderColor="grayAlternatives.50"
            >
              设备名称
            </Center>
            <Flex
              p="10px 12px"
              flex="1"
              borderBottomRightRadius="4px"
              borderTopRightRadius="4px"
              borderWidth="1px"
              borderColor="grayAlternatives.50"
              borderLeft="none"
              justify="space-between"
              fontSize="12px"
            >
              <Text>{`${token.slice(0, 4)}**** ****${token.slice(
                -5,
                -1
              )}`}</Text>
              <Spacer />
              {hasCopied && (
                <Text color="primary" mr="8px">
                  已复制
                </Text>
              )}
              <Text cursor="pointer" onClick={onCopy} mt="2px">
                <CopyFilledIcon color="grayAlternatives.300" />
              </Text>
            </Flex>
          </Flex>
          <Text fontSize="12px" color="gray.500">
            凭证截止到期时间： {`${timestamp}`}
          </Text>
        </Flex>
      )}
    </Flex>
  );
}
