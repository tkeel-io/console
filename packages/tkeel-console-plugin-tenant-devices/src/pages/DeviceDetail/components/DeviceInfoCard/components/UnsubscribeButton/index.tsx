import { useDisclosure } from '@chakra-ui/react';

import { Alert, LinkButton } from '@tkeel/console-components';
import { plugin } from '@tkeel/console-utils';

import useUnsubscribeMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useUnsubscribeMutation';

type Props = {
  subscribeId: string;
  deviceId: string;
  subscribeDesc: string;
  refetch?: () => void;
};

function UnsubscribeButton({
  subscribeId,
  deviceId,
  subscribeDesc,
  refetch,
}: Props) {
  const toast = plugin.getPortalToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading } = useUnsubscribeMutation({
    subscribeId,
    onSuccess() {
      toast('取消成功', { status: 'success' });
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
      const timer = setTimeout(() => {
        refetch();
        clearTimeout(timer);
      }, 300);
    }
  };

  return (
    <>
      <LinkButton onClick={onOpen} w="24px" minWidth="unset">
        取消
      </LinkButton>
      <Alert
        iconPosition="left"
        icon="warning"
        title={`确认取消对「${subscribeDesc}」的订阅？`}
        isOpen={isOpen}
        isConfirmButtonLoading={isLoading}
        onClose={onClose}
        onConfirm={handleConfirm}
      />
    </>
  );
}

export default UnsubscribeButton;
