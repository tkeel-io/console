import { useForm } from 'react-hook-form';

import { FormField, Modal } from '@tkeel/console-components';
import { useNotificationQuery } from '@tkeel/console-request-hooks';
import { plugin } from '@tkeel/console-utils';

import type { RequestData as SetNoticeRequestData } from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/mutations/useSetNotice';
import useSetNotice from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/mutations/useSetNotice';

interface Props {
  ruleId: number | undefined;
  noticeId?: string;
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
  noticeId,
  isOpen,
  onClose,
  onSuccess,
}: Props) {
  const { notificationData, isFetched } = useNotificationQuery({
    pageSize: 100_000,
  });

  const { mutate } = useSetNotice({
    onSuccess(_, variables) {
      onClose();
      onSuccess();
      const toast = plugin.getPortalToast();
      const toastText =
        (variables as { data: SetNoticeRequestData }).data.noticeId === ''
          ? '取消配置通知成功'
          : '配置通知成功';
      toast.success(toastText);
    },
  });

  const options = notificationData.map(({ groupName, noticeId: id }) => ({
    label: groupName,
    value: String(id),
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
      height="240px"
      onClose={onClose}
      onConfirm={handleConfirm}
    >
      {isFetched && (
        <SelectField<FormValues>
          id="notificationObjects"
          name="notificationObjects"
          label="通知对象"
          placeholder="请选择"
          options={options}
          defaultValue={noticeId || undefined}
          mode="multiple"
          control={control}
          error={errors.notificationObjects}
          rules={{
            required: { value: !noticeId, message: '请选择通知对象' },
          }}
        />
      )}
    </Modal>
  );
}
