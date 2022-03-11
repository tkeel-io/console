import { Circle, useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { Alert, MoreActionButton } from '@tkeel/console-components';
import { TrashFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useDeleteDeviceMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useDeleteDeviceMutation';

type Props = {
  ids: string[];
  deviceName: string;
  refetch?: () => void;
};

function DeleteDevicesButton({ deviceName, ids, refetch }: Props) {
  const toast = plugin.getPortalToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading } = useDeleteDeviceMutation({
    ids,
    onSuccess() {
      toast('删除成功', { status: 'success' });
      onClose();
      if (refetch) {
        const timer = setTimeout(() => {
          refetch();
          clearTimeout(timer);
        }, 800);
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
        icon={<TrashFilledIcon size="12px" color="grayAlternatives.300" />}
        title="删除设备"
      />
      {isOpen && (
        <Alert
          iconPosition="left"
          icon={
            <Circle size="44px" backgroundColor="red.50">
              <TrashFilledIcon size="24px" color="red.300" />
            </Circle>
          }
          title={`确认删除设备「${deviceName}」？`}
          isOpen={isOpen}
          isConfirmButtonLoading={isLoading}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}

export default DeleteDevicesButton;
