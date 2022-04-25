import { useDisclosure } from '@chakra-ui/react';
import { useIsMutating } from 'react-query';

import { CreateButton } from '@tkeel/console-components';
import { plugin } from '@tkeel/console-utils';

import CreateDeviceModal from '../CreateDeviceModal';

type Props = {
  refetchData: () => unknown;
};

export default function CreateDeviceButton({ refetchData }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMutating = useIsMutating();
  const isLoading = isMutating > 0;
  const toast = plugin.getPortalToast();

  const handleConfirm = async () => {
    onClose();
    refetchData();
    toast('添加设备成功', { status: 'success' });
  };

  return (
    <>
      <CreateButton onClick={onOpen}>添加设备</CreateButton>
      {isOpen && (
        <CreateDeviceModal
          isOpen={isOpen}
          isConfirmButtonLoading={isLoading}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
