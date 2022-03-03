import { Box, Flex, ModalCloseButton } from '@chakra-ui/react';
import { noop } from 'lodash';
import { ReactNode } from 'react';

import Modal from '@/tkeel-console-components/components/Modal';

import SuccessIcon from './SuccessIcon';
import WarningIcon from './WarningIcon';

type Props = {
  isOpen: boolean;
  width?: string | number;
  iconPosition?: 'top' | 'left';
  icon?: 'warning' | 'success' | ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  hasCancelButton?: boolean;
  hasConfirmButton?: boolean;
  isConfirmButtonDisabled?: boolean;
  isConfirmButtonLoading?: boolean;
  onClose: () => unknown;
  onCancel?: () => unknown;
  onConfirm?: (arg: any) => unknown;
};

const defaultProps = {
  iconPosition: 'top',
  onConfirm: noop,
};

const defaultPropsIconTop = {
  width: '400px',
  iconPosition: 'top',
  hasCancelButton: false,
  hasConfirmButton: false,
};

const defaultPropsIconLeft = {
  width: '500px',
  iconPosition: 'left',
  hasCancelButton: true,
  hasConfirmButton: true,
};

export default function Alert(props: Props) {
  let properties = { ...defaultProps, ...props };

  if (properties.iconPosition === 'top') {
    properties = { ...defaultProps, ...defaultPropsIconTop, ...props };
  } else if (properties.iconPosition === 'left') {
    properties = { ...defaultProps, ...defaultPropsIconLeft, ...props };
  }

  const { iconPosition, icon, title, description, children, ...rest } =
    properties;

  const renderIcon = () => {
    let [paddingRight, paddingBottom] = ['', ''];

    if (iconPosition === 'top') {
      paddingBottom = '20px';
    } else if (iconPosition === 'left') {
      paddingRight = '20px';
    }

    if (icon === 'warning') {
      return (
        <Box paddingRight={paddingRight} paddingBottom={paddingBottom}>
          <WarningIcon />
        </Box>
      );
    }

    if (icon === 'success') {
      return (
        <Box paddingRight={paddingRight} paddingBottom={paddingBottom}>
          <SuccessIcon />
        </Box>
      );
    }

    if (icon) {
      return (
        <Box paddingRight={paddingRight} paddingBottom={paddingBottom}>
          {icon}
        </Box>
      );
    }

    return null;
  };

  // let [Container, containerFlexDirection] = [Center, 'column'];

  let style = {};
  if (iconPosition === 'top') {
    style = {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    };
  }

  return (
    <Modal
      hasCloseButton={false}
      modalBodyStyle={{ padding: '40px 20px' }}
      {...rest}
    >
      <ModalCloseButton _focus={{ boxShadow: 0 }} />
      <Flex style={style}>
        {renderIcon()}
        <Flex
          flexDirection="column"
          justifyContent={iconPosition === 'left' ? 'center' : ''}
        >
          <Box
            fontWeight="600"
            fontSize="14px"
            lineHeight="32px"
            color="gray.800"
            textAlign={iconPosition === 'top' ? 'center' : 'left'}
          >
            {title}
          </Box>
          {description && (
            <Box
              paddingTop="3px"
              fontSize="12px"
              lineHeight="24px"
              color="grayAlternatives.300"
              textAlign={iconPosition === 'top' ? 'center' : 'left'}
            >
              {description}
            </Box>
          )}
          {children}
        </Flex>
      </Flex>
    </Modal>
  );
}
