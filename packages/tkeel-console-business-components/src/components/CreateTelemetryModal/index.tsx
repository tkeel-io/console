import { Box, Text, Flex } from '@chakra-ui/react';

import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormField, Modal, Select } from '@tkeel/console-components';

import { RequestData as FormValues } from '@tkeel/console-request-hooks';

import SelectRadioCard from './components/SelectRadioCard';

const { TextField, TextareaField } = FormField;

function handleConfigData(
  configData: { value: string; config: string[] }[],
  selectVal: string
): string[] {
  for (const items of configData) {
    if (items.value === selectVal) {
      return items.config;
    }
  }
  return [];
}

// const DataType = [
//   {
//     value: 'int',
//   },
//   {
//     value: 'array',
//   },
// ];

const configData = [
  {
    value: 'int',
    label: 'int32(整型)',
    config: ['最大值', '最小值', '步长', '单位'],
  },
  {
    value: 'array',
    label: 'array(数组)',
    config: ['元素个数', '元素类型'],
  },
  {
    value: 'bool',
    label: 'bool(布尔)',
    config: ['布尔值'],
  },
  {
    value: 'string',
    label: 'string(字符串)',
    config: ['数据最大长度'],
  },
  {
    value: 'data',
    label: 'data(时间型)',
    config: ['时间格式'],
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
  const [selectOptions, setSelectOptions] = useState<string[]>([
    '最大值',
    '最小值',
    '步长',
    '单位',
  ]);

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
        options={configData}
        style={{ width: '100%', marginBottom: '14px', marginTop: '8px' }}
        onChange={(el) => {
          console.log('el', el);

          const config = handleConfigData(configData, el);
          setSelectType(el);
          setSelectOptions(config);
        }}
      />

      <Flex justifyContent="space-between" mb="10px" alignItems="center">
        <Box>
          <SelectRadioCard
            options={selectOptions}
            onChange={(el) => {
              console.log('123', el);
            }}
          ></SelectRadioCard>
        </Box>
        <Box>扩展配置</Box>
      </Flex>

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
