import { useDisclosure } from '@chakra-ui/react';

import { MoreActionButton, toast } from '@tkeel/console-components';
import { AddFilledIcon } from '@tkeel/console-icons';

import AddSubscribeModal, {
  FormValues,
} from '@/tkeel-console-plugin-tenant-devices/components/AddSubscribeModal';
import useSubscribeByDeviceMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useSubscribeByDeviceMutation';

type Props = {
  id: string;
  refetch?: () => void;
};

function AddSubscribeButton({ id, refetch }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading } = useSubscribeByDeviceMutation({
    deviceId: id,
    onSuccess() {
      toast({ status: 'success', title: '添加成功' });
      onClose();
      if (refetch) {
        const timer = setTimeout(() => {
          refetch();
          clearTimeout(timer);
        }, 300);
      }
    },
  });

  const handleConfirm = (formValues: FormValues) => {
    mutate({
      data: formValues,
    });
  };

  return (
    <>
      <MoreActionButton
        onClick={onOpen}
        icon={<AddFilledIcon color="grayAlternatives.300" size="12px" />}
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
