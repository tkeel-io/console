import { useDisclosure } from '@chakra-ui/react';

import { MoreActionButton } from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';

import type { Policy } from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/usePolicyListQuery';
import useRuleDescQuery from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/useRuleDescQuery';

import ModifyPolicyModal from '../ModifyPolicyModal';

const handleConfirm = () => {};

interface Props {
  policy: Policy;
}

export default function ModifyPolicyButton({ policy }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { ruleDescList } = useRuleDescQuery({
    ruleId: policy.ruleId,
    enabled: isOpen,
  });
  // eslint-disable-next-line no-console
  console.log('ModifyPolicyButton ~ ruleDescList', ruleDescList);

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
          isOpen={isOpen}
          isConfirmButtonLoading={false}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
