import BaseSubscriptionModal, {
  FormValues,
} from '@/tkeel-console-plugin-tenant-data-subscription/pages/Index/components/BaseSubscriptionModal';

type Props = {
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  onClose: () => unknown;
  onConfirm: (formValues: FormValues) => unknown;
};

export default function ModifySubscriptionModal({
  isOpen,
  isConfirmButtonLoading,
  onClose,
  onConfirm,
}: Props) {
  // console.log('123', isOpen);

  return (
    <BaseSubscriptionModal
      title="创建订阅"
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
