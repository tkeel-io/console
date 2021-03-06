import BaseRulesModal, {
  FormValues,
} from '@/tkeel-console-plugin-tenant-routing-rules/pages/Index/components/BaseRulesModal';

type Props = {
  cruxData?: {
    id: string;
    name: string;
    desc: string;
    status: number;
    type: number;
  };
  type: 'createButton' | 'createText' | 'editButton';
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  onClose: () => unknown;
  onConfirm: (formValues: FormValues) => unknown;
};

export default function CreateRulesModal({
  cruxData,
  type,
  isOpen,
  isConfirmButtonLoading,
  onClose,
  onConfirm,
}: Props) {
  return (
    <BaseRulesModal
      title={type === 'editButton' ? '编辑规则' : '创建规则'}
      buttonType={type}
      defaultValues={cruxData}
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
