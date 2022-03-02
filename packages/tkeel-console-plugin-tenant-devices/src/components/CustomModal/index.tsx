import { Box, Flex, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { Modal } from '@tkeel/console-components';

type Props = {
  icon: ReactNode;
  isOpen: boolean;
  isConfirmButtonLoading?: boolean;
  onClose: () => unknown;
  onConfirm?: () => unknown;
  bg: string;
  title: string;
  description?: ReactNode;
};

function CustomModal({
  isOpen,
  onClose,
  isConfirmButtonLoading,
  onConfirm,
  bg,
  icon,
  title,
  description,
}: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onConfirm={onConfirm}
      modalBodyStyle={{ padding: '40px 0 35px 20px' }}
      width="500px"
      footer={null}
    >
      <Flex>
        <Flex
          w="44px"
          h="44px"
          bg={bg}
          borderRadius="50%"
          justifyContent="center"
          alignItems="center"
        >
          {icon}
        </Flex>
        <Box ml="20px">
          <Text
            h="32px"
            lineHeight="32px"
            fontSize="14px"
            fontWeight="600"
            color="gray.800"
            mb="3px"
          >
            {title}
          </Text>
          <Text
            h="24px"
            lineHeight="24px"
            fontSize="12px"
            color="grayAlternatives.300"
          >
            {description}
          </Text>
        </Box>
      </Flex>
    </Modal>
  );
}

export default CustomModal;
