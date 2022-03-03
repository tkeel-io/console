import { useDisclosure } from '@chakra-ui/react';

import { LinkButton, toast } from '@tkeel/console-components';
import { AlarmLampFilledIcon } from '@tkeel/console-icons';

import CustomModal from '@/tkeel-console-plugin-tenant-devices/components/CustomModal';
import useUnsubscribeMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useUnsubscribeMutation';

type Props = {
  subscribeId?: string;
  deviceId: string;
  subscribeAddr: string;
  refetch?: () => void;
};

function UnsubscribeButton({
  subscribeId = '1',
  deviceId,
  subscribeAddr,
  refetch,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading } = useUnsubscribeMutation({
    subscribeId,
    onSuccess() {
      toast({ status: 'success', title: '取消成功' });
      onClose();
    },
  });

  const handleConfirm = () => {
    mutate({
      data: {
        entities: deviceId ? [deviceId] : [],
      },
    });
    if (refetch) {
      refetch();
    }
  };

  return (
    <>
      <LinkButton onClick={onOpen} fontWeight="400" ml="-2px">
        取消
      </LinkButton>
      <CustomModal
        bg="red.50"
        icon={<AlarmLampFilledIcon size="24px" />}
        title={`确认取消订阅「${subscribeAddr}}」？`}
        isConfirmButtonLoading={isLoading}
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleConfirm}
      />
    </>
  );
}

export default UnsubscribeButton;
