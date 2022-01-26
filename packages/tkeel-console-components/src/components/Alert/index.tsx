import { ReactNode } from 'react';
import {
  Box,
  Center,
  Flex,
  Heading,
  ModalCloseButton,
  Text,
} from '@chakra-ui/react';
import { noop } from 'lodash';

import Modal from '@/tkeel-console-components/components/Modal';

import WarningIcon from './WarningIcon';

type Props = {
  isOpen: boolean;
  width?: string | number;
  iconPosition?: 'top' | 'left';
  icon?: 'warning' | ReactNode;
  title: ReactNode;
  description?: ReactNode;
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

  const { iconPosition, icon, title, description, ...rest } = properties;

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

    if (icon) {
      return (
        <Box paddingRight={paddingRight} paddingBottom={paddingBottom}>
          {icon}
        </Box>
      );
    }

    return null;
  };

  if (iconPosition === 'left') {
    return (
      <Modal
        hasCloseButton={false}
        modalBodyStyle={{ padding: '40px 20px' }}
        {...rest}
      >
        <ModalCloseButton />
        <Flex>
          {renderIcon()}
          <Box>
            <Heading
              as="h6"
              fontWeight="600"
              fontSize="14px"
              lineHeight="32px"
              color="gray.800"
            >
              {title}
            </Heading>
            {description && (
              <Text
                paddingTop="3px"
                fontSize="12px"
                lineHeight="24px"
                color="grayAlternatives.300"
              >
                {description}
              </Text>
            )}
          </Box>
        </Flex>
      </Modal>
    );
  }

  return (
    <Modal
      hasCloseButton={false}
      modalBodyStyle={{ padding: '40px 20px' }}
      {...rest}
    >
      <ModalCloseButton />
      <Center flexDirection="column">
        {renderIcon()}
        <Box>
          <Heading
            as="h6"
            fontWeight="600"
            fontSize="14px"
            lineHeight="32px"
            color="gray.800"
          >
            {title}
          </Heading>
          {description && (
            <Text
              paddingTop="3px"
              fontSize="12px"
              lineHeight="24px"
              color="grayAlternatives.300"
            >
              {description}
            </Text>
          )}
        </Box>
      </Center>
    </Modal>
  );
}
