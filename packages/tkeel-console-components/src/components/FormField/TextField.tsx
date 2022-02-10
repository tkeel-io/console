import { HTMLInputTypeAttribute } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Input, StyleProps } from '@chakra-ui/react';

import FormControl, {
  FormControlProps,
} from '@/tkeel-console-components/components/FormControl';

import { fieldDefaultProps } from './default-props';
import { getFocusStyle } from './utils';

type Props = FormControlProps & {
  id: string;
  type?: HTMLInputTypeAttribute;
  defaultValue?: string;
  value?: string;
  placeholder?: string;
  isDisabled?: boolean;
  registerReturn?: UseFormRegisterReturn;
  inputStyle?: StyleProps;
};

const defaultProps = {
  type: 'text',
  inputStyle: {},
  ...fieldDefaultProps,
};

export default function TextField({
  id,
  type,
  defaultValue,
  value,
  placeholder,
  isDisabled,
  registerReturn,
  inputStyle,
  ...rest
}: Props) {
  return (
    <FormControl id={id} {...rest}>
      <Input
        id={id}
        type={type}
        defaultValue={defaultValue}
        value={value}
        placeholder={placeholder}
        isDisabled={isDisabled}
        borderColor="gray.200"
        boxShadow="none!important"
        _placeholder={{ color: 'blackAlpha.500' }}
        _focus={getFocusStyle(!!rest.error)}
        {...registerReturn}
        {...inputStyle}
      />
    </FormControl>
  );
}

TextField.defaultProps = defaultProps;
