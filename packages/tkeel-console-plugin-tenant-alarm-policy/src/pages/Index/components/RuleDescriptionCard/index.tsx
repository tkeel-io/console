import { Flex, HStack, RadioGroup, Text } from '@chakra-ui/react';
import {
  Control,
  Controller,
  Path,
  UseFieldArrayReturn,
  UseFormRegister,
  useWatch,
} from 'react-hook-form';

import { FormControl, FormField, Radio } from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';
import { AddFilledIcon, TrashFilledIcon } from '@tkeel/console-icons';

import {
  calculateOptions,
  durationOptions,
  enumOperatorOptions,
  numberOperatorOptions,
} from '@/tkeel-console-plugin-tenant-alarm-policy/constants';

const { TextField, SelectField } = FormField;

interface Props<FormValues> {
  register: UseFormRegister<FormValues>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<FormValues, any>;
  append: () => void;
  fieldArrayReturn: UseFieldArrayReturn<FormValues>;
}

export default function RuleDescriptionCard<FormValues>({
  register,
  control,
  append,
  fieldArrayReturn,
}: Props<FormValues>) {
  const { fields, remove } = fieldArrayReturn;

  const output = useWatch({
    name: 'conditions' as Path<FormValues>,
    control,
  });

  const primaryColor = useColor('primary');

  const telemetryOptions = [
    {
      label: 'enum',
      value: 'enum',
    },
    {
      label: 'boolean',
      value: 'boolean',
    },
    {
      label: 'number',
      value: 'number',
    },
  ];

  const selectProps = {
    control,
    formControlStyle: { marginBottom: '0' },
  };

  const getFieldId = (i: number, id: string) => {
    return `conditions.${i}.${id}` as Path<FormValues>;
  };

  return (
    <Flex
      width="100%"
      flexDirection="column"
      padding="16px"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="grayAlternatives.100"
      borderRadius="4px"
      backgroundColor="gray.100"
    >
      <Flex justifyContent="space-between">
        <Flex alignItems="center" color="gray.700" fontSize="14px">
          <Text>满足</Text>
          <FormControl
            id="conditionsOperator"
            formControlStyle={{ marginBottom: '0', width: 'auto' }}
          >
            <Controller
              name={'conditionsOperator' as Path<FormValues>}
              control={control}
              render={({ field: { onChange, value } }) => (
                <RadioGroup
                  padding="0 10px"
                  onChange={onChange}
                  value={value as string}
                >
                  <Radio value="or">
                    <Text color="gray.700">or</Text>
                  </Radio>
                  <Radio marginLeft="20px" value="and">
                    <Text color="gray.700">and</Text>
                  </Radio>
                </RadioGroup>
              )}
            />
          </FormControl>
          <Text>条件时，触发告警。</Text>
        </Flex>
        <Flex
          alignItems="center"
          cursor="pointer"
          _hover={{
            svg: {
              fill: `${primaryColor} !important`,
            },
            p: {
              color: primaryColor,
            },
          }}
          onClick={() => append()}
        >
          <AddFilledIcon color="grayAlternatives.300" />
          <Text color="grayAlternatives.300" fontSize="12px" fontWeight="500">
            添加规则
          </Text>
        </Flex>
      </Flex>
      <Flex flexDirection="column" marginTop="20px">
        {fields.map((item, i) => {
          /* eslint-disable @typescript-eslint/no-unsafe-member-access */
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const { attribute, duration } = output[i] || {};
          /* eslint-enable */
          const attributeIsNumber = !attribute || attribute === 'number';
          const attributeIsEnum = attribute === 'enum';
          const attributeIsBoolean = attribute === 'boolean';

          const attributeId = `conditions.${i}.attribute` as Path<FormValues>;
          return (
            <HStack
              key={item.id}
              alignItems="center"
              spacing="8px"
              _notLast={{ marginBottom: '8px' }}
              padding="0 16px"
              height="64px"
              borderRadius="4px"
              backgroundColor="white"
            >
              <Text
                marginRight="10px"
                color="gray.700"
                fontSize="14px"
                fontWeight="500"
              >
                if
              </Text>
              <SelectField<FormValues>
                id={attributeId}
                name={attributeId}
                placeholder="请选择"
                options={telemetryOptions}
                control={control}
                formControlStyle={{
                  marginBottom: '0',
                  flexShrink: 0,
                  width: '156px',
                }}
              />
              {attributeIsNumber && (
                <>
                  <SelectField<FormValues>
                    id={getFieldId(i, 'duration')}
                    name={getFieldId(i, 'duration')}
                    placeholder="请选择"
                    options={durationOptions}
                    {...selectProps}
                  />
                  {duration !== 0 && (
                    <SelectField<FormValues>
                      id={getFieldId(i, 'calculate')}
                      name={getFieldId(i, 'calculate')}
                      placeholder="请选择"
                      options={calculateOptions}
                      {...selectProps}
                    />
                  )}
                </>
              )}
              {attributeIsNumber && (
                <SelectField<FormValues>
                  id={getFieldId(i, 'numberOperator')}
                  name={getFieldId(i, 'numberOperator')}
                  placeholder="运算符"
                  options={numberOperatorOptions}
                  {...selectProps}
                />
              )}
              {attributeIsEnum && (
                <>
                  <SelectField<FormValues>
                    id={getFieldId(i, 'enumOperator')}
                    name={getFieldId(i, 'enumOperator')}
                    placeholder="运算符"
                    options={enumOperatorOptions}
                    {...selectProps}
                  />
                  <SelectField<FormValues>
                    id={getFieldId(i, 'enumItem')}
                    name={getFieldId(i, 'enumItem')}
                    placeholder="请选择"
                    options={[
                      {
                        label: 'enum1',
                        value: '枚举项1',
                      },
                      {
                        label: 'enum2',
                        value: '枚举项3',
                      },
                    ]}
                    {...selectProps}
                  />
                </>
              )}
              {attributeIsBoolean && (
                <>
                  <SelectField<FormValues>
                    id={getFieldId(i, 'booleanOperator')}
                    name={getFieldId(i, 'booleanOperator')}
                    placeholder="运算符"
                    options={enumOperatorOptions}
                    {...selectProps}
                  />
                  <SelectField<FormValues>
                    id={getFieldId(i, 'booleanItem')}
                    name={getFieldId(i, 'booleanItem')}
                    placeholder="请选择"
                    options={[
                      {
                        label: 'true',
                        value: '1',
                      },
                      {
                        label: 'false',
                        value: '0',
                      },
                    ]}
                    {...selectProps}
                  />
                </>
              )}
              {attributeIsNumber && (
                <TextField
                  id={getFieldId(i, 'numberValue')}
                  registerReturn={register(getFieldId(i, 'numberValue'))}
                  type="number"
                  formControlStyle={{ marginBottom: '0' }}
                />
              )}
              <TrashFilledIcon
                color="grayAlternatives.300"
                style={{ flexShrink: 0, cursor: 'pointer' }}
                onClick={() => remove(i)}
              />
            </HStack>
          );
        })}
      </Flex>
    </Flex>
  );
}
