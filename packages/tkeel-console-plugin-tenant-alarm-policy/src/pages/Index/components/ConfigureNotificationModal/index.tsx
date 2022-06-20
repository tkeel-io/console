import { useForm } from 'react-hook-form';

import { FormField, Modal } from '@tkeel/console-components';
import { useNotificationQuery } from '@tkeel/console-request-hooks';
import { plugin } from '@tkeel/console-utils';

import useSetNotice from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/mutations/useSetNotice';

interface Props {
  ruleId: number | undefined;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => unknown;
}

const { SelectField } = FormField;

interface FormValues {
  notificationObjects: string;
}

export default function ConfigureNotificationModal({
  ruleId,
  isOpen,
  onClose,
  onSuccess,
}: Props) {
  const { notificationData } = useNotificationQuery({ pageSize: 100_000 });

  const { mutate } = useSetNotice({
    onSuccess() {
      onClose();
      onSuccess();
      const toast = plugin.getPortalToast();
      toast.success('配置通知成功');
    },
  });

  const options = notificationData.map(({ groupName, noticeId }) => ({
    label: groupName,
    value: String(noticeId),
  }));

  const {
    formState: { errors },
    control,
    trigger,
    getValues,
  } = useForm<FormValues>();

  const handleConfirm = async () => {
    const result = await trigger();
    if (result) {
      const { notificationObjects } = getValues();
      if (ruleId) {
        mutate({
          data: {
            ruleId,
            noticeId: notificationObjects,
          },
        });
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title="配置通知"
      onClose={onClose}
      onConfirm={handleConfirm}
    >
      <SelectField<FormValues>
        id="notificationObjects"
        name="notificationObjects"
        label="通知对象"
        placeholder="请选择"
        options={options}
        mode="multiple"
        control={control}
        error={errors.notificationObjects}
        rules={{
          required: { value: true, message: '请输入告警类型' },
        }}
      />
    </Modal>
  );
}
