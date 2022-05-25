import { Box, Center, Flex, IconButton, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';

import { FormField } from '@tkeel/console-components';
import { PencilFilledIcon, TrashFilledIcon } from '@tkeel/console-icons';

import { FormFieldType, TelemetryFormField } from '../../types';

const { TextField } = FormField;

interface Props {
  formHandler: FormFieldType;
  extendedArrayHandler?: UseFieldArrayReturn<TelemetryFormField, 'extendInfo'>;
}

export default function ExtendedConfig({
  extendedArrayHandler,
  formHandler,
}: Props) {
  const [labelId, setLabelId] = useState<string>('');

  const { fields: configFields, remove: configRemove } =
    extendedArrayHandler as UseFieldArrayReturn<
      TelemetryFormField,
      'extendInfo'
    >;

  const { register, setFocus } =
    formHandler as UseFormReturn<TelemetryFormField>;

  const renderLabel = (params: {
    field: Record<'id', string>;
    index: number;
  }) => {
    const fontColor = 'grayAlternatives.300';
    const { field, index } = params;

    return (
      <Flex justify="space-between">
        <Input
          color="gray.700"
          border="none"
          m="1px"
          size="xs"
          placeholder="请修改扩展属性标题"
          fontSize="14px"
          fontWeight="500"
          pl="2px"
          isReadOnly={labelId !== field.id}
          {...register(`extendInfo.${index}.label`, {
            required: { value: false, message: 'required' },
          })}
          focusBorderColor="primary"
          onBlur={() => {
            setLabelId('');
          }}
        />
        <Center>
          <IconButton
            variant="link"
            size="sm"
            aria-label="edit"
            icon={<PencilFilledIcon color={fontColor} />}
            onClick={() => {
              setLabelId(field.id);
              setFocus(`extendInfo.${index}.label` as const);
            }}
          />
          <IconButton
            lineHeight="24px"
            variant="link"
            size="sm"
            aria-label="delete"
            icon={<TrashFilledIcon color={fontColor} />}
            onClick={() => {
              configRemove(index);
            }}
          />
        </Center>
      </Flex>
    );
  };

  const renderConfigFields = configFields.map((field, index) => {
    return (
      <TextField
        key={field.id}
        label={renderLabel({ field, index })}
        id={field.id}
        registerReturn={register(`extendInfo.${index}.value` as const, {
          required: { value: false, message: 'required' },
        })}
      />
    );
  });
  return <Box overflowY="scroll">{renderConfigFields}</Box>;
}
