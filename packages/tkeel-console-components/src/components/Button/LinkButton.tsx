import { Button, ButtonProps } from '@chakra-ui/react';

function LinkButton({ children, ...rest }: ButtonProps) {
  return (
    <Button
      variant="link"
      color="primary"
      fontWeight={400}
      fontSize="12px"
      lineHeight="18px"
      _hover={{ color: 'primarySub3' }}
      _active={{ color: 'primarySub3' }}
      {...rest}
    >
      {children}
    </Button>
  );
}

export default LinkButton;
