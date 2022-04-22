import { useDisclosure } from '@chakra-ui/react';

import { MoreActionButton } from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';
import { SubscribeInfo } from '@tkeel/console-request-hooks';

import useModifySubscriptionMutation from '@/tkeel-console-plugin-tenant-data-subscription/hooks/mutations/useModifySubscriptionMutation';
import { FormValues } from '@/tkeel-console-plugin-tenant-data-subscription/pages/Index/components/BaseSubscriptionModal';

import ModifySubscriptionModal from '../ModifySubscriptionModal';

type Props = {
  onSuccess: () => unknown;
  data?: SubscribeInfo;
};

export default function ModifySubscriptionButton({ onSuccess, data }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const id = data?.id ?? '';

  const { mutate, isLoading } = useModifySubscriptionMutation({
    id,
    onSuccess() {
      onSuccess();
      onClose();
    },
  });

  const handleConfirm = (formValues: FormValues) => {
    const numberId = Number(id);
    if (formValues && !Number.isNaN(numberId)) {
      mutate({
        data: { ...formValues, id: numberId },
      });
    }
  };

  return (
    <>
      <MoreActionButton
        icon={<PencilFilledIcon />}
        title="编辑信息"
        onClick={() => {
          onOpen();
        }}
      />
      <ModifySubscriptionModal
        data={data}
        isOpen={isOpen}
        isConfirmButtonLoading={isLoading}
        onClose={onClose}
        onConfirm={handleConfirm}
      />
    </>
  );
}
