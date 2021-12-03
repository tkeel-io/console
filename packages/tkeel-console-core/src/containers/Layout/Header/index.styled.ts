import { Flex, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const LayoutHeader = styled(Flex)`
  justify-content: space-between;
  height: 22px;
  margin-bottom: 20px;

  a {
    color: #79879c;
    font-size: 14px;
  }
`;

export const UserInfo = styled(Flex)`
  align-items: center;
`;

export const Username = styled(Text)`
  margin-left: 5px;
  color: #718096;
  font-size: 12px;
`;
