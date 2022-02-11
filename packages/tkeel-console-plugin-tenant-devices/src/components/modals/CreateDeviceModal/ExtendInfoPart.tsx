// eslint-disable-next-line import/no-extraneous-dependencies
import { UseFormReturn } from 'react-hook-form';
import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Text,
  Wrap,
} from '@chakra-ui/react';
import { FormField } from '@tkeel/console-components/';
import { PencilFilledIcon, TrashFilledIcon } from '@tkeel/console-icons';
import { has, omit } from 'lodash';

import { DeviceValueType } from './types';

interface Props {
  formHandler: UseFormReturn<DeviceValueType, object>;
  watchFields: DeviceValueType;
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

export default function ExtendInfoPart({ formHandler, watchFields }: Props) {
  const { register, setValue } = formHandler;
  const handleSelectKey = (key: string) => {
    if (!has(watchFields.ext, key)) {
      setValue('ext', { ...watchFields.ext, [key]: '' });
    }
  };
  const deleteExtendItem = (key: string) => {
    setValue('ext', omit(watchFields.ext, key));
  };

  const renderLabel = (key: string) => {
    const fontColor = 'grayAlternatives.300';
    return (
      <Flex justify="space-between">
        <Text color="gray.700">{key}</Text>
        <Center>
          <IconButton
            variant="link"
            size="sm"
            aria-label="edit"
            icon={<PencilFilledIcon color={fontColor} />}
          />
          <IconButton
            lineHeight="24px"
            variant="link"
            size="sm"
            aria-label="delete"
            icon={<TrashFilledIcon color={fontColor} />}
            onClick={() => {
              deleteExtendItem(key);
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
      >
        添加
      </Button>
      <Text fontSize="12px" color="grayAlternatives.300" mb="12px">
        支持用户自定义扩展信息
      </Text>
      <Wrap spacing="8px" mb="20px">
        {BASIC_EXTEND_ITEMS.map((key) => {
          const isSelected = has(watchFields.ext, key);
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
                handleSelectKey(key);
              }}
            >
              {key}
            </Button>
          );
        })}
      </Wrap>
      <Box overflowY="scroll" h="390px">
        {Object.keys({ ...watchFields.ext }).map((key: string) => {
          return (
            <TextField
              key={key}
              label={renderLabel(key)}
              id={key}
              registerReturn={register(`ext.${key}`, {
                required: { value: true, message: 'required' },
              })}
            />
          );
        })}
      </Box>
    </Flex>
  );
}
