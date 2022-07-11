import { merge } from 'lodash';
import { useForm } from 'react-hook-form';

import { FormField, Modal } from '@tkeel/console-components';
import { plugin, schemas } from '@tkeel/console-utils';

import useEmailTestMutation from '@/tkeel-console-plugin-admin-notification-configs/hooks/mutations/useEmailTestMutation';
import { MailFormField } from '@/tkeel-console-plugin-admin-notification-configs/types';

const { TextField } = FormField;

interface TestFormValues {
  to: string;
}
type Props = {
  isOpen: boolean;
  formValues: MailFormField;
  onClose: () => unknown;
};
function EmailTestModal({ isOpen, onClose, formValues }: Props) {
  const {
    trigger,
    getValues,
    register,
    formState: { errors },
  } = useForm<TestFormValues>();
  const toast = plugin.getPortalToast();

  const { isLoading, mutate } = useEmailTestMutation({
    onSuccess() {
      toast.success('发送成功');
      onClose();
    },
  });

  const handleConfirm = async () => {
    const result = await trigger();
    if (result) {
      const values = getValues();
      mutate({ data: merge({}, formValues, values) });
    }
  };

  return (
    <Modal
      title="发送测试邮件"
      isOpen={isOpen}
      onClose={onClose}
      isConfirmButtonLoading={isLoading}
      onConfirm={handleConfirm}
      modalBodyStyle={{ padding: '20px 40px 40px' }}
      width="600px"
      footer={null}
    >
      <TextField
        id="name"
        label="测试接收人邮箱"
        error={errors.to}
        registerReturn={register('to', {
          required: { value: true, message: '请填接收人邮箱' },
          pattern: schemas.emailPattern,
          onBlur: () => trigger('to'),
        })}
      />
    </Modal>
  );
}

export default EmailTestModal;
