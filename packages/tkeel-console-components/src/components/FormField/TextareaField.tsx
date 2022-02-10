import { HTMLInputTypeAttribute } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { StyleProps, Textarea } from '@chakra-ui/react';

import FormControl, {
  FormControlProps,
} from '@/tkeel-console-components/components/FormControl';

import { fieldDefaultProps } from './default-props';
import { getFocusStyle } from './utils';

type Props = FormControlProps &
  UseFormRegisterReturn & {
    id: string;
    type?: HTMLInputTypeAttribute;
    defaultValue?: string;
    placeholder?: string;
    registerReturn?: UseFormRegisterReturn;
    inputStyle?: StyleProps;
  };

const defaultProps = {
  inputStyle: {},
  ...fieldDefaultProps,
};

function TextareaField({
  id,
  defaultValue,
  placeholder,
  registerReturn,
  inputStyle,
  ...rest
}: Props) {
  return (
    <FormControl id={id} {...rest}>
      <Textarea
        id={id}
        defaultValue={defaultValue}
        placeholder={placeholder}
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

TextareaField.defaultProps = defaultProps;

export default TextareaField;
