import { useDisclosure } from '@chakra-ui/react';
import { LinkButton } from '@tkeel/console-components';

import DeleteUserModal from '@/tkeel-console-plugin-admin-tenants/components/DeleteTenantModal';
import useDeleteUserMutation from '@/tkeel-console-plugin-admin-tenants/hooks/mutations/useDeleteTenantMutation';
import { Tenant } from '@/tkeel-console-plugin-admin-tenants/hooks/queries/useTenantsQuery';

type Props = {
  data: Tenant;
  onSuccess: () => void;
};

export default function DeleteTenantButton({ data, onSuccess }: Props) {
  const { tenant_id: tenantId } = data;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading } = useDeleteUserMutation({
    tenantId,
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
