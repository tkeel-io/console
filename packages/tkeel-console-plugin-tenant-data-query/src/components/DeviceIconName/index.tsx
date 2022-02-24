import { ReactNode } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { WebcamTwoToneIcon } from '@tkeel/console-icons';

type Props = {
  icon?: ReactNode;
  name?: string;
};

export default function DeviceIconName({
  icon = <WebcamTwoToneIcon />,
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
