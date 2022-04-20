import { Button, Flex, Text } from '@chakra-ui/react';

import { CreateFinishedIcon } from '@tkeel/console-icons';

type Props = {
  onClose: () => unknown;
};
export default function CreateFinished({ onClose }: Props) {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      h="100%"
      pt="64px"
      position="relative"
    >
      <CreateFinishedIcon size={116} />
      <Text color="gray.800" fontSize="14px" m="5px 0 16px">
        已成功将数据发送到 Mysql
      </Text>
      <Text color="gray.500" fontSize="12px">
        当前弹窗将在5秒后自动关闭
      </Text>
      <Button
        onClick={onClose}
        colorScheme="primary"
        position="absolute"
        bottom="26px"
        right="20px"
      >
        完成
      </Button>
    </Flex>
  );
}
