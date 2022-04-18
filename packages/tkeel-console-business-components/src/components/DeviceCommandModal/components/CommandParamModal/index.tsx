import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { FormField, Modal } from '@tkeel/console-components';

import DataType from './DataType';
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
    reset,
  } = formHandler;
  const fieldArrayHandler = useFieldArray({
    control,
    name: `fields`,
  });
  const onConfirm = async () => {
    const result = await trigger();
    if (result) {
      const formValues = getValues();
      handleConfirm(formValues);
      onClose();
    }
  };
  useEffect(() => {
    if (isOpen) {
      if (defaultValues) {
        reset(defaultValues);
      }
      reset();
    }
  }, [defaultValues, isOpen, reset]);

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
      <DataType
        formHandler={formHandler}
        fieldArrayHandler={fieldArrayHandler}
      />
    </Modal>
  );
}
