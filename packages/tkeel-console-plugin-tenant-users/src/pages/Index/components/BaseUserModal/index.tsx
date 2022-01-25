import { ReactNode } from 'react';
import { Modal } from '@tkeel/console-components';

type Props = {
  title: ReactNode;
  isOpen: boolean;
  onClose: () => unknown;
};

export default function BaseUserModal({ title, isOpen, onClose }: Props) {
  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose}>
      123
    </Modal>
  );
}
