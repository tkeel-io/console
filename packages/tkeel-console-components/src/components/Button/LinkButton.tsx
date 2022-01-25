import { Button, ButtonProps } from '@chakra-ui/react';

function LinkButton({ children, ...rest }: ButtonProps) {
  return (
    <Button
      variant="link"
      color="primary"
      fontWeight={400}
      fontSize="12px"
      lineHeight="18px"
      _hover={{ color: 'blue.400' }}
      _active={{ color: 'blue.400' }}
      {...rest}
    >
      {children}
    </Button>
  );
}

export default LinkButton;
