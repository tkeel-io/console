import {
  Box,
  Center,
  Flex,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import { isObject, keyBy, mapValues, merge } from 'lodash';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import {
  FormControl,
  FormField,
  Modal,
  Select,
} from '@tkeel/console-components';
import {
  AddFilledIcon,
  PencilFilledIcon,
  TrashFilledIcon,
} from '@tkeel/console-icons';
import { TelemetryFormFields } from '@tkeel/console-request-hooks';

import SelectRadioCard from './components/SelectRadioCard';

const { TextField, TextareaField } = FormField;

let typeConfig: string[] = [];

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
    value: 'float',
    label: 'float(浮点型)',
    config: ['最大值', '最小值', '步长', '单位'],
  },
  {
    value: 'double',
    label: 'double(双精度浮点型)',
    config: ['最大值', '最小值', '步长', '单位'],
  },
  // {
  //   value: 'array',
  //   label: 'array(数组)',
  //   config: ['元素个数', '元素类型'],
  // },
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
  // {
  //   value: 'data',
  //   label: 'data(时间型)',
  //   config: ['时间格式'],
  // },
];

const KV = new Map([
  ['max', '最大值'],
  ['min', '最小值'],
  ['step', '步长'],
  ['unit', '单位'],
  // ['length', '元素个数'],
  ['elem_type', '元素类型'],
  ['elem_type', '元素类型'],
  ['0', '布尔值'],
  ['1', '布尔值'],
]);

const inputType = new Set([
  '最大值',
  '最小值',
  '步长',
  '单位',
  '元素个数',
  '数据最大长度',
]);
const selectType = new Set(['元素类型']);

// const boolType = ['布尔值'];

type Props = {
  title: ReactNode;
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  defaultValues?: TelemetryFormFields;
  onClose: () => unknown;
  onConfirm: (formValues: TelemetryFormFields) => unknown;
};
function handleConfigData(
  // eslint-disable-next-line  @typescript-eslint/no-shadow
  configData: { value: string; config: string[] }[],
  selectVal: string
): string[] {
  // eslint-disable-next-line  no-restricted-syntax
  for (const items of configData) {
    if (items.value === selectVal) {
      return items.config;
    }
  }
  return [];
}
// eslint-disable-next-line sonarjs/no-duplicate-string
// const EXTEND_INFO = 'define.extendInfo';

