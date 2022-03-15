import { Circle } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { ICON_SIZE } from './constants';

type Props = {
  backgroundColor?: string;
  children: ReactNode;
};

export default function IconWrapper({ backgroundColor, children }: Props) {
  return (
    <Circle size={ICON_SIZE} backgroundColor={backgroundColor}>
      {children}
    </Circle>
  );
}
