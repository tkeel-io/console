import { Center } from '@chakra-ui/react';
import { CSSProperties, ReactNode } from 'react';
import {
  Control,
  Controller,
  FieldPath,
  RegisterOptions,
} from 'react-hook-form';

import { CheckFilledIcon } from '@tkeel/console-icons';

import FormControl, {
  FormControlProps,
} from '@/tkeel-console-components/components/FormControl';

import { Select } from '../Select';
import { fieldDefaultProps } from './default-props';

type Value = string | number;

type Props<T> = FormControlProps & {
  id: string;
  name: FieldPath<T>;
  options: { value: Value; label: string | ReactNode }[];
  mode?: 'combobox' | 'multiple' | 'tags';
  showArrow?: boolean;
  allowClear?: boolean;
  loading?: boolean;
  defaultValue?: Value;
  placeholder?: string;
  rules?: Omit<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  control: Control<T>;
  selectStyle?: CSSProperties;
};

const defaultProps = {
  ...fieldDefaultProps,
  placeholder: '请选择',
};

export default function CustomFormControl<T>({
  id,
  name,
  options,
  mode,
  showArrow = true,
  allowClear = false,
  loading = false,
  placeholder,
  defaultValue,
  rules,
  control,
  selectStyle,
  ...rest
}: Props<T>) {
  return (
    <FormControl id={id} {...rest}>
      <Controller<T, FieldPath<T>>
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <Select
            mode={mode}
            placeholder={placeholder}
            showArrow={showArrow}
            allowClear={allowClear}
            loading={loading}
            dropdownStyle={{ boxShadow: 'none' }}
            options={options}
            onChange={onChange}
            value={value}
            defaultValue={defaultValue}
            menuItemSelectedIcon={
              <Center width="30px" height="36px">
                <CheckFilledIcon color="primary" />
              </Center>
            }
            style={{ width: '100%', ...selectStyle }}
          />
        )}
      />
    </FormControl>
  );
}

CustomFormControl.defaultProps = defaultProps;
