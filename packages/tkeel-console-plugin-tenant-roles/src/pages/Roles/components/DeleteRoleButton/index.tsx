import { useDisclosure } from '@chakra-ui/react';

import { LinkButton } from '@tkeel/console-components';

import useDeleteRoleMutation from '@/tkeel-console-plugin-tenant-roles/hooks/mutations/useDeleteRoleMutation';
import DeleteRoleModal from '@/tkeel-console-plugin-tenant-roles/pages/Roles/components/DeleteRoleModal';

type Props = {
  data: {
    roleId: string;
    roleName: string;
  };
  onSuccess: () => void;
};

export default function DeleteRoleButton({ data, onSuccess }: Props) {
  const { roleId, roleName } = data;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading } = useDeleteRoleMutation({
    roleId,
    onSuccess() {
      onSuccess();
      onClose();
    },
  });

  const handleConfirm = () => {
    mutate({});
  };

  return (
    <>
      <LinkButton onClick={onOpen}>删除</LinkButton>
      {isOpen && (
        <DeleteRoleModal
          data={{ roleName }}
          isOpen={isOpen}
          isConfirmButtonLoading={isLoading}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
