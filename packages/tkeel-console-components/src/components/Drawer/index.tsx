import { ReactNode } from 'react';
import {
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
} from '@chakra-ui/react';

type Props = {
  title: string;
  children: ReactNode;
  placement?: 'top' | 'left' | 'bottom' | 'right';
  width?: string;
  isOpen: boolean;
  onClose: () => unknown;
};

function Drawer({
  title,
  children,
  placement = 'right',
  width = '400px',
  isOpen,
  onClose,
  ...rest
}: Props & DrawerProps) {
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
          width="32px"
          height="32px"
          borderRadius="4px"
          color="white"
          backgroundColor="gray.700"
          _hover={{ backgroundColor: 'gray.800' }}
          _focus={{ outline: 'none' }}
        />
        <DrawerHeader
          color="gray.800"
          fontSize="14px"
          fontWeight="500"
          borderBottomWidth="1px"
          borderBottomStyle="solid"
          borderBottomColor="grayAlternatives.50"
        >
          {title}
        </DrawerHeader>
        <DrawerBody padding="0">{children}</DrawerBody>
      </DrawerContent>
    </ChakraDrawer>
  );
}

export default Drawer;
