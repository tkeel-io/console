import { useForm } from 'react-hook-form';

import { FormField, Modal } from '@tkeel/console-components';

const { TextField } = FormField;

export interface FormValues {
  networkName: string;
}

interface Props {
  title: string;
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  defaultValues?: FormValues;
  onClose: () => unknown;
  onConfirm: (formValues: FormValues) => unknown;
}

export default function BaseNetworkModal({
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
        label="代理网关名称"
        id="networkName"
        error={errors.networkName}
        registerReturn={register('networkName', {
          required: { value: true, message: '代理网关名称为空' },
        })}
      />
    </Modal>
  );
}
