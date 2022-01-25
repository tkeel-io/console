import { Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';

// eslint-disable-next-line import/prefer-default-export
export const StyledFlex = styled(Flex)`
  & > button:not(:last-of-type) {
    margin-right: 12px;
  }
`;
