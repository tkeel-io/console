import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { FormControl, FormField, Modal } from '@tkeel/console-components';

const { TextField, TextareaField } = FormField;
const MODE_TYPE = {
  sync: '同步',
  async: '异步',
};
export enum CommandModeType {
  sync = 'sync',
  async = 'async',
}
export type DeviceCommandFormField = {
  name: string;
  id: string;
  description: string;
  mode: CommandModeType;
};

const DEFAULT_VALUE = {
  name: '',
  id: '',
  description: '',
  mode: CommandModeType.sync,
};

type Props = {
  onClose: () => void;
  isOpen: boolean;
  isEdit?: boolean;
  onSubmit: (values: DeviceCommandFormField) => void;
  isConfirmButtonLoading: boolean;
};

export default function DeviceCommandModal({
  isOpen,
  onClose,
  isEdit = false,
  onSubmit,
  isConfirmButtonLoading,
}: Props) {
  const {
    register,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<DeviceCommandFormField>({ defaultValues: DEFAULT_VALUE });
  const handleConfirm = async () => {
    const result = await trigger();
    if (result) {
      const values = getValues();
      onSubmit(values);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${isEdit ? '编辑' : '新增'}命令`}
      onConfirm={handleConfirm}
      isConfirmButtonLoading={isConfirmButtonLoading}
    >
      <TextField
        label="命令名称"
        id="name"
        error={errors.name}
        registerReturn={register('name', {
          required: { value: true, message: '请填写命令名称' },
        })}
      />
      <TextField
        label="命令ID"
        id="id"
        error={errors.id}
        registerReturn={register('id', {
          required: { value: true, message: '请填写命令ID' },
        })}
      />
      <FormControl id="mode" label="调用方式">
        <RadioGroup
          defaultValue={CommandModeType.sync}
          onChange={(value: CommandModeType) => {
            setValue('mode', value);
          }}
        >
          <Stack direction="row" spacing="12px">
            {Object.entries(MODE_TYPE).map((item) => (
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
      <TextareaField
        label="描述"
        id="description"
        registerReturn={register('description')}
      />
    </Modal>
  );
}
