import { useDisclosure } from '@chakra-ui/react';

import { LinkButton } from '@tkeel/console-components';

import useModifyRoleMutation, {
  RequestData,
} from '@/tkeel-console-plugin-tenant-roles/hooks/mutations/useModifyRoleMutation';
import ModifyRoleModal from '@/tkeel-console-plugin-tenant-roles/pages/Roles/components/ModifyRoleModal';

type Props = {
  data: {
    roleId: string;
    roleName: string;
    desc?: string;
    permissionPaths?: string[];
  };
  onSuccess: () => void;
};

export default function ModifyRoleButton({ data, onSuccess }: Props) {
  const { roleId, roleName, desc, permissionPaths = [] } = data;
  const defaultValues = { roleName, desc, permissionPaths };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading } = useModifyRoleMutation({
    roleId,
    onSuccess() {
      onSuccess();
      onClose();
    },
  });

  const handleConfirm = (requestData: RequestData) => {
    mutate({ data: requestData });
  };

  return (
    <>
      <LinkButton onClick={onOpen}>编辑</LinkButton>
      {isOpen && (
        <ModifyRoleModal
          isOpen={isOpen}
          isConfirmButtonLoading={isLoading}
          defaultValues={defaultValues}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
