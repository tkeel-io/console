import { Flex, Image, StyleProps, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import emptyImg from '@/tkeel-console-business-components/assets/images/empty.svg';

type Props = {
  textNode?: ReactNode;
  styles?: {
    wrapper?: StyleProps;
  };
};

export default function Empty({
  textNode = (
    <Flex flexDirection="column" alignItems="center">
      <Text>暂无设备组，请前往</Text>
      <Text>设备管理添加</Text>
    </Flex>
  ),
  styles,
}: Props) {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      {...styles?.wrapper}
    >
      <Image src={emptyImg} width="70px" />
      <Flex color="gray.600" fontSize="12px">
        {textNode}
      </Flex>
    </Flex>
  );
}
