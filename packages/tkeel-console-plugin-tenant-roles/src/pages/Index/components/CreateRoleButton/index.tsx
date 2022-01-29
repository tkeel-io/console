import { useIsMutating } from 'react-query';
import { useDisclosure } from '@chakra-ui/react';
import { Alert, CreateButton } from '@tkeel/console-components';
import { getLocalUserInfo } from '@tkeel/console-utils';

import useCreateRoleMutation from '@/tkeel-console-plugin-tenant-roles/hooks/mutations/useCreateRoleMutation';
import useSetRolePermissionsMutation from '@/tkeel-console-plugin-tenant-roles/hooks/mutations/useSetRolePermissionsMutation';
import { FormValues } from '@/tkeel-console-plugin-tenant-roles/pages/Index/components/BaseRoleModal';
import CreateRoleModal from '@/tkeel-console-plugin-tenant-roles/pages/Index/components/CreateRoleModal';

type Props = {
  onSuccess: () => void;
};

export default function CreateRoleButton({ onSuccess }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMutating = useIsMutating();
  const isLoading = isMutating > 0;

  const {
    isOpen: isWarningAlertOpen,
    onOpen: onWarningAlertOpen,
    onClose: onWarningAlertClose,
  } = useDisclosure();

  const { mutateAsync: mutateRoleAsync } = useCreateRoleMutation();
  const { mutate: mutatePermissions } = useSetRolePermissionsMutation({
    onSuccess() {
      onSuccess();
      onClose();
    },
  });

  const handleConfirm = async (formValues: FormValues) => {
    const { role, plugins = [] } = formValues;

    if (plugins.length === 0) {
      onWarningAlertOpen();
      return;
    }

    try {
      await mutateRoleAsync({ data: { role } });
      const { tenant_id: tenantId } = getLocalUserInfo();
      mutatePermissions({
        url: `/security/v1/rbac/tenant/${tenantId}/roles/${role}/permissions`,
        data: {
          permissions: plugins.map((plugin) => ({
            permission_action: '',
            permission_object: plugin,
          })),
        },
      });
    } catch {
      //
    }
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
