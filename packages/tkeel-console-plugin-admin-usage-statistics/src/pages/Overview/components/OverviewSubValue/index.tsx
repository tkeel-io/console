import type { StyleProps } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  sx?: StyleProps;
}

export default function OverviewSubValue({ children, sx }: Props) {
  return (
    <Text
      paddingLeft="4px"
      fontSize="14px"
      lineHeight="20px"
      color="gray.500"
      {...sx}
    >
      {children}
    </Text>
  );
}
