import { ReactNode } from 'react';
import { Box, Button, ButtonProps } from '@chakra-ui/react';

interface Props extends ButtonProps {
  icon: ReactNode;
}

function IconButton({ icon, children, ...rest }: Props) {
  return (
    <Button
      leftIcon={<Box mr="0">{icon}</Box>}
      colorScheme="primary"
      fontWeight={600}
      fontSize="12px"
      lineHeight="24px"
      {...rest}
    >
      {children}
    </Button>
  );
}

export default IconButton;
