import { RequestData } from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/mutations/useCreatePolicyMutation';
import type { Policy } from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/usePolicyListQuery';
import type { RuleDesc } from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/useRuleDescQuery';
import BasePolicyModal from '@/tkeel-console-plugin-tenant-alarm-policy/pages/Index/components/BasePolicyModal';

type Props = {
  policy: Policy;
  ruleDescList: RuleDesc[];
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  onClose: () => void;
  onConfirm: (data: RequestData) => void;
};

export default function ModifyPolicyModal({
  policy,
  ruleDescList,
  isOpen,
  isConfirmButtonLoading,
  onClose,
  onConfirm,
}: Props) {
  return (
    <BasePolicyModal
      policy={policy}
      ruleDescList={ruleDescList}
      title="修改策略配置"
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
