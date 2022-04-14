import { Button, Flex, Text } from '@chakra-ui/react';

// import { useState } from 'react';
import { CreateFinishedIcon } from '@tkeel/console-icons';

type Props = {
  onClose: () => unknown;
  // isTime: boolean;
};
export default function CreateFinished({ onClose }: Props) {
  // export default function CreateFinished({ onClose, isTime }: Props) {
  // const [time, setTime] = useState(5);
  // const timer = isTime
  //   ? setInterval(() => {
  //       setTime((t: number) => t - 1);
  //       if (time <= 0) {
  //         onClose();
  //       }
  //       if (timer !== null) clearInterval(timer);
  //       return time;
  //     }, 1000)
  //   : null;
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
        {/* 当前弹窗将在{time}秒后自动关闭 */}
        当前弹窗将在55秒后自动关闭
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
