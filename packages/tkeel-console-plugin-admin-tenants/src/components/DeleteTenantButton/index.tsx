import { useDisclosure } from '@chakra-ui/react';

import { LinkButton, MoreActionButton } from '@tkeel/console-components';
import { TrashFilledIcon } from '@tkeel/console-icons';

import DeleteUserModal from '@/tkeel-console-plugin-admin-tenants/components/DeleteTenantModal';
import useDeleteUserMutation from '@/tkeel-console-plugin-admin-tenants/hooks/mutations/useDeleteTenantMutation';

type Props = {
  variant: 'link' | 'menu';
  data: {
    tenant_id: string;
    title: string;
  };
  onSuccess: () => void;
};

export default function DeleteTenantButton({
  variant,
  data,
  onSuccess,
}: Props) {
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
      {variant === 'link' && <LinkButton onClick={onOpen}>删除</LinkButton>}
      {variant === 'menu' && (
        <MoreActionButton
          icon={<TrashFilledIcon />}
          title="删除租户空间"
          onClick={onOpen}
        />
      )}
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
