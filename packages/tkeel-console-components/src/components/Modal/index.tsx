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

import ButtonsHStack from '@/tkeel-console-components/components/ButtonsHStack';

type Props = {
  isOpen: boolean;
  width?: string | number;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  hasCloseButton?: boolean;
  hasCancelButton?: boolean;
  hasConfirmButton?: boolean;
  isConfirmButtonDisabled?: boolean;
  isConfirmButtonLoading?: boolean;
  modalBodyStyle?: StyleProps;
  onClose: () => unknown;
  onCancel?: () => unknown;
  onConfirm?: (arg: any) => unknown;
};

const modalFooterProps = {
  padding: '0 20px',
  height: '60px',
  borderBottomLeftRadius: '4px',
  borderBottomRightRadius: '4px',
  backgroundColor: 'gray.50',
};

function CustomModal({
  isOpen,
  width = '600px',
  title,
  children,
  footer = null,
  hasCloseButton = true,
  hasCancelButton = true,
  hasConfirmButton = true,
  isConfirmButtonDisabled = false,
  isConfirmButtonLoading = false,
  modalBodyStyle = {},
  onClose,
  onCancel = onClose,
  onConfirm = noop,
}: Props) {
  const renderFooter = () => {
    if (footer) {
      return <ModalFooter {...modalFooterProps}>{footer}</ModalFooter>;
    }

    if (hasCancelButton || hasConfirmButton) {
      return (
        <ModalFooter {...modalFooterProps}>
          <ButtonsHStack>
            {hasCancelButton && <Button onClick={onCancel}>取消</Button>}
            {hasConfirmButton && (
              <Button
                isDisabled={isConfirmButtonDisabled}
                isLoading={isConfirmButtonLoading}
                colorScheme="primary"
                onClick={onConfirm}
              >
                确定
              </Button>
            )}
          </ButtonsHStack>
        </ModalFooter>
      );
    }

    return null;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent
        width={width}
        maxWidth="unset"
        borderRadius="4px"
        boxShadow="0px 4px 8px rgba(36, 46, 66, 0.06)"
      >
        {title && (
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
        )}
        {hasCloseButton && (
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
        )}
        <ModalBody padding="20px 40px" {...modalBodyStyle}>
          {children}
        </ModalBody>
        {renderFooter()}
      </ModalContent>
    </Modal>
  );
}

export default CustomModal;
