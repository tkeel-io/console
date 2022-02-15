import { ReactNode } from 'react';
import {
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';

type Props = {
  title: string;
  children: ReactNode;
  placement?: 'top' | 'left' | 'bottom' | 'right';
  isOpen: boolean;
  onClose: () => unknown;
};

function Drawer({
  title,
  children,
  placement = 'right',
  isOpen,
  onClose,
}: Props) {
  return (
    <ChakraDrawer placement={placement} isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton
          top="14px"
          right="20px"
          width="32px"
          height="32px"
          borderRadius="4px"
          color="white"
          backgroundColor="gray.700"
          _hover={{ backgroundColor: 'gray.800' }}
          _focus={{ outline: 'none' }}
        />
        <DrawerHeader>{title}</DrawerHeader>
        <DrawerBody>{children}</DrawerBody>
      </DrawerContent>
    </ChakraDrawer>
  );
}

export default Drawer;
