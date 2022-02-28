import { useDisclosure } from '@chakra-ui/react';

import { LinkButton } from '@tkeel/console-components';

import useDeleteUserMutation from '@/tkeel-console-plugin-tenant-users/hooks/mutations/useDeleteUserMutation';
import { User } from '@/tkeel-console-plugin-tenant-users/hooks/queries/useUsersQuery';
import DeleteUserModal from '@/tkeel-console-plugin-tenant-users/pages/Users/components/DeleteUserModal';

type Props = {
  data: User;
  onSuccess: () => void;
};

export default function DeleteUserButton({ data, onSuccess }: Props) {
  const { tenant_id: tenantId, user_id: userId } = data;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading } = useDeleteUserMutation({
    tenantId,
    userId,
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
        <DeleteUserModal
          data={data}
          isOpen={isOpen}
          isConfirmButtonLoading={isLoading}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
