import BaseUserModal, {
  FormFields,
  FormValues,
} from '@/tkeel-console-plugin-tenant-users/pages/Index/components/BaseUserModal';

type Props = {
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  formFields: FormFields;
  defaultValues: FormValues;
  onClose: () => unknown;
  onConfirm: (formValues: FormValues) => unknown;
};

export default function ModifyUserModal({
  isOpen,
  isConfirmButtonLoading,
  formFields,
  defaultValues,
  onClose,
  onConfirm,
}: Props) {
  return (
    <BaseUserModal
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
