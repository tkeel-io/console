import { ReactNode } from 'react';
import { FlexProps } from '@chakra-ui/react';

import { StyledFlex } from './index.styled';

interface Props extends FlexProps {
  children: ReactNode;
}

function ButtonsWrapper({ children }: Props) {
  return <StyledFlex>{children}</StyledFlex>;
}

export default ButtonsWrapper;
