import { Button, ButtonProps, Circle } from '@chakra-ui/react';
import { ReactElement } from 'react';

interface Props extends ButtonProps {
  isShowCircle?: boolean;
  icon: ReactElement;
}

function IconButton({ isShowCircle = false, icon, children, ...rest }: Props) {
  return (
    <Button
      leftIcon={
        isShowCircle ? (
          <Circle size="20px" backgroundColor="primarySub3">
            {icon}
          </Circle>
        ) : (
          icon
        )
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
