import { useDisclosure } from '@chakra-ui/react';
import { Alert, CreateButton } from '@tkeel/console-components';

import useCreateUserMutation from '@/tkeel-console-plugin-tenant-roles/hooks/mutations/useCreateUserMutation';
import { FormValues } from '@/tkeel-console-plugin-tenant-roles/pages/Index/components/BaseUserModal';
import CreateUserModal from '@/tkeel-console-plugin-tenant-roles/pages/Index/components/CreateUserModal';
import CreateUserSuccessModal from '@/tkeel-console-plugin-tenant-roles/pages/Index/components/CreateUserSuccessModal';

type Props = {
  onSuccess: () => void;
};

export default function CreateUserButton({ onSuccess }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isWarningAlertOpen,
    onOpen: onWarningAlertOpen,
    onClose: onWarningAlertClose,
  } = useDisclosure();
  const {
    isOpen: isSuccessModalOpen,
    onOpen: onSuccessModalOpen,
    onClose: onSuccessModalClose,
  } = useDisclosure();
  const { isLoading, mutate } = useCreateUserMutation({
    onSuccess() {
      onSuccess();
      onClose();
      onSuccessModalOpen();
    },
  });

  const handleConfirm = (formValues: FormValues) => {
    const { roles = [] } = formValues;

    if (roles.length === 0) {
      onWarningAlertOpen();
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
        isOpen={isWarningAlertOpen}
        icon="warning"
        title="请选择角色"
        onClose={onWarningAlertClose}
      />
      {isSuccessModalOpen && (
        <CreateUserSuccessModal
          isOpen={isSuccessModalOpen}
          onClose={onSuccessModalClose}
        />
      )}
    </>
  );
}
