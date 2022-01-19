import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

// eslint-disable-next-line import/prefer-default-export
export const ButtonWrapper = styled(Box)`
  &:not(:last-of-type) {
    margin-right: 8px;
  }
`;
