import { useDisclosure } from '@chakra-ui/react';
import { useIsMutating } from 'react-query';

import { CreateButton } from '@tkeel/console-components';

import CreateDeviceModal from '@/tkeel-console-plugin-tenant-data-subscription/pages/Detail/components/CreateDeviceModal';

type Props = {
  onSuccess: () => void;
};

export default function CreateDeviceButton({ onSuccess }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMutating = useIsMutating();
  const isLoading = isMutating > 0;

  const handleConfirm = async () => {
    onClose();
    onSuccess();
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
