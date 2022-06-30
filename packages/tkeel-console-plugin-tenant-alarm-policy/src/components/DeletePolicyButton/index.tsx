import { useDisclosure } from '@chakra-ui/react';
import { memo } from 'react';

import { Alert, MoreActionButton } from '@tkeel/console-components';
import { TrashFilledIcon } from '@tkeel/console-icons';
import { RuleStatus } from '@tkeel/console-types';
import { plugin } from '@tkeel/console-utils';

import useDeletePolicyMutation from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/mutations/useDeletePolicyMutation';
import type { Policy } from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/usePolicyListQuery';

import DeletePolicyModal from '../DeletePolicyModal';

type Props = {
  policy: Policy;
  onSuccess: () => unknown;
};

function DeletePolicyButton({ policy, onSuccess }: Props) {
  const { ruleId, ruleName, enable } = policy;
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();

  const toast = plugin.getPortalToast();
  const { mutate, isLoading } = useDeletePolicyMutation({
    onSuccess() {
      onSuccess();
      onModalClose();
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
        onClick={() => {
          if (enable === RuleStatus.Enabled) {
            onAlertOpen();
          } else {
            onModalOpen();
          }
        }}
      />
      {isAlertOpen && (
        <Alert
          isOpen={isAlertOpen}
          iconPosition="left"
          icon="warning"
          hasCancelButton={false}
          title={`如需删除「${ruleName}」，请先停用该策略`}
          onClose={onAlertClose}
          onConfirm={onAlertClose}
        />
      )}
      {isModalOpen && (
        <DeletePolicyModal
          ruleName={ruleName}
          isOpen={isModalOpen}
          isConfirmButtonLoading={isLoading}
          onClose={onModalClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}

export default memo(DeletePolicyButton);
