import { useDisclosure } from '@chakra-ui/react';
import { memo } from 'react';

import { MoreActionButton } from '@tkeel/console-components';
import { TrashFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useDeletePolicyMutation from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/mutations/useDeletePolicyMutation';
import type { Policy } from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/usePolicyListQuery';

import DeletePolicyModal from '../DeletePolicyModal';

type Props = {
  policy: Policy;
  onSuccess: () => unknown;
};

function DeletePolicyButton({ policy, onSuccess }: Props) {
  const { ruleId, ruleName } = policy;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = plugin.getPortalToast();
  const { mutate, isLoading } = useDeletePolicyMutation({
    onSuccess() {
      onSuccess();
      onClose();
      toast.success('删除告警策略成功');
    },
  });

  const handleConfirm = () => {
    mutate({
      data: {
        ruleId,
        deleted: 1,
      },
    });
  };

  return (
    <>
      <MoreActionButton
        title="删除告警策略"
        icon={<TrashFilledIcon />}
        onClick={onOpen}
      />
      {isOpen && (
        <DeletePolicyModal
          ruleName={ruleName}
          isOpen={isOpen}
          isConfirmButtonLoading={isLoading}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}

export default memo(DeletePolicyButton);
