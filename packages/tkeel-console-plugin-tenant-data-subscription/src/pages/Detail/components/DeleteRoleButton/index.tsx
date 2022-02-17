import { useDisclosure } from '@chakra-ui/react';
import { LinkButton } from '@tkeel/console-components';

import useDeleteRoleMutation from '@/tkeel-console-plugin-tenant-data-subscription/hooks/mutations/useDeleteRoleMutation';
import DeleteRoleModal from '@/tkeel-console-plugin-tenant-data-subscription/pages/Detail/components/DeleteRoleModal';

type Props = {
  data: {
    role: string;
  };
  onSuccess: () => void;
};

export default function DeleteRoleButton({ data, onSuccess }: Props) {
  const { role } = data;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading } = useDeleteRoleMutation({
    role,
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
