import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function BaseBox({ children }: Props) {
  return (
    <Box
      backgroundColor="white"
      borderRadius="4px"
      border="1px solid"
      borderColor="grayAlternatives.100"
    >
      {children}
    </Box>
  );
}
