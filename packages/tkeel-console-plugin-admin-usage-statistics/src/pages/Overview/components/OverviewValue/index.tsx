import type { StyleProps } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  sx?: StyleProps;
}

export default function OverviewValue({ children, sx }: Props) {
  return (
    <Text
      fontWeight="500"
      fontSize="24px"
      lineHeight="24px"
      color="gray.700"
      {...sx}
    >
      {children}
    </Text>
  );
}
