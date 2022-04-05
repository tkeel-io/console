import { useDisclosure } from '@chakra-ui/react';

import { MoreActionButton } from '@tkeel/console-components';
import { TrashFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useDeleteSubscriptionDeviceMutation from '@/tkeel-console-plugin-tenant-data-subscription/hooks/mutations/useDeleteSubscriptionDeviceMutation';
import DeleteDeviceModal from '@/tkeel-console-plugin-tenant-data-subscription/pages/Detail/components/DeleteDeviceModal';

type Props = {
  selected_ids: string[];
  name: string[];
  refetchData: () => unknown;
  onSuccess: () => void;
};

function DeleteDeviceButton({
  selected_ids,
  refetchData,
  onSuccess,
  name,
}: Props) {
  const toast = plugin.getPortalToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate, isLoading } = useDeleteSubscriptionDeviceMutation({
    onSuccess() {
      onSuccess();
      onClose();
      toast('移除设备成功', { status: 'success' });
      // TODO 移除设备后有延迟，临时解决方案
      setTimeout(() => {
        refetchData();
      }, 800);
    },
  });

  const handleConfirm = () => {
    mutate({ data: { entities: selected_ids } });
  };
  return (
    <>
      <MoreActionButton
        icon={<TrashFilledIcon />}
        title="移除设备"
        onClick={() => {
          onOpen();
        }}
      />
      <DeleteDeviceModal
        name={name}
        isOpen={isOpen}
        isConfirmButtonLoading={isLoading}
        onClose={onClose}
        onConfirm={handleConfirm}
      />
    </>
  );
}

export default DeleteDeviceButton;
