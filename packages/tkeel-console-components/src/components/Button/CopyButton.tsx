import { ButtonProps, StyleProps } from '@chakra-ui/react';

import { CopyFilledIcon } from '@tkeel/console-icons';

import IconButton from './IconButton';

interface Props extends ButtonProps {
  iconSize?: string | number;
  styles?: {
    root?: StyleProps;
  };
}

function CreateButton({ iconSize = '16px', styles, ...rest }: Props) {
  return (
    // @ts-ignore
    <IconButton
      padding="8px"
      variant="ghost"
      icon={<CopyFilledIcon size={iconSize} />}
      {...styles?.root}
      {...rest}
    />
  );
}

export default CreateButton;
