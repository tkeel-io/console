import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';
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
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  schemas?: UseFormRegisterReturn;
  inputStyle?: StyleProps;
  onChange?: ChangeEventHandler<HTMLInputElement>;
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
  disabled,
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
        disabled={disabled}
        borderColor="gray.200"
        boxShadow="none!important"
        _placeholder={{ color: 'blackAlpha.500' }}
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
