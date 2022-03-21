import { Box, Text, Flex, RadioGroup, Stack, Radio } from '@chakra-ui/react';

import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  FormField,
  Modal,
  Select,
  FormControl,
} from '@tkeel/console-components';

import { baseRequestData as FormValues } from '@tkeel/console-request-hooks';

import SelectRadioCard from './components/SelectRadioCard';

const { TextField, TextareaField } = FormField;

const ELEMENT_LABELS = {
  int32: 'int32',
  float: 'float',
  double: 'double',
  string: 'string',
  struct: 'struct',
};

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

const inputType = [
  '最大值',
  '最小值',
  '步长',
  '单位',
  '元素个数',
  '数据最大长度',
];
const selectType = ['元素类型'];

// const boolType = ['布尔值'];

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

export default function CreateTelemetryModal({
  title,
  isOpen,
  // isConfirmButtonLoading,
  formFields,
  defaultValues,
  onClose,
  onConfirm,
}: Props) {
  const [selectOptions, setSelectOptions] = useState<string[]>([]);
  const [selectValue, setSelectValue] = useState<string>();

  const [selectRadioCardItem, setSelectRadioCardItem] = useState<string>();

  const {
    register,
    formState: { errors },
    // trigger,
    getValues,
    setValue,
    reset,
  } = useForm<FormValues>({ defaultValues });

  const selectRadioCardObj = {
    // int
    最大值: register('define.max', {
      required: { value: true, message: 'required' },
    }),
    最小值: register('define.min', {
      required: { value: true, message: 'required' },
    }),
    步长: register('define.step', {
      required: { value: true, message: 'required' },
    }),
    单位: register('define.unit', {
      required: { value: true, message: 'required' },
    }),
    // array
    元素个数: register('define.length', {
      required: { value: true, message: 'required' },
    }),
    元素类型: register('define.elem_type', {
      required: { value: true, message: 'required' },
    }),
  };

  const handleConfirm = async () => {
    const formValues = getValues();

    onConfirm({ ...formValues, type: selectValue as string });
    reset();
    // }
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
        // defaultValue="int"
        placeholder="请选择"
        options={configData}
        style={{ width: '100%', marginBottom: '14px', marginTop: '8px' }}
        onChange={(el) => {
          console.log('el', el);
          setSelectValue(el);
          const config = handleConfigData(configData, el);
          setSelectOptions(config);
        }}
      />

      {selectOptions.length > 0 && (
        <Flex justifyContent="space-between" mb="10px" alignItems="center">
          <Box>
            <SelectRadioCard
              options={selectOptions}
              onChange={(el) => {
                setSelectRadioCardItem(el);
              }}
            ></SelectRadioCard>
          </Box>
          <Box>扩展配置</Box>
        </Flex>
      )}

      {/* select */}
      {selectRadioCardItem && inputType.indexOf(selectRadioCardItem) !== -1 && (
        <TextField
          id={selectRadioCardItem}
          label={selectRadioCardItem}
          isDisabled={formFields?.username?.disabled}
          error={errors.name}
          registerReturn={selectRadioCardObj[selectRadioCardItem]}
        />
      )}

      {selectRadioCardItem && selectType.indexOf(selectRadioCardItem) !== -1 && (
        <FormControl id="elem_type" label="元素类型">
          <RadioGroup
            {...register('define.elem_type', {
              required: { value: true, message: '元素类型' },
            })}
            onChange={(value) => {
              setValue('define.elem_type', value);
            }}
          >
            <Stack direction="row" spacing="12px">
              {Object.entries(ELEMENT_LABELS).map((item) => (
                <Radio
                  key={item[0]}
                  size="sm"
                  colorScheme="primary"
                  value={item[0]}
                >
                  {item[1]}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </FormControl>
      )}

      {/*  */}
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
