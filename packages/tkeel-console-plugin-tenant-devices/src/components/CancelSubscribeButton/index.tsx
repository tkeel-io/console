import { useDisclosure } from '@chakra-ui/react';
import { MoreActionButton, toast } from '@tkeel/console-components';
import { AlarmLampFilledIcon, LightningFilledIcon } from '@tkeel/console-icons';

import CustomModal from '@/tkeel-console-plugin-tenant-devices/components/CustomModal';
import useCancelSubscribeMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useCancelSubscribeMutation';

type Props = {
  id: string;
  deviceName: string;
};

function Index({ deviceName, id }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading } = useCancelSubscribeMutation({
    id,
    onSuccess() {
      toast({ status: 'success', title: '取消成功' });
      onClose();
    },
  });

  const handleConfirm = () => {
    mutate({ data: {} });
  };

  return (
    <>
      <MoreActionButton
        onClick={onOpen}
        icon={<LightningFilledIcon size="12px" />}
        title="取消订阅"
      />
      <CustomModal
        bg="red.50"
        icon={<AlarmLampFilledIcon size="24px" />}
        title={`确认取消订阅设备「${deviceName}」？`}
        isConfirmButtonLoading={isLoading}
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleConfirm}
      />
    </>
  );
}

export default Index;
