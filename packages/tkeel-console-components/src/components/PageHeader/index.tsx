import React from 'react';
import {
  Wrapper,
  IconWrapper,
  TitleWrapper,
  Title,
  Desc,
} from './index.styled';
import { useTheme, Colors } from '@chakra-ui/react';

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
