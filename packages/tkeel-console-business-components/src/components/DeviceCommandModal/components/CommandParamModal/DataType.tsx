import { Box, Button, Wrap } from '@chakra-ui/react';
import { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';

import { FormControl, FormField, Select } from '@tkeel/console-components';

import { CommandParamFormField } from './types';

const { TextField } = FormField;

export const DATA_TYPE_CONFIG = {
  max: { label: '最大值', type: 'number' },
  min: { label: '最小值', type: 'number' },
  step: { label: '步长', type: 'number' },
  unit: { label: '单位', type: 'string' },
  '0': { label: '布尔值 0', type: 'string' },
  '1': { label: '布尔值 1', type: 'string' },
  length: { label: '数据最大长度', type: 'number' },
};

const DATA_TYPE = [
  {
    label: 'int32(整型)',
    value: 'int',
    configs: ['max', 'min', 'step', 'unit'],
  },
  {
    value: 'float',
    label: 'float(浮点型)',
    configs: ['max', 'min', 'step', 'unit'],
  },
  {
    value: 'double',
    label: 'double(双精度浮点型)',
    configs: ['max', 'min', 'step', 'unit'],
  },
  {
    value: 'bool',
    label: 'bool(布尔)',
    configs: ['0', '1'],
  },
  {
    value: 'string',
    label: 'string(字符串)',
    configs: ['length'],
  },
  // {
  //   value: 'enum',
  //   label: 'enum(枚举项)',
  //   configs: [],
  // },
  {
    value: 'struct',
    label: 'struct(结构体)',
    configs: [],
  },
];

type Props = {
  formHandler: UseFormReturn<CommandParamFormField, object>;
  fieldArrayHandler: UseFieldArrayReturn<CommandParamFormField, 'fields'>;
};

export default function DataType({ formHandler, fieldArrayHandler }: Props) {
  const { setValue, register, reset, watch } = formHandler;
  const watchFields = watch();
  const { fields, append, remove } = fieldArrayHandler;
  function renderDataTypeConfigs(dataType: string) {
    const item = DATA_TYPE.find((v) => v.value === dataType);
    if (item) {
      const { configs } = item;
      return (
        <>
          <Wrap spacing="8px" mb="10px">
            {configs.map((key) => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              const { label } = DATA_TYPE_CONFIG[key];
              const isSelected = watchFields.fields.some((v) => v.key === key);
              return (
                <Button
                  variant="outline"
                  key={key}
                  borderRadius="4px"
                  color={isSelected ? 'primary' : 'gray.400'}
                  borderColor={isSelected ? 'primary' : 'gray.200'}
                  bg={isSelected ? 'brand.50' : 'white'}
                  height="24px"
                  p="0 12px"
                  fontSize="12px"
                  onClick={() => {
                    if (!isSelected) {
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                      append({ key, value: '' });
                    } else {
                      const index = watchFields.fields.findIndex(
                        (v) => v.key === key
                      );
                      remove(index);
                    }
                  }}
                >
                  {label}
                </Button>
              );
            })}
          </Wrap>
          <Box overflowY="scroll" maxH="390px">
            {fields.map((field, index) => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              const { label, type } = DATA_TYPE_CONFIG[field.key];
              return (
                <TextField
                  key={field.id}
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  label={label}
                  id={field.id}
                  registerReturn={register(`fields.${index}.value` as const, {
                    required: { value: true, message: 'required' },
                    valueAsNumber: type === 'number',
                  })}
                />
              );
            })}
          </Box>
        </>
      );
    }
    return null;
  }
  return (
    <>
      <FormControl id="type" label="数据类型">
        <Select
          style={{ width: '100%' }}
          placeholder="请选择"
          defaultValue={watchFields.type}
          onChange={(value: string) => {
            reset({ fields: [] });
            setValue('type', value);
          }}
        >
          {DATA_TYPE.map((item) => (
            <Select.Option key={item.value} value={item.value}>
              {item.label}
            </Select.Option>
          ))}
        </Select>
      </FormControl>
      <Box>{renderDataTypeConfigs(watchFields.type)}</Box>
    </>
  );
}
