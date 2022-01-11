import React from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

type Props = {
  width?: string | number;
  title: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const defaultProps = {
  width: '600px',
  footer: null,
};

function CustomModal({
  width,
  title,
  children,
  footer,
  isOpen,
  onClose,
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent
        width={width}
        maxWidth="unset"
        borderRadius="4px"
        boxShadow="0px 4px 8px rgba(36, 46, 66, 0.06)"
      >
        <ModalHeader
          display="flex"
          alignItems="center"
          flexBasis="50px"
          padding="0 20px"
          borderBottomWidth="1px"
          borderBottomStyle="solid"
          borderBottomColor="gray.200"
        >
          {title}
        </ModalHeader>
        <ModalCloseButton
          top="9px"
          right="20px "
          width="32px"
          height="32px"
          borderRadius="4px"
          color="white"
          backgroundColor="gray.800"
          boxShadow="0px 8px 16px rgba(36, 46, 66, 0.28)"
          _hover={{ backgroundColor: 'gray.800' }}
          _focus={{ outline: 'none' }}
        />
        <ModalBody padding="32px 40px">{children}</ModalBody>
        <ModalFooter
          padding="0 20px"
          height="60px"
          borderBottomLeftRadius="4px"
          borderBottomRightRadius="4px"
          backgroundColor="gray.50"
        >
          {footer}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

CustomModal.defaultProps = defaultProps;

export default CustomModal;
