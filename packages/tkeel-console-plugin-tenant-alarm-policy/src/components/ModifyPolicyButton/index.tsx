import { useDisclosure } from '@chakra-ui/react';

import { MoreActionButton } from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';

import useCreatePolicyMutation from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/mutations/useCreatePolicyMutation';
import type { Policy } from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/usePolicyListQuery';
import useRuleDescQuery from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/useRuleDescQuery';

import ModifyPolicyModal from '../ModifyPolicyModal';

interface Props {
  policy: Policy;
  onSuccess: () => unknown;
}

export default function ModifyPolicyButton({ policy, onSuccess }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { ruleDescList } = useRuleDescQuery({
    ruleId: policy.ruleId,
    enabled: isOpen,
  });

  const { mutate, isLoading } = useCreatePolicyMutation({
    onSuccess() {
      onClose();
      onSuccess();
    },
  });

  return (
    <>
      <MoreActionButton
        icon={<PencilFilledIcon size="12px" color="grayAlternatives.300" />}
        title="修改告警策略"
        onClick={() => {
          onOpen();
        }}
      />
      {isOpen && (
        <ModifyPolicyModal
          policy={policy}
          ruleDescList={ruleDescList}
          isOpen={isOpen}
          isConfirmButtonLoading={isLoading}
          onClose={onClose}
          onConfirm={(data) => {
            mutate({ data });
          }}
        />
      )}
    </>
  );
}
