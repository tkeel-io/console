import React, { ReactElement } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

interface Props {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
}
const defaultProps = {
  title: '',
};
function EditTenantSpaceModal({ isOpen, title, onClose }: Props): ReactElement {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" autoFocus={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          h="50px"
          fontSize="14px"
          borderBottomWidth="1px"
          borderBottomColor="grey.200"
        >
          {title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>hello</ModalBody>
        <ModalFooter>
          <Button mr="12px" onClick={onClose} size="sm">
            取消
          </Button>
          <Button colorScheme="tKeel" size="sm">
            确定
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
EditTenantSpaceModal.defaultProps = defaultProps;

export default EditTenantSpaceModal;
