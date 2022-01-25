import { ReactNode } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  StyleProps,
} from '@chakra-ui/react';
import { noop } from 'lodash';

import ButtonsWrapper from '@/tkeel-console-components/components/ButtonsWrapper';

type Props = {
  width?: string | number;
  title: ReactNode;
  children: ReactNode;
  footer?: boolean | ReactNode;
  isOpen: boolean;
  modalBodyStyle?: StyleProps;
  isConfirmButtonDisabled?: boolean;
  isConfirmButtonLoading?: boolean;
  onClose: () => unknown;
  onCancel?: () => unknown;
  onConfirm?: () => unknown;
};

function CustomModal({
  width = '600px',
  title,
  children,
  footer = true,
  isOpen,
  modalBodyStyle = {},
  isConfirmButtonDisabled = false,
  isConfirmButtonLoading = false,
  onClose,
  onCancel = onClose,
  onConfirm = noop,
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
          right="20px"
          width="32px"
          height="32px"
          borderRadius="4px"
          color="white"
          backgroundColor="gray.700"
          _hover={{ backgroundColor: 'gray.800' }}
          _focus={{ outline: 'none' }}
        />
        <ModalBody padding="19px 40px" {...modalBodyStyle}>
          {children}
        </ModalBody>
        {footer && (
          <ModalFooter
            padding="0 20px"
            height="60px"
            borderBottomLeftRadius="4px"
            borderBottomRightRadius="4px"
            backgroundColor="gray.50"
          >
            {footer === true ? (
              <ButtonsWrapper>
                <Button onClick={onCancel}>取消</Button>
                <Button
                  isDisabled={isConfirmButtonDisabled}
                  isLoading={isConfirmButtonLoading}
                  colorScheme="primary"
                  onClick={onConfirm}
                >
                  确定
                </Button>
              </ButtonsWrapper>
            ) : (
              footer
            )}
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
}

export default CustomModal;
