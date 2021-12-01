import React from 'react';
import { ButtonProps } from '@chakra-ui/react';

import { StyledButton } from './index.styled';

function Button(props: ButtonProps): JSX.Element {
  return <StyledButton {...props} />;
}

export default Button;
