import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { FormField, Modal } from '@tkeel/console-components';

import DeviceDataType from '../../../DeviceDataType';
import { CommandParamFormField, ParamType } from './types';

interface Props {
  isEdit?: boolean;
  type: ParamType;
  isOpen: boolean;
  defaultValues?: CommandParamFormField;
  onClose: () => void;
  handleConfirm: (formValues: CommandParamFormField) => void;
}

const { TextField } = FormField;
export default function CommandParamModal({
  handleConfirm,
  isOpen,
  onClose,
  type,
  isEdit = false,
  defaultValues,
}: Props) {
  const formHandler = useForm<CommandParamFormField>();
  const {
    register,
    control,
    getValues,
    trigger,
    formState: { errors },
    setValue,
    reset,
  } = formHandler;
  const fieldArrayHandler = useFieldArray({
    control,
    name: `fields`,
  });
  const onConfirm = async () => {
    if (isEdit) {
      setValue('id', defaultValues?.id ?? '');
    }
    const result = await trigger();
    if (result) {
      const formValues = getValues();
      handleConfirm(formValues);
      onClose();
    }
  };
  useEffect(() => {
    if (isOpen) {
      if (defaultValues && isEdit) {
        reset(defaultValues);
      } else {
        reset();
      }
    }
  }, [defaultValues, isOpen, reset, isEdit]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${isEdit ? '编辑' : '增加'}${
        type === ParamType.INPUT ? '输入' : '输出'
      }参数`}
      width="480px"
      onConfirm={onConfirm}
    >
      <TextField
        label="参数名称"
        id="name"
        error={errors.name}
        registerReturn={register('name', {
          required: { value: true, message: '请填写参数名称' },
        })}
      />
      <TextField
        label="参数ID"
        id="id"
        isDisabled={isEdit}
        error={errors.id}
        registerReturn={register('id', {
          required: { value: true, message: '请填写参数ID' },
        })}
      />
      <DeviceDataType
        formHandler={formHandler}
        fieldArrayHandler={fieldArrayHandler}
        dataTypeConfig={['int', 'float', 'double', 'bool', 'string', 'struct']}
      />
    </Modal>
  );
}
