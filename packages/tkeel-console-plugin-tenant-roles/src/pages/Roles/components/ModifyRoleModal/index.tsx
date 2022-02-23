import { RequestData } from '@/tkeel-console-plugin-tenant-roles/hooks/mutations/useModifyRoleMutation';
import BaseRoleModal, {
  FormValues,
} from '@/tkeel-console-plugin-tenant-roles/pages/Roles/components/BaseRoleModal';

type Props = {
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  defaultValues: FormValues;
  onClose: () => unknown;
  onConfirm: (requestData: RequestData) => void;
};

export default function CreateRoleModal({
  isOpen,
  isConfirmButtonLoading,
  defaultValues,
  onClose,
  onConfirm,
}: Props) {
  return (
    <BaseRoleModal
      title="编辑用户"
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      defaultValues={defaultValues}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
