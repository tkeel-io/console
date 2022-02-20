import { useForm } from 'react-hook-form';
import { FormField, Modal } from '@tkeel/console-components';
import { schemas } from '@tkeel/console-utils';

const { TextField, TextareaField } = FormField;

export interface FormValues {
  title: string;
  remark?: string;
}

type Props = {
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  defaultValues: FormValues;
  onClose: () => void;
  onConfirm: (formValues: FormValues) => void;
};

export default function ModifyTenantModal({
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
  } = useForm<FormValues>({
    defaultValues,
  });

  const handleConfirm = async () => {
    const result = await trigger();
    if (result) {
      const formValues = getValues();
      onConfirm(formValues);
    }
  };

  return (
    <Modal
      title="编辑租户空间"
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={onClose}
      onConfirm={handleConfirm}
    >
      <TextField
        id="title"
        label="空间名称"
        error={errors.title}
        registerReturn={register('title', schemas.tenantTitle.registerOptions)}
      />
      <TextareaField
        id="remark"
        label="备注"
        error={errors.remark}
        registerReturn={register('remark')}
        inputStyle={{ height: '80px' }}
      />
    </Modal>
  );
}
