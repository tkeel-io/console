import { Modal } from '@tkeel/console-components';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AutoMappingModal({ isOpen, onClose }: Props) {
  return (
    <Modal title="自动映射" isOpen={isOpen} onClose={onClose}>
      test
    </Modal>
  );
}
