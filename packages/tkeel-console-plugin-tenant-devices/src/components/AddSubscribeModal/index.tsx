import { Box } from '@chakra-ui/react';

import { Modal } from '@tkeel/console-components';

type Props = {
  isOpen: boolean;
  isConfirmButtonLoading?: boolean;
  onClose: () => unknown;
  onConfirm?: () => unknown;
};

function AddSubscribeModal({
  isOpen,
  onClose,
  isConfirmButtonLoading,
  onConfirm,
}: Props) {
  return (
    <Modal
      title="订阅设备"
      isOpen={isOpen}
      onClose={onClose}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onConfirm={onConfirm}
      modalBodyStyle={{ padding: '40px 0 35px 20px' }}
      width="600px"
      footer={null}
    >
      <Box>订阅地址</Box>
    </Modal>
  );
}

export default AddSubscribeModal;
