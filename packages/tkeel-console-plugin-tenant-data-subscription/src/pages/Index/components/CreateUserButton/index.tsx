import { useDisclosure } from '@chakra-ui/react';
import { CreateButton } from '@tkeel/console-components';

import useCreateUserMutation from '@/tkeel-console-plugin-tenant-data-subscription/hooks/mutations/useCreateUserMutation';
import { FormValues } from '@/tkeel-console-plugin-tenant-data-subscription/pages/Index/components/BaseUserModal';
import CreateUserModal from '@/tkeel-console-plugin-tenant-data-subscription/pages/Index/components/CreateUserModal';
import SetPasswordModal from '@/tkeel-console-plugin-tenant-data-subscription/pages/Index/components/SetPasswordModal';

type Props = {
  onSuccess: () => void;
};
const handleConfirm = (formValues: FormValues) => {
  if (formValues) {
    return null;
  }
  return null;
};

export default function CreateUserButton({ onSuccess }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isSuccessModalOpen,
    onOpen: onSuccessModalOpen,
    onClose: onSuccessModalClose,
  } = useDisclosure();
  const { isLoading, data } = useCreateUserMutation({
    onSuccess() {
      onSuccess();
      onClose();
      onSuccessModalOpen();
    },
  });
  const setPasswordModalData = {
    tenant_id: data?.tenant_id ?? '',
    user_id: data?.user_id ?? '',
    username: data?.username ?? '',
  };

  return (
    <>
      <CreateButton onClick={onOpen}>创建订阅</CreateButton>
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
          data={setPasswordModalData}
          onClose={onSuccessModalClose}
        />
      )}
    </>
  );
}
