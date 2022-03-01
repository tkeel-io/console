import { useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { MoreActionButton, toast } from '@tkeel/console-components';
import { AddFilledIcon } from '@tkeel/console-icons';

import AddSubscribeModal from '@/tkeel-console-plugin-tenant-devices/components/AddSubscribeModal';
import useDeleteDeviceMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useDeleteDeviceMutation';

type Props = {
  refetch?: () => void;
};

function AddSubscribeButton({ refetch }: Props) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading } = useDeleteDeviceMutation({
    ids: ['2', '23'],
    onSuccess() {
      toast({ status: 'success', title: '添加成功' });
      onClose();
      if (refetch) {
        refetch();
      }
    },
  });

  const handleConfirm = () => {
    mutate({});
    navigate('/');
  };

  return (
    <>
      <MoreActionButton
        onClick={onOpen}
        icon={<AddFilledIcon size="12px" />}
        title="添加订阅"
      />
      {isOpen && (
        <AddSubscribeModal
          isConfirmButtonLoading={isLoading}
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}

export default AddSubscribeButton;
