import { Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function Label({ children }: Props) {
  return (
    <Text
      marginBottom="8px"
      color="grayAlternatives.300"
      fontSize="12px"
      lineHeight="24px"
    >
      {children}
    </Text>
  );
}
