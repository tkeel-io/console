import BaseUserModal, {
  FormValues,
} from '@/tkeel-console-plugin-tenant-routing-rules/pages/Index/components/BaseRulesModal';

type Props = {
  type: 'createButton' | 'createText' | 'editButton';
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  onClose: () => unknown;
  onConfirm: (formValues: FormValues) => unknown;
};

export default function CreateRulesModal({
  type,
  isOpen,
  isConfirmButtonLoading,
  onClose,
  onConfirm,
}: Props) {
  return (
    <BaseUserModal
      title={type === 'editButton' ? '编辑规则' : '创建规则'}
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
