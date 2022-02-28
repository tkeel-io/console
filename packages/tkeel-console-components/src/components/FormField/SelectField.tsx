import { Select } from '@chakra-ui/react';
import { UseFormRegisterReturn } from 'react-hook-form';

import FormControl, {
  FormControlProps,
} from '@/tkeel-console-components/components/FormControl';

import { fieldDefaultProps } from './default-props';
import { getFocusStyle } from './utils';

type Value = string | number;

type Props = FormControlProps & {
  id: string;
  options: { value: Value; label: Value }[];
  defaultValue?: Value;
  placeholder?: string;
  registerReturn?: UseFormRegisterReturn;
};

const defaultProps = {
  ...fieldDefaultProps,
  placeholder: '请选择',
};

function CustomFormControl({
  id,
  options,
  placeholder,
  defaultValue,
  registerReturn,
  ...rest
}: Props) {
  return (
    <FormControl id={id} {...rest}>
      <Select
        defaultValue={defaultValue}
        id={id}
        placeholder={placeholder}
        boxShadow="none!important"
        color="gray.700"
        fontSize="14px"
        _focus={getFocusStyle(!!rest.error)}
        {...registerReturn}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}

CustomFormControl.defaultProps = defaultProps;

export default CustomFormControl;
