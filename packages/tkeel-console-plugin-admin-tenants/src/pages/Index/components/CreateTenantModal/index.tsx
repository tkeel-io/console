import BaseTenantModal, {
  FormFields,
  FormValues,
} from '@/tkeel-console-plugin-admin-tenants/pages/Index/components/BaseTenantModal';

type Props = {
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  formFields: FormFields;
  onClose: () => unknown;
  onConfirm: (formValues: FormValues) => unknown;
};

export default function CreateTenantModal({
  isOpen,
  isConfirmButtonLoading,
  formFields,
  onClose,
  onConfirm,
}: Props) {
  return (
    <BaseTenantModal
      title="创建"
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      formFields={formFields}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
