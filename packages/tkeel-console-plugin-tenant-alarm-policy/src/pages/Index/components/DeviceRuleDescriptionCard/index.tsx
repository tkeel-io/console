import { Box, Flex, HStack, RadioGroup, Text } from '@chakra-ui/react';
import {
  Control,
  Controller,
  Path,
  UseFieldArrayReturn,
  UseFormRegister,
  useWatch,
} from 'react-hook-form';

import { FormControl, FormField, Radio } from '@tkeel/console-components';
import { TrashFilledIcon } from '@tkeel/console-icons';
import {
  TelemetryType,
  useDeviceDetailQuery,
  useTemplateTelemetryQuery,
} from '@tkeel/console-request-hooks';

import {
  durationOptions,
  enumOperatorOptions,
  numberOperatorOptions,
  polymerizeOptions,
} from '@/tkeel-console-plugin-tenant-alarm-policy/constants';
import {
  Operator,
  Polymerize,
  RequestTelemetryType,
  Time,
} from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/mutations/useCreatePolicyMutation';
import { Status } from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/usePolicyListQuery';
import {
  parseBooleanEnumValue,
  parseTelemetryInfo,
} from '@/tkeel-console-plugin-tenant-alarm-policy/utils';

import AddRuleButton from '../AddRuleButton';

const { TextField, SelectField } = FormField;

export type BaseOperator = Operator.Eq | Operator.Ne;

export interface DeviceCondition {
  telemetry: string | null;
  time?: Time | null;
  polymerize?: Polymerize | null;
  numberOperator?: Operator | null;
  enumOperator?: BaseOperator | null;
  enumValue?: string;
  booleanOperator?: BaseOperator | null;
  booleanValue?: string;
  numberValue?: string;
}

export const defaultDeviceCondition: DeviceCondition = {
  telemetry: null,
  time: Time.OneMinute,
  polymerize: Polymerize.Avg,
  numberOperator: Operator.Gt,
  numberValue: '',
  booleanOperator: Operator.Eq,
  enumOperator: Operator.Eq,
};

interface Props<FormValues> {
  tempId: string;
  deviceId: string;
  tempStatus: Status | undefined;
  register: UseFormRegister<FormValues>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<FormValues, any>;
  deviceConditionsErrors: number[];
  append: () => void;
  fieldArrayReturn: UseFieldArrayReturn<FormValues>;
}

function getOptionsByDefine(define: object) {
  return Object.entries(define || {}).map(([key, value]) => ({
    label: value as string,
    value: JSON.stringify({ label: value as string, value: key }),
  }));
}

// function isStatusUnchanged(status: Status | undefined) {
//   return (
//     status === undefined || ![Status.Deleted, Status.Modified].includes(status)
//   );
// }

function getNewValueOptions({
  value,
  options,
}: {
  value: string;
  options: { label: string; value: string }[];
}) {
  const { label, value: optionValue } = parseBooleanEnumValue(value);
  const defaultBooleanValueOption = {
    label,
    value: JSON.stringify({ label, value: optionValue }),
    disabled: true,
  };
  if (value && !options.some((option) => option.value === value)) {
    return [defaultBooleanValueOption, ...options];
  }
  return options;
}

