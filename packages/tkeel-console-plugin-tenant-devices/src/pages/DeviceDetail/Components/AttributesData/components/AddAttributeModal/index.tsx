import { Modal } from '@tkeel/console-components';

type Props = {
  isOpen: boolean;
  isConfirmButtonLoading?: boolean;
  onClose: () => unknown;
  onConfirm: () => void;
};

function AddAttributeModal({
  isOpen,
  onClose,
  isConfirmButtonLoading,
  onConfirm,
}: Props) {
  return (
    <Modal
      title="新增属性"
      isOpen={isOpen}
      onClose={onClose}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onConfirm={onConfirm}
      modalBodyStyle={{ padding: '20px 40px' }}
      width="600px"
      footer={null}
    >
      231
    </Modal>
  );
}

export default AddAttributeModal;
