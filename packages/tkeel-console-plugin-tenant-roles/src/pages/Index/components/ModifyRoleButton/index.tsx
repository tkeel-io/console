import { useDisclosure } from '@chakra-ui/react';
import { LinkButton } from '@tkeel/console-components';
import { getLocalUserInfo } from '@tkeel/console-utils';

import useSetRolePermissionsMutation from '@/tkeel-console-plugin-tenant-roles/hooks/mutations/useSetRolePermissionsMutation';
import { FormValues } from '@/tkeel-console-plugin-tenant-roles/pages/Index/components/BaseRoleModal';
import ModifyRoleModal from '@/tkeel-console-plugin-tenant-roles/pages/Index/components/ModifyRoleModal';

type Props = {
  data: {
    role: string;
    plugins: string[];
  };
  onSuccess: () => void;
};

const formFields = {
  role: {
    disabled: true,
  },
};

export default function ModifyRoleButton({ data, onSuccess }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading } = useSetRolePermissionsMutation({
    onSuccess() {
      onSuccess();
      onClose();
    },
  });

  const handleConfirm = (formValues: FormValues) => {
    const { tenant_id: tenantId } = getLocalUserInfo();
    const { role, plugins = [] } = formValues;
    mutate({
      url: `/security/v1/rbac/tenant/${tenantId}/roles/${role}/permissions`,
      data: {
        permissions: plugins.map((plugin) => ({
          permission_action: '',
          permission_object: plugin,
        })),
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
          formFields={formFields}
          defaultValues={data}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
