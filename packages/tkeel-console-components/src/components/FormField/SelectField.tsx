/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEventHandler } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Select } from '@chakra-ui/react';

import FormControl, {
  FormControlProps,
} from '@/tkeel-console-components/components/FormControl';

import { fieldDefaultProps } from './default-props';
import { getFocusStyle } from './utils';

type Value = string | number;

type Props = FormControlProps & {
  id: string;
  options: { value: Value; label: Value }[];
  value?: Value;
  placeholder?: string;
  schemas?: UseFormRegisterReturn;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
};

const defaultProps = {
  ...fieldDefaultProps,
  placeholder: '请选择',
};

function CustomFormControl({
  id,
  options,
  placeholder,
  value: defaultValue,
  schemas,
  onChange,
  ...rest
}: Props) {
  return (
    <FormControl id={id} {...rest}>
      <Select
        defaultValue={defaultValue}
        id={id}
        placeholder={placeholder}
        boxShadow="none!important"
        color="blackAlpha.500"
        _focus={getFocusStyle(!!rest.error)}
        {...schemas}
        onChange={onChange}
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
