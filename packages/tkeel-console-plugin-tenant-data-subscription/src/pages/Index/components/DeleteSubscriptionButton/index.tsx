import { useDisclosure } from '@chakra-ui/react';

import { MoreActionButton } from '@tkeel/console-components';
import { TrashFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useDeleteSubscriptionMutation from '@/tkeel-console-plugin-tenant-data-subscription/hooks/mutations/useDeleteSubscriptionMutation';
import DeleteSubscriptionModal from '@/tkeel-console-plugin-tenant-data-subscription/pages/Index/components/DeleteSubscriptionModal';

type Props = {
  id: string;
  name: string;
  refetchData: () => unknown;
};

function DeleteSubscriptionButton({ id, refetchData, name }: Props) {
  const toast = plugin.getPortalToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading } = useDeleteSubscriptionMutation({
    id,
    onSuccess() {
      // onSuccess();
      toast('删除订阅成功', { type: 'success' });
      refetchData();
      onClose();
    },
  });

  const handleConfirm = () => {
    mutate({});
  };
  return (
    <>
      <MoreActionButton
        icon={<TrashFilledIcon />}
        title="删除订阅"
        onClick={() => {
          onOpen();
        }}
      />

      <DeleteSubscriptionModal
        name={name}
        isOpen={isOpen}
        isConfirmButtonLoading={isLoading}
        onClose={onClose}
        onConfirm={handleConfirm}
      />
    </>
  );
}

export default DeleteSubscriptionButton;
