import { ReactNode } from 'react';
import { Circle, SquareProps } from '@chakra-ui/react';

type Props = SquareProps & {
  children: ReactNode;
};

export default function CustomCircle({ children, ...rest }: Props) {
  return (
    <Circle size="32px" backgroundColor="gray.100" cursor="pointer" {...rest}>
      {children}
    </Circle>
  );
}
