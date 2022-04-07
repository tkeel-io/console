import { Flex, Text } from '@chakra-ui/react';

import { CreateFinishedIcon } from '@tkeel/console-icons';

export default function CreateFinished() {
  return (
    <Flex flexDirection="column" alignItems="center" mt="64px">
      <CreateFinishedIcon size={116} />
      <Text color="gray.800" fontSize="14px" m="5px 0 16px">
        已成功将数据发送到 Mysql
      </Text>
      <Text color="gray.500" fontSize="12px">
        当前弹窗将在5秒后自动关闭
      </Text>
    </Flex>
  );
}
//
