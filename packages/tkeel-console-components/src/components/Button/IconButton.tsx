import { ReactNode } from 'react';
import { Button, ButtonProps, Circle } from '@chakra-ui/react';

interface Props extends ButtonProps {
  icon: ReactNode;
}

function IconButton({ icon, children, ...rest }: Props) {
  return (
    <Button
      leftIcon={
        <Circle size="20px" backgroundColor="primarySub3">
          {icon}
        </Circle>
      }
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
