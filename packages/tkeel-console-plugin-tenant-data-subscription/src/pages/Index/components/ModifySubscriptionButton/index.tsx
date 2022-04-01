import { useDisclosure } from '@chakra-ui/react';

import { MoreActionButton } from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';

import useModifySubscriptionMutation from '@/tkeel-console-plugin-tenant-data-subscription/hooks/mutations/useModifySubscriptionMutation';
import { Data } from '@/tkeel-console-plugin-tenant-data-subscription/hooks/queries/useListSubscribeQuery';
import { FormValues } from '@/tkeel-console-plugin-tenant-data-subscription/pages/Index/components/BaseSubscriptionModal';
import ModifySubscriptionModal from '@/tkeel-console-plugin-tenant-data-subscription/pages/Index/components/ModifySubscriptionModal';

type Props = {
  onSuccess: () => void;
  data?: Data;
};

export default function ModifySubscriptionButton({ onSuccess, data }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading } = useModifySubscriptionMutation({
    id: data?.id || '0',
    onSuccess() {
      onSuccess();
      onClose();
    },
  });

  const handleConfirm = (formValues: FormValues) => {
    if (formValues) {
      mutate({
        data: { ...formValues, id: Number(data?.id) || 0 },
      });
    }
    return null;
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
