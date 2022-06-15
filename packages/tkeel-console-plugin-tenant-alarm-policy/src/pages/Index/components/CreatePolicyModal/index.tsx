import BasePolicyModal from '../BasePolicyModal';

type Props = {
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function CreatePolicyModal({
  isOpen,
  isConfirmButtonLoading,
  onClose,
  onConfirm,
}: Props) {
  return (
    <BasePolicyModal
      title="创建策略配置"
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
