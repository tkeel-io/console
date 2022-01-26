import { useDisclosure } from '@chakra-ui/react';
import { Alert, CreateButton } from '@tkeel/console-components';

import useCreateUserMutation from '@/tkeel-console-plugin-tenant-users/hooks/mutations/useCreateUserMutation';
import { FormValues } from '@/tkeel-console-plugin-tenant-users/pages/Index/components/BaseUserModal';
import CreateUserModal from '@/tkeel-console-plugin-tenant-users/pages/Index/components/CreateUserModal';

type Props = {
  onSuccess: () => void;
};

export default function CreateUserButton({ onSuccess }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();
  const { isLoading, mutate } = useCreateUserMutation({
    onSuccess() {
      onSuccess();
      onClose();
    },
  });

  const handleConfirm = (formValues: FormValues) => {
    const { roles = [] } = formValues;

    if (roles.length === 0) {
      onAlertOpen();
      return;
    }

    mutate({ data: formValues });
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
      <Alert
        isOpen={isAlertOpen}
        icon="warning"
        title="请选择角色"
        onClose={onAlertClose}
      />
    </>
  );
}
