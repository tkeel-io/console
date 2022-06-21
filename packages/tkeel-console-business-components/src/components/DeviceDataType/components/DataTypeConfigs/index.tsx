import { Box, Button, Flex, Wrap } from '@chakra-ui/react';
import { indexOf, keys } from 'lodash';
import { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';

import { FormField } from '@tkeel/console-components';

import { CommandParamFormField } from '../../../DeviceCommandModal/components/CommandParamModal/types';
import { DATA_TYPE, DATA_TYPE_CONFIG } from '../../constants';
import {
  DataTypeKey,
  FieldArrayHandler,
  FormFieldType,
  TelemetryFormField,
} from '../../types';
import ExtendedConfigButton from '../ExtendedConfigButton';

const { TextField } = FormField;

interface Props {
  dataType: string;
  formHandler: FormFieldType;
  fieldArrayHandler: FieldArrayHandler;
  supportExtendedConfig?: boolean;
  extendedArrayHandler?: UseFieldArrayReturn<TelemetryFormField, 'extendInfo'>;
}

export default function DataTypeConfigs({
  dataType,
  formHandler,
  fieldArrayHandler,
  supportExtendedConfig,
  extendedArrayHandler,
}: Props) {
  const { register, watch } = formHandler as UseFormReturn<
    TelemetryFormField | CommandParamFormField
  >;
  const watchFields = watch();
  const { fields, append, remove } = fieldArrayHandler;
  const { append: extendedAppend, remove: extendedRemove } =
    (extendedArrayHandler as UseFieldArrayReturn<
      TelemetryFormField,
      'extendInfo',
      'id'
    >) || {
      append: () => {},
      remove: () => {},
    };

  const item = DATA_TYPE.find((v) => v.value === dataType);

  const extendedAppendEnum = (key: string) => {
    if (key === 'enum' && supportExtendedConfig) {
      extendedAppend([
        {
          label: '1',
          value: '',
        },
        {
          label: '2',
          value: '',
        },
      ]);
    }
  };

  if (item) {
    const { configs } = item;
    return (
      <>
        <Flex justifyContent="space-between" mb="10px">
          <Wrap spacing="8px">
            {configs.map((key) => {
              const { label } = DATA_TYPE_CONFIG[key as DataTypeKey];
              const isSelected = watchFields?.fields?.some(
                (v) => v.key === key
              );
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
                      append({ key, value: '' });
                      extendedAppendEnum(key);
                    } else {
                      const index = watchFields.fields.findIndex(
                        (v) => v.key === key
                      );
                      remove(index);
                      if (key === 'enum' && supportExtendedConfig) {
                        extendedRemove();
                      }
                    }
                  }}
                >
                  {label}
                </Button>
              );
            })}
          </Wrap>
          <ExtendedConfigButton
            supportExtendedConfig={supportExtendedConfig}
            extendedArrayHandler={extendedArrayHandler}
          />
        </Flex>
        <Box overflowY="scroll" maxH="390px">
          {fields.map((field, index) => {
            if (
              indexOf(keys(DATA_TYPE_CONFIG), field.key) < 0 ||
              field.key === 'enum'
            ) {
              return null;
            }
            const { label, type } = DATA_TYPE_CONFIG[field.key as DataTypeKey];

            return (
              <TextField
                key={field.id}
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

  return supportExtendedConfig ? (
    <Flex justifyContent="flex-end">
      <ExtendedConfigButton
        supportExtendedConfig={supportExtendedConfig}
        extendedArrayHandler={extendedArrayHandler}
      />
    </Flex>
  ) : null;
}
