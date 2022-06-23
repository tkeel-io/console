import {
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props extends DrawerProps {
  title: string;
  children: ReactNode;
  placement?: 'top' | 'left' | 'bottom' | 'right';
  width?: string;
  isOpen: boolean;
  onClose: () => unknown;
}

function Drawer({
  title,
  children,
  placement = 'right',
  width = '400px',
  isOpen,
  onClose,
  ...rest
}: Props) {
  return (
    <ChakraDrawer
      placement={placement}
      isOpen={isOpen}
      onClose={onClose}
      {...rest}
    >
      <DrawerOverlay />
      <DrawerContent width={width} maxWidth={width}>
        <DrawerCloseButton
          top="11px"
          right="20px"
          _focus={{ boxShadow: 'none' }}
        />
        <DrawerHeader
          color="gray.800"
          fontSize="14px"
          fontWeight="500"
          borderBottomWidth="1px"
          borderBottomStyle="solid"
          borderBottomColor="grayAlternatives.50"
          backgroundColor="gray.50"
        >
          {title}
        </DrawerHeader>
        <DrawerBody padding="0">{children}</DrawerBody>
      </DrawerContent>
    </ChakraDrawer>
  );
}

export default Drawer;
