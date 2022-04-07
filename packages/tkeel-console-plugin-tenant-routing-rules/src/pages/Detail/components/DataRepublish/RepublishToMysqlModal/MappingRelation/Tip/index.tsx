import { Flex, StyleProps, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { TipIcon } from '@tkeel/console-icons';

type Props = {
  icon?: ReactNode;
  title: string;
  styles?: {
    wrapper?: StyleProps;
  };
};

export default function Tip({ icon, title, styles }: Props) {
  return (
    <Flex alignItems="center">
      {icon || <TipIcon size={14} />}
      <Text ml="8px" color="gray.400" fontSize="12px" {...styles?.wrapper}>
        {title}
      </Text>
    </Flex>
  );
}
