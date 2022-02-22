import { useDisclosure } from '@chakra-ui/react';
import { LinkButton } from '@tkeel/console-components';
import { getLocalUserInfo } from '@tkeel/console-utils';

import useSetRolePermissionsMutation from '@/tkeel-console-plugin-tenant-roles/hooks/mutations/useSetRolePermissionsMutation';
import { FormValues } from '@/tkeel-console-plugin-tenant-roles/pages/Roles/components/BaseRoleModal';
import ModifyRoleModal from '@/tkeel-console-plugin-tenant-roles/pages/Roles/components/ModifyRoleModal';

type Props = {
  data: {
    roleId: string;
    roleName: string;
    permissionList: string[];
  };
  onSuccess: () => void;
};

export default function ModifyRoleButton({ data, onSuccess }: Props) {
  const { roleId, roleName, permissionList } = data;
  const defaultValues = { roleName, permissionList };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading } = useSetRolePermissionsMutation({
    onSuccess() {
      onSuccess();
      onClose();
    },
  });

  const handleConfirm = (formValues: FormValues) => {
    const { tenant_id: tenantId } = getLocalUserInfo();

    mutate({
      url: `/security/v1/rbac/tenant/${tenantId}/roles/${roleId}/permissions`,
      data: {
        name: formValues.roleName,
        // permission_list: formValues.permissionList,
      },
    });
  };

  return (
    <>
      <LinkButton onClick={onOpen}>编辑</LinkButton>
      {isOpen && (
        <ModifyRoleModal
          isOpen={isOpen}
          isConfirmButtonLoading={isLoading}
          // @ts-ignore
          defaultValues={defaultValues}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
