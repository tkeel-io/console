import { useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { MoreActionButton, toast } from '@tkeel/console-components';
import { AlarmLampFilledIcon, TrashFilledIcon } from '@tkeel/console-icons';

import CustomModal from '@/tkeel-console-plugin-tenant-devices/components/CustomModal';
import useDeleteDeviceMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useDeleteDeviceMutation';

type Props = {
  ids: string[];
  deviceName: string;
  refetch?: () => void;
};

function Index({ deviceName, ids, refetch }: Props) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading } = useDeleteDeviceMutation({
    ids,
    onSuccess() {
      toast({ status: 'success', title: '删除成功' });
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
        icon={<TrashFilledIcon size="12px" />}
        title="删除设备"
      />
      <CustomModal
        bg="red.50"
        icon={<AlarmLampFilledIcon size="24px" />}
        title={`确认删除设备「${deviceName}」？`}
        isConfirmButtonLoading={isLoading}
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleConfirm}
      />
    </>
  );
}

export default Index;
