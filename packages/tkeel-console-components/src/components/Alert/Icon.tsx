import { Circle } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
  wrapperBackgroundColor?: string;
  children: ReactNode;
};

export default function Icon({ wrapperBackgroundColor, children }: Props) {
  return (
    <Circle size="44px" backgroundColor={wrapperBackgroundColor}>
      {children}
    </Circle>
  );
}
