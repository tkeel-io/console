import { HStack, StackProps } from '@chakra-ui/react';
import { CSSProperties, ReactNode } from 'react';

interface Props extends StackProps {
  children: ReactNode;
  style?: CSSProperties;
}

function ButtonsHStack({ children, style }: Props) {
  return (
    <HStack spacing="12px" style={style}>
      {children}
    </HStack>
  );
}

export default ButtonsHStack;
