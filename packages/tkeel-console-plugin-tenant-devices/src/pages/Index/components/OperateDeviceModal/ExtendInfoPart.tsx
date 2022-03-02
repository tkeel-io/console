/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Input,
  Text,
  Wrap,
} from '@chakra-ui/react';
import { find, findIndex } from 'lodash';
import { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';

import { FormField } from '@tkeel/console-components/';
import { PencilFilledIcon, TrashFilledIcon } from '@tkeel/console-icons';

import { DeviceFormFields } from '@/tkeel-console-plugin-tenant-devices/pages/Index/types';

interface Props {
  formHandler: UseFormReturn<DeviceFormFields, object>;
  watchFields: DeviceFormFields;
  fieldArrayHandler: UseFieldArrayReturn<DeviceFormFields, 'extendInfo'>;
}

const { TextField } = FormField;

const BASIC_EXTEND_ITEMS = [
  '厂商',
  '版本',
  '所属单位',
  '所属部分',
  '负责人',
  '入场时间',
  '安装时间',
];

export default function ExtendInfoPart({
  formHandler,
  watchFields,
  fieldArrayHandler,
}: Props) {
  const { register, setFocus } = formHandler;
  // const { errors } = formState;
  const { fields, append, remove } = fieldArrayHandler;
  const [labelId, setLabelId] = useState<string>('');

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
          placeholder="请输入"
          fontSize="14px"
          fontWeight="500"
          pl="2px"
          isReadOnly={labelId !== field.id}
          {...register(`extendInfo.${index}.label` as const, {
            required: { value: true, message: 'required' },
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
              setFocus(`extendInfo.${index}.label`);
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
  return (
    <Flex pos="relative" flexDirection="column" h="100%">
      <Button
        pos="absolute"
        top="-24px"
        right="0"
        variant="link"
        size="xs"
        color="grayAlternatives.300"
        _hover={{
          color: 'primary',
        }}
        onClick={() => {
          const itemIndex = findIndex(watchFields.extendInfo, [
            'label',
            '属性名称',
          ]);
          if (itemIndex === -1) {
            append({ label: '属性名称', value: '' });
          } else {
            setFocus(`extendInfo.${itemIndex}.value`);
          }
        }}
      >
        添加
      </Button>
      <Text fontSize="12px" color="grayAlternatives.300" mb="12px">
        支持用户自定义扩展信息
      </Text>
      <Wrap spacing="8px" mb="20px">
        {BASIC_EXTEND_ITEMS.map((key) => {
          const isSelected = find(watchFields.extendInfo, ['label', key]);
          return (
            <Button
              variant="outline"
              key={key}
              borderRadius="4px"
              color={isSelected ? 'primary' : 'gray.400'}
              borderColor={isSelected ? 'primary' : 'gray.200'}
              bg={isSelected ? 'blue.50' : 'white'}
              height="24px"
              p="0 12px"
              fontSize="12px"
              onClick={() => {
                if (!isSelected) {
                  append({ label: key, value: '' });
                }
              }}
            >
              {key}
            </Button>
          );
        })}
      </Wrap>
      <Box overflowY="scroll" h="390px">
        {fields.map((field, index) => {
          return (
            <TextField
              key={field.id}
              label={renderLabel({ field, index })}
              id={field.id}
              registerReturn={register(`extendInfo.${index}.value` as const, {
                required: { value: true, message: 'required' },
              })}
            />
          );
        })}
      </Box>
    </Flex>
  );
}
