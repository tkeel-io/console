import { Box, Text, Flex } from '@chakra-ui/react';

import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormField, Modal, Select } from '@tkeel/console-components';

import { RequestData as FormValues } from '@tkeel/console-request-hooks';

const { TextField, TextareaField } = FormField;

const DataType = [
  {
    value: 'int',
    label: 'int32(整型)',
  },
  {
    value: 'array',
    label: 'array(数组)',
  },
];
export interface FormFields {
  username?: {
    disabled?: boolean;
  };

  nick_name?: {
    disabled?: boolean;
  };
}

type Props = {
  title: ReactNode;
  isOpen: boolean;
  // isConfirmButtonLoading: boolean;
  formFields?: FormFields;
  defaultValues?: FormValues;
  onClose: () => unknown;
  onConfirm: (formValues: FormValues) => unknown;
};

export default function CreateTelemetryModal({
  title,
  isOpen,
  // isConfirmButtonLoading,
  formFields,
  defaultValues,
  onClose,
  onConfirm,
}: Props) {
  const [selectType, setSelectType] = useState<string>('int');
  console.log('selectType', selectType);

  const {
    register,
    formState: { errors },
    trigger,
    getValues,
    reset,
  } = useForm<FormValues>({ defaultValues });

  const handleConfirm = async () => {
    const result = await trigger();
    if (result) {
      const formValues = getValues();
      onConfirm(formValues);
      reset();
    }
  };

  return (
    <Modal
      title={title}
      isOpen={isOpen}
      // isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={() => {
        reset();
        onClose();
      }}
      onConfirm={handleConfirm}
    >
      <TextField
        id="name"
        label="遥测名称"
        isDisabled={formFields?.username?.disabled}
        error={errors.name}
        registerReturn={register('name', {
          required: { value: true, message: 'required' },
        })}
      />
      <TextField
        id="title"
        label="遥测ID"
        isDisabled={formFields?.username?.disabled}
        error={errors.name}
        registerReturn={register('id', {
          required: { value: true, message: 'required' },
        })}
      />

      <Box color="gray.600" fontWeight="500" fontSize="14px">
        数据类型
      </Box>
      <Select
        defaultValue="int"
        options={DataType}
        style={{ width: '100%', marginBottom: '14px', marginTop: '8px' }}
        onChange={(el) => {
          setSelectType(el);
        }}
      />

      {selectType === 'int' && (
        <Flex justifyContent="space-between" mb="10px">
          <Box>123</Box>
          <Box>扩展配置</Box>
        </Flex>
      )}

      <Box>
        <Text color="gray.600" fontSize="14px" mb="4px">
          描述
        </Text>
        <TextareaField
          id="description"
          error={errors.description}
          registerReturn={register('description', {
            required: { value: false, message: '用户名称' },
          })}
        />
      </Box>
    </Modal>
  );
}
