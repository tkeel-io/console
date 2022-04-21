// import { ReactNode } from 'react';
import { Checkbox, CheckboxProps } from '@chakra-ui/react';

export default function CustomCheckbox(props: CheckboxProps) {
  return (
    <Checkbox
      size="sm"
      colorScheme="brand"
      css={`
        > span:first-of-type {
          box-shadow: unset;
        }
      `}
      {...props}
    />
  );
}
