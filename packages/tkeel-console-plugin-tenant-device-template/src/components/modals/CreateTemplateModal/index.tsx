import { Box, Flex } from '@chakra-ui/react';
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

export default function CreateRoleModal({
  isOpen,
  isConfirmButtonLoading,
  onClose,
  onConfirm,
}: Props) {
  return (
    <Modal
      title="创建角色"
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={onClose}
      onConfirm={onConfirm}
    >
      <Flex
        bg="gray.50"
        p="12px 12px 12px 20px"
        borderRadius="4px"
        flexDirection="row"
        minH="600px"
      >
        <Box bg="white" flex="1" borderRadius="4px">
          主要内容
        </Box>
      </Flex>
    </Modal>
  );
}
