import { Box, Radio as ChakraRadio, RadioProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props extends RadioProps {
  children: ReactNode;
}

export default function Radio({ children, ...rest }: Props) {
  return (
    <ChakraRadio
      colorScheme="brand"
      color="red.500"
      _focus={{
        '> span[data-focus]': {
          boxShadow: 'none',
        },
      }}
      {...rest}
    >
      <Box color="gray.500" fontSize="12px">
        {children}
      </Box>
    </ChakraRadio>
  );
}
