import { useDisclosure } from '@chakra-ui/react';

import { MoreActionButton, toast } from '@tkeel/console-components';
import { TrashFilledIcon } from '@tkeel/console-icons';

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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate } = useDeleteSubscriptionDeviceMutation({
    onSuccess() {
      onSuccess();
      toast({ status: 'success', title: '移除订阅设备成功' });
      refetchData();
      onClose();
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
          // eslint-disable-next-line no-console
          onOpen();
          // console.log('停用插件');
          // mutate({});
        }}
      />
      <DeleteDeviceModal
        name={name}
        isOpen={isOpen}
        isConfirmButtonLoading={false}
        onClose={onClose}
        onConfirm={handleConfirm}
      />
    </>
  );
}

export default DeleteDeviceButton;
