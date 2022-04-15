import {
  CloseButtonProps,
  ModalCloseButton as ChakraModalCloseButton,
} from '@chakra-ui/react';

type Props = CloseButtonProps;

export default function ModalCloseButton(props: Props) {
  return (
    <ChakraModalCloseButton
      width="32px"
      height="32px"
      borderRadius="4px"
      color="white"
      size="10px"
      backgroundColor="gray.700"
      _hover={{ backgroundColor: 'gray.800' }}
      _focus={{ outline: 'none' }}
      {...props}
    />
  );
}
