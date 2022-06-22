import { useDisclosure } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { AddDevicesModal } from '@tkeel/console-business-components';
import { CreateButton } from '@tkeel/console-components';
import { DeviceItem } from '@tkeel/console-request-hooks';
import { plugin } from '@tkeel/console-utils';

import useAddSubscribeEntitiesMutation from '@/tkeel-console-plugin-tenant-data-subscription/hooks/mutations/useAddSubscribeEntitiesMutation';

type Props = {
  refetchData: () => unknown;
};

export default function CreateDeviceButton({ refetchData }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = plugin.getPortalToast();

  const { id } = useParams();

  const { mutate, isLoading } = useAddSubscribeEntitiesMutation({
    id: id || '',
    onSuccess() {
      onClose();
      refetchData();
      toast('添加设备成功', { status: 'success' });
    },
  });

  const handleConfirm = (devices: DeviceItem[]) => {
    const entities = devices.map((device) => device.id);
    if (id) {
      mutate({
        data: {
          entities,
        },
      });
    }
  };

  return (
    <>
      <CreateButton onClick={onOpen}>添加设备</CreateButton>
      {isOpen && (
        <AddDevicesModal
          isOpen={isOpen}
          isLoading={isLoading}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
