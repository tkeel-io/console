import React from 'react';
import { Colors, useTheme } from '@chakra-ui/react';

import {
  Desc,
  IconWrapper,
  Title,
  TitleWrapper,
  Wrapper,
} from './index.styled';

type Props = {
  name: string;
  desc: string;
};

function PageHeader({ name, desc }: Props) {
  const { colors }: { colors: Colors } = useTheme();

  return (
    <Wrapper colors={colors}>
      <IconWrapper />
      <TitleWrapper>
        <Title colors={colors}>{name}</Title>
        <Desc colors={colors}>{desc}</Desc>
      </TitleWrapper>
    </Wrapper>
  );
}

export default PageHeader;
