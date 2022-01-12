import React, { HTMLInputTypeAttribute } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Input, StyleProps } from '@chakra-ui/react';

import { fieldDefaultProps } from './default-props';
import FormControl, { FormControlProps } from './FormControl';
import { getFocusStyle } from './utils';

type Props = FormControlProps & {
  id: string;
  type?: HTMLInputTypeAttribute;
  value?: string;
  placeholder?: string;
  schemas?: UseFormRegisterReturn;
  inputStyle?: StyleProps;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const defaultProps = {
  type: 'text',
  inputStyle: {},
  ...fieldDefaultProps,
};

function InputField({
  id,
  type,
  value,
  placeholder,
  schemas,
  inputStyle,
  onChange,
  ...rest
}: Props) {
  return (
    <FormControl id={id} {...rest}>
      <Input
        id={id}
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        borderColor="gray.200"
        boxShadow="none!important"
        _focus={getFocusStyle(!!rest.error)}
        {...schemas}
        {...inputStyle}
        onChange={onChange}
      />
    </FormControl>
  );
}

InputField.defaultProps = defaultProps;

export default InputField;
