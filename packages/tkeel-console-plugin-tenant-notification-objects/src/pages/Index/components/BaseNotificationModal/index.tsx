import { useForm } from 'react-hook-form';

import { FormField, Modal } from '@tkeel/console-components';

const { TextField, TextareaField } = FormField;

export interface FormValues {
  groupName: string;
  description: string;
}

interface Props {
  title: string;
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  defaultValues?: FormValues;
  onClose: () => void;
  onConfirm: (formValues: FormValues) => void;
}

export default function BaseNotificationModal({
  title,
  isOpen,
  isConfirmButtonLoading,
  defaultValues,
  onClose,
  onConfirm,
}: Props) {
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
    reset,
  } = useForm<FormValues>({
    defaultValues,
  });

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
      height="366px"
      title={title}
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={() => {
        reset();
        onClose();
      }}
      onConfirm={handleConfirm}
    >
      <TextField
        label="对象组名称"
        id="groupName"
        error={errors.groupName}
        registerReturn={register('groupName', {
          required: { value: true, message: '对象组名称为空' },
        })}
      />
      <TextareaField
        label="描述"
        id="description"
        error={errors.description}
        registerReturn={register('description', {
          required: { value: true, message: '描述为空' },
        })}
      />
    </Modal>
  );
}
