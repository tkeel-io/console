import { Center } from '@chakra-ui/react';
import { CSSProperties, ReactNode } from 'react';
import {
  Control,
  Controller,
  FieldPath,
  FieldPathValue,
  Path,
  RegisterOptions,
  UnpackNestedValue,
} from 'react-hook-form';

import { CheckFilledIcon } from '@tkeel/console-icons';

import FormControl, {
  FormControlProps,
} from '@/tkeel-console-components/components/FormControl';

import { Select } from '../Select';
import { fieldDefaultProps } from './default-props';

type Value = string | number;

type Props<TFieldValues> = FormControlProps & {
  id: string;
  name: FieldPath<TFieldValues>;
  options: { value: Value; label: string | ReactNode }[];
  mode?: 'combobox' | 'multiple' | 'tags';
  showArrow?: boolean;
  allowClear?: boolean;
  loading?: boolean;
  defaultValue?: UnpackNestedValue<
    FieldPathValue<TFieldValues, Path<TFieldValues>>
  >;
  placeholder?: string;
  rules?: Omit<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  control: Control<TFieldValues>;
  selectStyle?: CSSProperties;
};

const defaultProps = {
  ...fieldDefaultProps,
  placeholder: '请选择',
};

export default function CustomFormControl<TFieldValues>({
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
}: Props<TFieldValues>) {
  return (
    <FormControl id={id} {...rest}>
      <Controller<TFieldValues, FieldPath<TFieldValues>>
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
            // defaultValue={defaultValue}
            menuItemSelectedIcon={
              <Center width="30px" height="36px">
                <CheckFilledIcon color="primary" />
              </Center>
            }
            style={{ width: '100%', ...selectStyle }}
          />
        )}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
}

CustomFormControl.defaultProps = defaultProps;
