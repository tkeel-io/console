import BaseDeviceModal, {
  FormFields,
  FormValues,
} from '@/tkeel-console-plugin-tenant-data-subscription/pages/Detail/components/BaseDeviceModal';

type Props = {
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  formFields: FormFields;
  defaultValues: FormValues;
  onClose: () => unknown;
  onConfirm: (formValues: FormValues) => unknown;
};

export default function CreateDeviceModal({
  isOpen,
  isConfirmButtonLoading,
  formFields,
  defaultValues,
  onClose,
  onConfirm,
}: Props) {
  return (
    <BaseDeviceModal
      title="编辑用户"
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      formFields={formFields}
      defaultValues={defaultValues}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
