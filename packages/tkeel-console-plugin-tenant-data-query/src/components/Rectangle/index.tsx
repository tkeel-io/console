import { Center, Circle, StyleProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { WifiFilledIcon } from '@tkeel/console-icons';

type Props = {
  backgroundColor: string;
  icon?: ReactNode;
  opacity?: string;
  style?: StyleProps;
};

export default function Rectangle({
  backgroundColor,
  icon = <WifiFilledIcon color="green.300" />,
  opacity = '1',
  style = {},
}: Props) {
  return (
    <Center width="24px" height="24px" position="relative" {...style}>
      <Circle
        position="absolute"
        left="0"
        top="0"
        size="24px"
        borderRadius="4px"
        backgroundColor={backgroundColor}
        opacity={opacity}
      />
      <Center
        position="absolute"
        left="0"
        top="0"
        zIndex="1"
        width="100%"
        height="100%"
      >
        {icon}
      </Center>
    </Center>
  );
}