export default function DeviceRuleDescriptionCard<FormValues>({
  tempId,
  deviceId,
  tempStatus,
  register,
  control,
  deviceConditionsErrors,
  append,
  fieldArrayReturn,
}: Props<FormValues>) {
  const { telemetry: templateTelemetryFields } = useTemplateTelemetryQuery({
    id: tempId,
    enabled: tempStatus !== Status.Deleted,
  });
  const { deviceObject } = useDeviceDetailQuery({ id: deviceId });

  let telemetryFields = templateTelemetryFields;
  if (deviceId) {
    telemetryFields = deviceObject?.configs?.telemetry?.define?.fields || {};
  }

  const telemetryOptions = Object.entries(telemetryFields).map(
    ([key, value]) => {
      let type = RequestTelemetryType.Common;
      if (value.type === TelemetryType.Bool) {
        type = RequestTelemetryType.Bool;
      }

      if (value.type === TelemetryType.Enum) {
        type = RequestTelemetryType.Enum;
      }

      return {
        label: value.name,
        value: JSON.stringify({ id: key, name: value.name, type }),
      };
    }
  );

  const { fields, remove } = fieldArrayReturn;

  const output = useWatch({
    name: 'deviceConditions' as Path<FormValues>,
    control,
  });

  const selectProps = {
    control,
    formControlStyle: { marginBottom: '0' },
  };

  const getFieldId = (i: number, id: string) => {
    return `deviceConditions.${i}.${id}` as Path<FormValues>;
  };

  return (
    <Flex flex="1" flexDirection="column">
      <Flex justifyContent="space-between">
        <Flex alignItems="center" color="gray.700" fontSize="14px">
          <Text>满足</Text>
          <FormControl
            id="condition"
            formControlStyle={{ marginBottom: '0', width: 'auto' }}
          >
            <Controller
              name={'condition' as Path<FormValues>}
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
        <AddRuleButton disabled={fields.length > 4} onClick={() => append()} />
      </Flex>
      <Flex flexDirection="column" marginTop="20px">
        {fields.map((item, i) => {
          /* eslint-disable @typescript-eslint/no-unsafe-member-access */
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const { telemetry, time, booleanValue, enumValue } = output[i] || {};
          const {
            id: telemetryId,
            name,
            type,
          } = parseTelemetryInfo(telemetry as string);
          /* eslint-enable */

          const { define } = telemetryFields[telemetryId] || {};

          const telemetryIsNumber =
            !telemetryId || type === RequestTelemetryType.Common;
          const telemetryIsBoolean = type === RequestTelemetryType.Bool;
          const telemetryIsEnum = type === RequestTelemetryType.Enum;

          if (telemetryIsBoolean) {
            delete define?.ext;
          }

          const booleanValueOptions = getOptionsByDefine(define);
          const newBooleanValueOptions = getNewValueOptions({
            value: booleanValue as string,
            options: booleanValueOptions,
          });

          const enumValueOptions = getOptionsByDefine(define?.ext as object);
          const newEnumValueOptions = getNewValueOptions({
            value: enumValue as string,
            options: enumValueOptions,
          });

          const telemetryFieldId =
            `deviceConditions.${i}.telemetry` as Path<FormValues>;

          const newTelemetryOptions = [...telemetryOptions];
          const defaultTelemetryOptions = {
            label: name,
            value: telemetry as string,
            disabled: true,
          };

          if (
            telemetry &&
            !telemetryOptions.some((option) => option.value === telemetry)
          ) {
            newTelemetryOptions.unshift(defaultTelemetryOptions);
          }

          return (
            <Flex
              key={item.id}
              flexDirection="column"
              _notLast={{ marginBottom: '8px' }}
              padding="0 16px"
              borderRadius="4px"
              backgroundColor="white"
            >
              <HStack
                alignItems="center"
                spacing="8px"
                height="64px"
                _hover={{
                  '> div:last-child > svg': {
                    display: 'block !important',
                  },
                }}
              >
                <Text
                  marginRight="10px"
                  color="gray.700"
                  fontSize="14px"
                  fontWeight="500"
                >
                  if
                </Text>
                {/* <Box
                  css={`
                    .rc-select-selector {
                      border-color: red !important;
                    }
                  `}
                > */}
                <SelectField<FormValues>
                  id={telemetryFieldId}
                  name={telemetryFieldId}
                  placeholder="请选择"
                  options={newTelemetryOptions}
                  control={control}
                  formControlStyle={{
                    marginBottom: '0',
                    flexShrink: 0,
                    width: '120px',
                  }}
                />
                {/* </Box> */}
                {telemetryIsNumber && (
                  <>
                    <SelectField<FormValues>
                      id={getFieldId(i, 'time')}
                      name={getFieldId(i, 'time')}
                      placeholder="请选择"
                      options={durationOptions}
                      {...selectProps}
                    />
                    {time !== Time.Immediate && (
                      <SelectField<FormValues>
                        id={getFieldId(i, 'polymerize')}
                        name={getFieldId(i, 'polymerize')}
                        placeholder="请选择"
                        options={polymerizeOptions}
                        {...selectProps}
                      />
                    )}
                  </>
                )}
                {telemetryIsNumber && (
                  <SelectField<FormValues>
                    id={getFieldId(i, 'numberOperator')}
                    name={getFieldId(i, 'numberOperator')}
                    placeholder="运算符"
                    options={numberOperatorOptions}
                    {...selectProps}
                    formControlStyle={{
                      flexShrink: 0,
                      width: '130px',
                    }}
                  />
                )}
                {telemetryIsEnum && (
                  <>
                    <SelectField<FormValues>
                      id={getFieldId(i, 'enumOperator')}
                      name={getFieldId(i, 'enumOperator')}
                      placeholder="运算符"
                      options={enumOperatorOptions}
                      {...selectProps}
                    />
                    <SelectField<FormValues>
                      id={getFieldId(i, 'enumValue')}
                      name={getFieldId(i, 'enumValue')}
                      placeholder="请选择"
                      options={newEnumValueOptions}
                      {...selectProps}
                    />
                  </>
                )}
                {telemetryIsBoolean && (
                  <>
                    <SelectField<FormValues>
                      id={getFieldId(i, 'booleanOperator')}
                      name={getFieldId(i, 'booleanOperator')}
                      placeholder="运算符"
                      options={enumOperatorOptions}
                      {...selectProps}
                      formControlStyle={{
                        width: '140px',
                      }}
                    />
                    <SelectField<FormValues>
                      id={getFieldId(i, 'booleanValue')}
                      name={getFieldId(i, 'booleanValue')}
                      placeholder="请选择"
                      options={newBooleanValueOptions}
                      {...selectProps}
                      formControlStyle={{
                        width: '140px',
                      }}
                    />
                  </>
                )}
                {telemetryIsNumber && (
                  <TextField
                    id={getFieldId(i, 'numberValue')}
                    registerReturn={register(getFieldId(i, 'numberValue'))}
                    type="number"
                    formControlStyle={{ marginBottom: '0' }}
                  />
                )}
                <Box width="16px" flexShrink={0}>
                  {fields.length > 1 && (
                    <TrashFilledIcon
                      color="grayAlternatives.300"
                      style={{
                        display: 'none',
                        flexShrink: 0,
                        cursor: 'pointer',
                      }}
                      onClick={() => remove(i)}
                    />
                  )}
                </Box>
              </HStack>
              {deviceConditionsErrors.includes(i) && (
                <Text marginBottom="6px" color="red.500" fontSize="14px">
                  请将规则填写完整
                </Text>
              )}
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}
