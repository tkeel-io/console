import BaseRoleModal, {
  FormFields,
  FormValues,
} from '@/tkeel-console-plugin-tenant-data-subscription/pages/Detail/components/BaseRoleModal';

type Props = {
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  formFields: FormFields;
  defaultValues: FormValues;
  onClose: () => unknown;
  onConfirm: (formValues: FormValues) => unknown;
};

export default function CreateRoleModal({
  isOpen,
  isConfirmButtonLoading,
  formFields,
  defaultValues,
  onClose,
  onConfirm,
}: Props) {
  return (
    <BaseRoleModal
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
