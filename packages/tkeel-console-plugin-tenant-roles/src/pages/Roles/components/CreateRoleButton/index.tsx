import { useDisclosure } from '@chakra-ui/react';
import { CreateButton } from '@tkeel/console-components';

import useCreateRoleMutation from '@/tkeel-console-plugin-tenant-roles/hooks/mutations/useCreateRoleMutation';
import { FormValues } from '@/tkeel-console-plugin-tenant-roles/pages/Roles/components/BaseRoleModal';
import CreateRoleModal from '@/tkeel-console-plugin-tenant-roles/pages/Roles/components/CreateRoleModal';

type Props = {
  onSuccess: () => void;
};

export default function CreateRoleButton({ onSuccess }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, mutate } = useCreateRoleMutation({
    onSuccess() {
      onSuccess();
      onClose();
    },
  });

  const handleConfirm = async (formValues: FormValues) => {
    const { roleName, permissionList = [] } = formValues;
    mutate({ data: { name: roleName, permission_list: permissionList } });
  };

  return (
    <>
      <CreateButton onClick={onOpen}>创建角色</CreateButton>
      {isOpen && (
        <CreateRoleModal
          isOpen={isOpen}
          isConfirmButtonLoading={isLoading}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
