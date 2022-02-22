import { useIsMutating } from 'react-query';
import { useDisclosure } from '@chakra-ui/react';
import { CreateButton, toast } from '@tkeel/console-components';
import { getLocalUserInfo } from '@tkeel/console-utils';

import useCreateRoleMutation from '@/tkeel-console-plugin-tenant-data-subscription/hooks/mutations/useCreateRoleMutation';
import useSetRolePermissionsMutation from '@/tkeel-console-plugin-tenant-data-subscription/hooks/mutations/useSetRolePermissionsMutation';
import { FormValues } from '@/tkeel-console-plugin-tenant-data-subscription/pages/Detail/components/BaseDeviceModal';
import CreateDeviceModal from '@/tkeel-console-plugin-tenant-data-subscription/pages/Detail/components/CreateDeviceModal';

type Props = {
  onSuccess: () => void;
};

export default function CreateDeviceButton({ onSuccess }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMutating = useIsMutating();
  const isLoading = isMutating > 0;

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
      toast({ status: 'warning', title: '请选择角色权限' });
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
      <CreateButton onClick={onOpen}>添加设备</CreateButton>
      {isOpen && (
        <CreateDeviceModal
          isOpen={isOpen}
          isConfirmButtonLoading={isLoading}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
