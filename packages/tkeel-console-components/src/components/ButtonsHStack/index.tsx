import { HStack, StackProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props extends StackProps {
  children: ReactNode;
}

function ButtonsHStack({ children }: Props) {
  return <HStack spacing="12px">{children}</HStack>;
}

export default ButtonsHStack;
