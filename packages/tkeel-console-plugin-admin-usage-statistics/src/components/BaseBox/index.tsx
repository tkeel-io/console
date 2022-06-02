import type { StyleProps } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  sx?: StyleProps;
  onClick?: () => void;
}

export default function BaseBox({ children, sx, onClick }: Props) {
  const isFunction = typeof onClick === 'function';

  return (
    <Box
      overflow="hidden"
      backgroundColor="white"
      borderRadius="4px"
      border="1px solid"
      borderColor="grayAlternatives.100"
      cursor={isFunction ? 'pointer' : ''}
      {...sx}
      onClick={() => {
        if (isFunction) {
          onClick();
        }
      }}
    >
      {children}
    </Box>
  );
}
