import { useDisclosure } from '@chakra-ui/react';
import { CreateButton } from '@tkeel/console-components';

import useCreateRoleMutation, {
  RequestData,
} from '@/tkeel-console-plugin-tenant-roles/hooks/mutations/useCreateRoleMutation';
import CreateRoleModal from '@/tkeel-console-plugin-tenant-roles/pages/Roles/components/CreateRoleModal';

type Props = {
  onSuccess: () => void;
};

export default function CreateRoleButton({ onSuccess }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, mutate } = useCreateRoleMutation({
    onSuccess() {
      onSuccess();
      onClose();
    },
  });

  const handleConfirm = async (requestData: RequestData) => {
    mutate({ data: requestData });
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
    </>
  );
}