export default function DeviceTelemetryModal({
  title,
  isOpen,
  isConfirmButtonLoading,
  defaultValues,
  onClose,
  onConfirm,
}: Props) {
  const [selectOptions, setSelectOptions] = useState<string[]>([]);
  const [selectRadioCardItem, setSelectRadioCardItem] = useState<string>();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const defaultExt = defaultValues?.define?.ext ?? {};
  const extendInfo = isObject(defaultExt)
    ? // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      Object.keys(defaultExt).map((k) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
        return { label: k, value: defaultExt[k] };
      })
    : [];
  const {
    register,
    // unregister,
    formState: { errors },
    trigger,
    getValues,
    setValue,
    reset,
    control,
    setFocus,
  } = useForm<TelemetryFormFields>({
    defaultValues: merge({}, defaultValues, {
      define: { extendInfo },
    }),
  });

  const required = { value: false, message: '请输入' };
  const selectRadioCardObj = {
    // int
    最大值: register('define.max', {
      required,
    }),
    最小值: register('define.min', {
      required,
    }),
    步长: register('define.step', {
      required,
    }),
    单位: register('define.unit', {
      required,
    }),
    // array
    // 元素个数: register('define.length', {
    //   required,
    // }),
    // eslint-disable-next-line  sonarjs/no-duplicate-string
    元素类型: register('define.elem_type', {
      required,
    }),
    '0': register('define.0', {
      required,
    }),
    '1': register('define.1', {
      required,
    }),
  };

  const RESET = () => {
    reset();
    setSelectOptions([]);
    setSelectRadioCardItem('');
  };
  useEffect(() => {
    if (isOpen) {
      RESET();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  const handleConfirm = async () => {
    const result = await trigger();

    if (result) {
      const formValues = getValues();
      const define = formValues?.define;
      const defineCopy = { ...define };
      delete defineCopy.extendInfo;
      const ext = mapValues(keyBy(define?.extendInfo ?? [], 'label'), 'value');
      const formValuesCopy = { ...formValues, define: { ...defineCopy, ext } };
      onConfirm(formValuesCopy);
    }
  };

  const handleDataType = useCallback(
    (el: string) => {
      setValue('type', el);
      const config = handleConfigData(configData, el);
      if (
        !(
          config.length === typeConfig.length &&
          config.every((v, i) => {
            return v === typeConfig[i];
          })
        )
      ) {
        typeConfig = config;
        setSelectRadioCardItem('');
      }
      setSelectOptions(config as []);
    },
    [setValue, setSelectOptions]
  );
  const fieldArrayHandler = useFieldArray({
    control,
    name: 'define.extendInfo',
  });
  const { fields, append, remove } = fieldArrayHandler;

  const handleSelectRadioCardDefaultValue = useCallback(() => {
    if (defaultValues) {
      const arr = Object.keys(defaultValues?.define as object).find((item) => {
        return item !== 'ext';
      });
      return KV.get(arr as string) as string;
    }
    return ' ';
  }, [defaultValues]);

  // eslint-disable-next-line react/no-unstable-nested-components
  function Extend() {
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
            placeholder="请修改扩展属性标题"
            fontSize="14px"
            fontWeight="500"
            pl="2px"
            isReadOnly={labelId !== field.id}
            {...register(`define.extendInfo.${index}.label`, {
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
                setFocus(`define.extendInfo.${index}.label` as const);
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
      <Box overflowY="scroll">
        {fields.map((field, index) => {
          return (
            <TextField
              key={field.id}
              label={renderLabel({ field, index })}
              id={field.id}
              registerReturn={register(
                `define.extendInfo.${index}.value` as const,
                {
                  required: { value: false, message: 'required' },
                }
              )}
            />
          );
        })}
      </Box>
    );
  }

  useEffect(() => {
    if (defaultValues) {
      handleDataType(defaultValues.type);
      setSelectRadioCardItem(handleSelectRadioCardDefaultValue());
    }
  }, [defaultValues, handleDataType, handleSelectRadioCardDefaultValue]);

  return (
    <Modal
      title={title}
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={() => {
        RESET();
        onClose();
      }}
      onConfirm={handleConfirm}
    >
      <TextField
        id="name"
        label="遥测名称"
        error={errors.name}
        registerReturn={register('name', {
          required: { value: true, message: 'required' },
        })}
      />
      <TextField
        id="id"
        label="遥测ID"
        error={errors.id}
        registerReturn={register('id', {
          required: { value: true, message: 'required' },
        })}
      />
      <Box color="gray.600" fontWeight="500" fontSize="14px">
        数据类型
      </Box>
      <Select
        defaultValue={getValues('type')}
        placeholder="请选择"
        options={configData}
        {...register('type', {
          required: { value: true, message: '请选择数据类型' },
        })}
        onChange={handleDataType}
        style={{ width: '100%', marginBottom: '14px', marginTop: '8px' }}
      />
      <Flex justifyContent="space-between" mb="10px" alignItems="center">
        <Box>
          <SelectRadioCard
            defaultValue={handleSelectRadioCardDefaultValue()}
            options={selectOptions}
            onChange={(el) => {
              setSelectRadioCardItem(el);
            }}
          />
        </Box>
        <Flex
          width="86px"
          alignItems="center"
          justifyContent="space-between"
          color="grayAlternatives.300"
          cursor="pointer"
          onClick={() => {
            append({
              label: `请修改扩展属性标题`,
              value: '',
            });
          }}
        >
          <AddFilledIcon color="grayAlternatives.300" /> <Box>扩展配置</Box>
        </Flex>
      </Flex>
      {selectRadioCardItem && (
        <>
          {inputType.has(selectRadioCardItem) && (
            <TextField
              id={selectRadioCardItem}
              label={selectRadioCardItem}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              error={errors.name}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              registerReturn={selectRadioCardObj[selectRadioCardItem]}
            />
          )}
          {selectType.has(selectRadioCardItem) && (
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

          {selectRadioCardItem === '布尔值' && (
            <>
              <TextField
                id="0"
                label="0"
                registerReturn={selectRadioCardObj['0']}
              />
              <TextField
                id="1"
                label="1"
                registerReturn={selectRadioCardObj['1']}
              />
            </>
          )}
        </>
      )}
      <Extend />
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
