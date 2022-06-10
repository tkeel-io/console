import { useDisclosure } from '@chakra-ui/react';

import { Modal } from '@tkeel/console-components';

export default function ConfigureNotificationModal() {
  const { isOpen, onClose } = useDisclosure({
    isOpen: true,
  });

  const handleConfirm = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      title="配置通知"
      onClose={onClose}
      onConfirm={handleConfirm}
    >
      ConfigureNotificationModal
    </Modal>
  );
}
