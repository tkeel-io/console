import { Flex, Text } from '@chakra-ui/react';

import Modal from '@tkeel/console-components/src/components/Modal';

export interface FormValues {
  role: string;
  plugins: string[];
}

type Props = {
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  onClose: () => unknown;
  onConfirm: (formValues: FormValues) => unknown;
};

export default function CustomTemplateModal({
  isOpen,
  isConfirmButtonLoading,
  onClose,
  onConfirm,
}: Props) {
  return (
    <Modal
      title={<Text fontSize="14px">创建模板</Text>}
      isOpen={isOpen}
      onClose={onClose}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onConfirm={onConfirm}
      modalBodyStyle={{ padding: '20px 20px', minWidth: '900px' }}
      width="900px"
      footer={null}
    >
      <Flex justifyContent="space-between" w="100%">
        2412
      </Flex>
    </Modal>
  );
}
