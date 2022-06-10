import type { Policy } from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/usePolicyListQuery';

import BasePolicyModal from '../../pages/Index/components/BasePolicyModal';

type Props = {
  policy: Policy;
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ModifyPolicyModal({
  policy,
  isOpen,
  isConfirmButtonLoading,
  onClose,
  onConfirm,
}: Props) {
  return (
    <BasePolicyModal
      policy={policy}
      title="修改策略配置"
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
