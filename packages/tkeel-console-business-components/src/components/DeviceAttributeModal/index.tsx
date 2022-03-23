import { Radio, RadioGroup, Stack, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import {
  FormControl,
  FormField,
  Modal,
  Select,
} from '@tkeel/console-components';

export type ReadWriteType = 'rw' | 'r' | 'w';
export type DeviceAttributeFormFields = {
  name: string;
  id: string;
  type: string;
  define: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default_value: any;
    rw: ReadWriteType;
  };
};
export const RW_LABELS = {
  rw: '读写',
  r: '只读',
  w: '只写',
};

const { TextField } = FormField;

const TypeOptions = [
  { type: 'int', label: '整型' },
  { type: 'bool', label: '布尔型' },
  { type: 'float', label: '单精度浮点型' },
  { type: 'double', label: '双精度浮点型' },
  { type: 'string', label: '字符串' },
  { type: 'array', label: '数组' },
  { type: 'struct', label: '结构体' },
];
const DEFAULT_VALUES = {
  name: '',
  id: '',
  type: '',
  define: {
    default_value: '',
    rw: 'rw' as ReadWriteType,
  },
};

type Props = {
  isOpen: boolean;
  isEdit: boolean;
  isConfirmButtonLoading?: boolean;
  defaultValues?: DeviceAttributeFormFields;
  onClose: () => unknown;
  onSubmit: (values: DeviceAttributeFormFields) => void;
};

function DeviceAttributeModal({
  isOpen,
  isEdit,
  onClose,
  isConfirmButtonLoading,
  defaultValues = DEFAULT_VALUES,
  onSubmit,
}: Props) {
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
    trigger,
    reset,
  } = useForm<DeviceAttributeFormFields>({
    defaultValues,
  });
  const handleConfirm = async () => {
    const result = await trigger();
    if (result) {
      const values = getValues();
      onSubmit(values);
      reset();
    }
  };
  return (
    <Modal
      title={`${isEdit ? '编辑' : '新增'}属性`}
      isOpen={isOpen}
      onClose={onClose}
      isConfirmButtonLoading={isConfirmButtonLoading}
      modalBodyStyle={{ padding: '20px 40px' }}
      width="600px"
      onConfirm={handleConfirm}
      footer={null}
    >
      <TextField
        label="属性名称"
        id="name"
        error={errors.name}
        registerReturn={register('name', {
          required: { value: true, message: '请填写属性名称' },
        })}
      />
      <TextField
        label="属性ID"
        id="id"
        error={errors.id}
        registerReturn={register('id', {
          required: { value: true, message: '请填写属性ID' },
        })}
      />
      <FormControl id="type" label="数据类型">
        <Select
          placeholder="请选择数据类型"
          id="type"
          defaultValue={getValues('type')}
          style={{ width: '100%' }}
          {...register('type', {
            required: { value: true, message: '请选择数据类型' },
          })}
          onChange={(value: string) => {
            setValue('type', value);
          }}
        >
          {TypeOptions.map((val) => {
            return (
              <Select.Option key={val.type} value={val.type}>
                {`${val.type} (${val.label})`}
              </Select.Option>
            );
          })}
        </Select>
        {errors.type && (
          <Text color="red.500" fontSize="sm" mt="8px">
            请选择数据类型
          </Text>
        )}
      </FormControl>
      <TextField
        label="默认值"
        id="id"
        registerReturn={register('define.default_value', {
          required: { value: false, message: '请填写默认值' },
        })}
      />
      <FormControl id="rw" label="读写类型">
        <RadioGroup
          defaultValue="rw"
          {...register('define.rw', {
            required: { value: true, message: '读写类型' },
          })}
          onChange={(value: ReadWriteType) => {
            setValue('define.rw', value);
          }}
        >
          <Stack direction="row" spacing="12px">
            {Object.entries(RW_LABELS).map((item) => (
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
    </Modal>
  );
}

export default DeviceAttributeModal;
