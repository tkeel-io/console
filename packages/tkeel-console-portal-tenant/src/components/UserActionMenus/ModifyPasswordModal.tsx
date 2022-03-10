import { useForm } from 'react-hook-form';

import { FormField, Modal, toast } from '@tkeel/console-components';
import { getLocalTokenInfo, schemas } from '@tkeel/console-utils';

import { RequestData } from '@/tkeel-console-portal-tenant/hooks/mutations/useModifyPasswordMutation';

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
        toast('两次输入的密码不一致', { type: 'warning' });
        return;
      }

      const tokenInfo = getLocalTokenInfo();

      onConfirm({
        new_password: newPassword,
        refresh_token: tokenInfo.refresh_token,
      });
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
