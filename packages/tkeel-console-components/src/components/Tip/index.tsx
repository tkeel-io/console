import { Flex, StyleProps, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { TipIcon } from '@tkeel/console-icons';

type Props = {
  icon?: ReactNode;
  title: string;
  sx?: StyleProps;
  styles?: {
    root?: StyleProps;
    text?: StyleProps;
  };
};

export default function Tip({ icon, title, sx, styles }: Props) {
  return (
    <Flex alignItems="center" {...styles?.root} {...sx}>
      {icon || <TipIcon size={14} color="gray.500" />}
      <Text ml="8px" color="gray.500" fontSize="12px" {...styles?.text}>
        {title}
      </Text>
    </Flex>
  );
}
