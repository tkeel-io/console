import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const ButtonWrapper = styled(Box)`
  &:not(:last-of-type) {
    margin-right: 8px;
  }
`;
