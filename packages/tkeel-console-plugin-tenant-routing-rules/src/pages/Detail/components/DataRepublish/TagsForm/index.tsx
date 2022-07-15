import { Box, Center, Flex, IconButton, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { Path, UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';

import { FormField } from '@tkeel/console-components';
import { PencilFilledIcon, TrashFilledIcon } from '@tkeel/console-icons';

const { TextField } = FormField;

interface Props<FormValues> {
  formHandler: UseFormReturn<FormValues, object>;
  fieldArrayReturn: UseFieldArrayReturn<FormValues>;
}

export default function TagsForm<FormValues>({
  formHandler,
  fieldArrayReturn,
}: Props<FormValues>) {
  const [labelId, setLabelId] = useState<string>('');

  const { fields, remove } = fieldArrayReturn;

  const { register, setFocus } = formHandler;

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
          // placeholder="请输入自定义标签字符串"
          defaultValue="请输入自定义标签字符串"
          fontSize="14px"
          fontWeight="500"
          pl="2px"
          isReadOnly={labelId !== field.id}
          {...register(`tags.${index}.label` as Path<FormValues>, {
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
              setFocus(`tags.${index}.label` as Path<FormValues>);
            }}
          />
          <IconButton
            lineHeight="24px"
            variant="link"
            size="sm"
            aria-label="delete"
            icon={<TrashFilledIcon color={fontColor} />}
            onClick={() => {
              remove(index);
            }}
          />
        </Center>
      </Flex>
    );
  };

  const renderTags = fields.map((field, index) => {
    return (
      <TextField
        key={field.id}
        label={renderLabel({ field, index })}
        id={field.id}
        registerReturn={register(`tags.${index}.value` as Path<FormValues>, {
          required: { value: false, message: 'required' },
        })}
      />
    );
  });
  return <Box overflowY="scroll">{renderTags}</Box>;
}
