import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { StyleProps, Textarea } from '@chakra-ui/react';

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
  schemas?: UseFormRegisterReturn;
  inputStyle?: StyleProps;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
};

const defaultProps = {
  inputStyle: {},
  ...fieldDefaultProps,
};

function TextareaField({
  id,
  value,
  placeholder,
  schemas,
  inputStyle,
  onChange,
  ...rest
}: Props) {
  return (
    <FormControl id={id} {...rest}>
      <Textarea
        id={id}
        defaultValue={value}
        placeholder={placeholder}
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

TextareaField.defaultProps = defaultProps;

export default TextareaField;
