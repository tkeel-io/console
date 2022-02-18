import { useForm } from 'react-hook-form';
import { FormField, Modal } from '@tkeel/console-components';
import { schemas } from '@tkeel/console-utils';

const { TextField } = FormField;

interface FormValues {
  title: string;
  admin: {
    username: string;
    password?: string;
    nick_name?: string;
  };
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
      title="修改租户空间"
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
      <TextField
        id="remark"
        label="备注"
        error={errors.remark}
        registerReturn={register('remark')}
      />
    </Modal>
  );
}
