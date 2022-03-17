import { Circle } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  active: boolean;
};

export default function IconCircle({ children, active }: Props) {
  return (
    <Circle
      position="relative"
      size="32px"
      border="1px"
      borderColor={active ? 'primary' : 'gray.800'}
    >
      <Circle
        position="absolute"
        size="32px"
        backgroundColor={active ? 'primary' : 'gray.500'}
        opacity={active ? '0.5' : '1'}
      />
      {children}
    </Circle>
  );
}
