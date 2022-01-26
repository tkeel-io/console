import { useDisclosure } from '@chakra-ui/react';
import { CreateButton } from '@tkeel/console-components';

import useCreateUserMutation from '@/tkeel-console-plugin-tenant-users/hooks/mutations/useCreateUserMutation';
import { FormValues } from '@/tkeel-console-plugin-tenant-users/pages/Index/components/BaseUserModal';
import CreateUserModal from '@/tkeel-console-plugin-tenant-users/pages/Index/components/CreateUserModal';

export default function CreateUserButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isSuccess, isLoading, mutate } = useCreateUserMutation();

  const handleConfirm = (formValues: FormValues) => {
    const { roles = [] } = formValues;
    if (roles.length === 0) {
      return;
    }

    mutate({ data: formValues });

    if (isSuccess) {
      onClose();
    }
  };

  return (
    <>
      <CreateButton onClick={onOpen}>创建用户</CreateButton>
      {isOpen && (
        <CreateUserModal
          isOpen={isOpen}
          isConfirmButtonLoading={isLoading}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
