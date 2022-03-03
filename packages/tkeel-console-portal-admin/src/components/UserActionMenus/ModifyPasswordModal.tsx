import { useForm } from 'react-hook-form';

import { FormField, Modal, toast } from '@tkeel/console-components';
import { schemas } from '@tkeel/console-utils';

import { RequestData } from '@/tkeel-console-portal-admin/hooks/mutations/useAdminModifyPasswordMutation';

const { TextField } = FormField;

export interface FormValues {
  newPassword: string;
  confirmPassword: string;
}

type Props = {
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  onClose: () => void;
  onConfirm: (requestData: RequestData) => void;
};

export default function ModifyPasswordModal({
  isOpen,
  isConfirmButtonLoading,
  onClose,
  onConfirm,
}: Props) {
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<FormValues>();

  const handleConfirm = async () => {
    const result = await trigger();
    if (result) {
      const formValues = getValues();

      const { newPassword, confirmPassword } = formValues;

      if (newPassword !== confirmPassword) {
        toast({ status: 'warning', title: '两次输入的密码不一致' });
        return;
      }

      onConfirm({ new_password: newPassword });
    }
  };

  return (
    <Modal
      title="修改密码"
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={onClose}
      onConfirm={handleConfirm}
    >
      <TextField
        type="password"
        id="password"
        label="新密码"
        help={schemas.password.help}
        placeholder="请输入"
        error={errors.newPassword}
        registerReturn={register(
          'newPassword',
          schemas.password.registerOptions
        )}
      />
      <TextField
        type="password"
        id="confirmPassword"
        label="再次输入新密码"
        help={schemas.password.help}
        placeholder="请输入"
        error={errors.confirmPassword}
        registerReturn={register(
          'confirmPassword',
          schemas.password.registerOptions
        )}
      />
    </Modal>
  );
}
