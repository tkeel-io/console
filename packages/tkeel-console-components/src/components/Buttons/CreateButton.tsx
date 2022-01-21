import { Button, ButtonProps, Circle } from '@chakra-ui/react';
import { AddFilledIcon } from '@tkeel/console-icons';

function CreateButton({ children, ...rest }: ButtonProps) {
  return (
    <Button
      leftIcon={
        <Circle size="20px" backgroundColor="primarySub3">
          <AddFilledIcon color="white" />
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

export default CreateButton;
