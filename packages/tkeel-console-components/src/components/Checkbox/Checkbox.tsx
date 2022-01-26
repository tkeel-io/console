// import { ReactNode } from 'react';
import { Checkbox, CheckboxProps } from '@chakra-ui/react';

export default function CustomCheckbox(props: CheckboxProps) {
  return <Checkbox size="sm" colorScheme="primary" {...props} />;
}
