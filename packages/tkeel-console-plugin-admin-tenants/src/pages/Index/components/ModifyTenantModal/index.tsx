import BaseTenantModal, {
  FormFields,
  FormValues,
} from '@/tkeel-console-plugin-admin-tenants/components/BaseTenantModal';

type Props = {
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  formFields: FormFields;
  defaultValues: FormValues;
  onClose: () => unknown;
  onConfirm: (formValues: FormValues) => unknown;
};

export default function ModifyTenantModal({
  isOpen,
  isConfirmButtonLoading,
  formFields,
  defaultValues,
  onClose,
  onConfirm,
}: Props) {
  return (
    <BaseTenantModal
      title="编辑"
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      formFields={formFields}
      defaultValues={defaultValues}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
