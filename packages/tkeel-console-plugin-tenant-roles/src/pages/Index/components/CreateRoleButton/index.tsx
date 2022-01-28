import { useDisclosure } from '@chakra-ui/react';
import { Alert, CreateButton } from '@tkeel/console-components';

import useCreateRoleMutation from '@/tkeel-console-plugin-tenant-roles/hooks/mutations/useCreateRoleMutation';
import { FormValues } from '@/tkeel-console-plugin-tenant-roles/pages/Index/components/BaseRoleModal';
import CreateRoleModal from '@/tkeel-console-plugin-tenant-roles/pages/Index/components/CreateRoleModal';

type Props = {
  onSuccess: () => void;
};

export default function CreateRoleButton({ onSuccess }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isWarningAlertOpen,
    onOpen: onWarningAlertOpen,
    onClose: onWarningAlertClose,
  } = useDisclosure();
  const { isLoading, mutate } = useCreateRoleMutation({
    onSuccess() {
      onSuccess();
      onClose();
    },
  });

  const handleConfirm = (formValues: FormValues) => {
    const { plugins = [] } = formValues;

    if (plugins.length === 0) {
      onWarningAlertOpen();
      return;
    }

    mutate({ data: formValues });
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
      <Alert
        isOpen={isWarningAlertOpen}
        icon="warning"
        title="请选择角色权限"
        onClose={onWarningAlertClose}
      />
    </>
  );
}
