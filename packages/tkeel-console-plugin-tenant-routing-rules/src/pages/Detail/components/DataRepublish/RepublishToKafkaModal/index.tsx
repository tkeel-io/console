// import { Flex } from '@chakra-ui/react';

import { Modal } from '@tkeel/console-components';
import { KafkaFilledIcon } from '@tkeel/console-icons';

import ModalContentTitle from '@/tkeel-console-plugin-tenant-routing-rules/pages/Detail/components/ModalContentTitle';

type Props = {
  isOpen: boolean;
  onClose: () => unknown;
};

export default function RepublishToKafkaModal({ isOpen, onClose }: Props) {
  return (
    <Modal
      title="转发到 Kafka"
      isOpen={isOpen}
      // isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={onClose}
      onConfirm={() => {
        onClose();
      }}
    >
      <ModalContentTitle
        icon={<KafkaFilledIcon />}
        title="将数据发送到 Kafka"
      />
      RepublishToKafkaModal
    </Modal>
  );
}
