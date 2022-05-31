import type { StyleProps } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  sx?: StyleProps;
}

export default function BaseBox({ children, sx }: Props) {
  return (
    <Box
      backgroundColor="white"
      borderRadius="4px"
      border="1px solid"
      borderColor="grayAlternatives.100"
      {...sx}
    >
      {children}
    </Box>
  );
}
