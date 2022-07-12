import type { ButtonProps } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';

function LinkButton({ children, ...rest }: ButtonProps) {
  return (
    <Button
      variant="link"
      color="primary"
      fontWeight={400}
      fontSize="12px"
      lineHeight="18px"
      _hover={{ color: 'brand.700' }}
      _active={{ color: 'brand.700' }}
      {...rest}
    >
      {children}
    </Button>
  );
}

export default LinkButton;
