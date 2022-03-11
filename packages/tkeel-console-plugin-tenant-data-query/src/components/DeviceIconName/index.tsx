import { Flex, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { WebcamTwoToneIcon } from '@tkeel/console-icons';

type Props = {
  icon?: ReactNode;
  name?: string;
};

export default function DeviceIconName({
  icon = <WebcamTwoToneIcon size={24} />,
  name = 'OPC协议设备',
}: Props) {
  return (
    <Flex height="24px" alignItems="center">
      {icon}
      <Text
        marginLeft="10px"
        color="gray.700"
        fontSize="14px"
        fontWeight="600"
        lineHeight="24px"
      >
        {name}
      </Text>
    </Flex>
  );
}
