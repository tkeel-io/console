import { useDisclosure } from '@chakra-ui/react';

import { MoreActionButton } from '@tkeel/console-components';
import { TrashFilledIcon } from '@tkeel/console-icons';

import type { Policy } from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/usePolicyListQuery';

import DeletePolicyModal from '../DeletePolicyModal';

type Props = {
  policy: Policy;
  onSuccess: () => void;
};

const handleConfirm = () => {
  // mutate({})
};

export default function DeletePolicyButton({ policy, onSuccess }: Props) {
  const { ruleId, ruleName } = policy;
  // eslint-disable-next-line no-console
  console.log('DeletePolicyButton ~ ruleId', ruleId);
  // eslint-disable-next-line no-console
  console.log('DeletePolicyButton ~ onSuccess', onSuccess);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { mutate, isLoading } = useDeletePolicyMutation({
  //   ruleId,
  //   onSuccess() {
  //     onSuccess();
  //     onClose();
  //   },
  // });

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
          isConfirmButtonLoading={false}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
