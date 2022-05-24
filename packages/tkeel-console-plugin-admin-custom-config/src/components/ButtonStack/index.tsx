import { Button, HStack, StyleProps } from '@chakra-ui/react';

interface Props {
  onConfirm: () => void;
  onReset: () => void;
  styles?: {
    wrapper?: StyleProps;
  };
}

export default function ButtonStack({ onConfirm, onReset, styles }: Props) {
  return (
    <HStack spacing="8px" {...styles?.wrapper}>
      <Button
        colorScheme="brand"
        borderRadius="6px"
        boxShadow="none"
        onClick={onConfirm}
      >
        确定
      </Button>
      <Button borderRadius="6px" boxShadow="none" onClick={onReset}>
        重置
      </Button>
    </HStack>
  );
}
