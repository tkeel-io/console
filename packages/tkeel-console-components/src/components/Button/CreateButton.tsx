import { ButtonProps } from '@chakra-ui/react';
import { AddFilledIcon } from '@tkeel/console-icons';

import IconButton from './IconButton';

function CreateButton({ children, ...rest }: ButtonProps) {
  return (
    // @ts-ignore
    <IconButton
      isShowCircle
      icon={<AddFilledIcon color="white" />}
      paddingLeft="6px"
      paddingRight="16px"
      {...rest}
    >
      {children}
    </IconButton>
  );
}

export default CreateButton;
