import { useDisclosure } from '@chakra-ui/react';

import { CreateButton } from '@tkeel/console-components';
import { plugin } from '@tkeel/console-utils';

import useCreatePolicyMutation from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/mutations/useCreatePolicyMutation';

import CreateTenantModal from '../CreatePolicyModal';

export default function CreatePolicyButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = plugin.getPortalToast();

  const { mutate } = useCreatePolicyMutation({
    onSuccess() {
      toast.success('添加告警策略成功');
    },
  });

  return (
    <>
      <CreateButton onClick={onOpen}>添加告警策略</CreateButton>
      {isOpen && (
        <CreateTenantModal
          isOpen={isOpen}
          isConfirmButtonLoading={false}
          onClose={onClose}
          onConfirm={(data) => {
            mutate({
              data,
            });
          }}
        />
      )}
    </>
  );
}
