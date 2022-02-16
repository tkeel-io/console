import { Box, Flex, Theme } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const CardContentFlex = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 24px;
  line-height: 24px;
`;

export const InfoCardWrapper = styled(Box)`
  width: 100%;
  padding: 12px 12px 12px 20px;
  background-color: ${({ theme }) => (theme as Theme).colors.white};
  border-radius: 4px;
`;
