import { Modal } from '@tkeel/console-components';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConfigureNotificationModal({ isOpen, onClose }: Props) {
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
