import BaseNotificationModal, { FormValues } from '../BaseNotificationModal';

interface Props {
  groupName?: string;
  description?: string;
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  onClose: () => void;
  onConfirm: (formValues: FormValues) => void;
}

export default function CreateNetworkModal({
  groupName,
  description,
  isOpen,
  isConfirmButtonLoading,
  onClose,
  onConfirm,
}: Props) {
  return (
    <BaseNotificationModal
      title="通知对象配置"
      defaultValues={{
        groupName: groupName ?? '',
        description: description ?? '',
      }}
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
