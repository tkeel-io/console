import { SubscribeInfo } from '@tkeel/console-request-hooks';

import BaseSubscriptionModal, {
  FormValues,
} from '@/tkeel-console-plugin-tenant-data-subscription/pages/Index/components/BaseSubscriptionModal';

type Props = {
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  onClose: () => unknown;
  onConfirm: (formValues: FormValues) => unknown;
  data?: SubscribeInfo;
};

export default function ModifySubscriptionModal({
  isOpen,
  isConfirmButtonLoading,
  onClose,
  onConfirm,
  data,
}: Props) {
  return (
    <BaseSubscriptionModal
      title="修改订阅"
      defaultValues={data}
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
