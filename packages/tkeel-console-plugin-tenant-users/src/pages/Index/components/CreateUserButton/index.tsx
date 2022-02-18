import { useDisclosure } from '@chakra-ui/react';
import { SetPasswordModal } from '@tkeel/console-business-components';
import { CreateButton, toast } from '@tkeel/console-components';

import useCreateUserMutation from '@/tkeel-console-plugin-tenant-users/hooks/mutations/useCreateUserMutation';
import { FormValues } from '@/tkeel-console-plugin-tenant-users/pages/Index/components/BaseUserModal';
import CreateUserModal from '@/tkeel-console-plugin-tenant-users/pages/Index/components/CreateUserModal';

type Props = {
  onSuccess: () => void;
};

export default function CreateUserButton({ onSuccess }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isSuccessModalOpen,
    onOpen: onSuccessModalOpen,
    onClose: onSuccessModalClose,
  } = useDisclosure();
  const { isLoading, mutate, data } = useCreateUserMutation({
    onSuccess() {
      onSuccess();
      onClose();
      onSuccessModalOpen();
    },
  });
  const url = `${window.location.origin}/auth/set-password`;
  const setPasswordModalData = {
    reset_key: data?.reset_key ?? '',
  };

  const handleConfirm = (formValues: FormValues) => {
    const { roles = [] } = formValues;

    if (roles.length === 0) {
      toast({ status: 'warning', title: '请选择角色' });
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
      {isSuccessModalOpen && (
        <SetPasswordModal
          isOpen={isSuccessModalOpen}
          title="创建成功"
          url={url}
          data={setPasswordModalData}
          onClose={onSuccessModalClose}
        />
      )}
    </>
  );
}
