import {
  CloseButton as ChakraCloseButton,
  CloseButtonProps,
} from '@chakra-ui/react';

export default function CloseButton(props: CloseButtonProps) {
  return (
    <ChakraCloseButton
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
