import { RequestData } from '@/tkeel-console-plugin-tenant-roles/hooks/mutations/useCreateRoleMutation';
import BaseRoleModal from '@/tkeel-console-plugin-tenant-roles/pages/Roles/components/BaseRoleModal';

type Props = {
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  onClose: () => unknown;
  onConfirm: (requestData: RequestData) => void;
};

export default function CreateRoleModal({
  isOpen,
  isConfirmButtonLoading,
  onClose,
  onConfirm,
}: Props) {
  return (
    <BaseRoleModal
      title="创建角色"
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
