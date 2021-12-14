<<<<<<< HEAD
=======
import { ColorHues, Colors } from '@chakra-ui/react';
>>>>>>> 744a43a5a9d68dafa663bb5dd8cf1dc706496db2
import styled from '@emotion/styled';
import {
  Box,
  Center,
  Flex,
  Heading,
  Link,
  Text,
} from '@tkeel/console-components';

export const Wrapper = styled(Box)`
  width: 250px;
  background-color: #f7fafc;
`;

export const TitleWrapper = styled(Flex)`
  align-items: center;
  height: 92px;
  padding-left: 24px;
  border-bottom: 1px solid #e2e8f0;
`;

export const Title = styled(Heading)`
  margin-left: 10px;
  color: #2d3748;
`;

export const List = styled(Box)`
  padding: 24px;
`;

export const IconWrapper = styled(Center)`
  width: 32px;
  height: 32px;
  margin-right: 10px;
  border-radius: 4px;
`;

export const CategoryName = styled(Text)`
  margin: 20px 0;
`;

export const MenuItem = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  height: 44px;
  padding-left: 22px;
  font-weight: 500;
  cursor: pointer;
`;

export const IconName = styled(Flex)`
  align-items: center;
`;

export const MenuLink = styled(Link)`
  display: flex;
  align-items: center;
  height: 44px;
  margin-bottom: 4px;
  border-radius: 4px;
  box-shadow: none !important;

  &.active {
    background-color: #2d3748;
    box-shadow: 0 20px 25px -5px rgb(113 128 150 / 10%),
      0 10px 10px -5px rgb(113 128 150 / 4%);

    ${MenuItem} {
      color: #fff;
    }
  }
`;

export const SubMenuTitle = styled(Box)`
  background-color: ${({ active }) =>
    active === 'true' ? '#2d3748' : 'transparent'};
  border-radius: 4px;

  ${MenuItem} {
    color: ${({ active }) => (active === 'true' ? '#fff' : '#36435C')};
  }
`;

export const SubMenuLink = styled(Link)`
  display: flex;
  align-items: center;
  height: 44px;
  padding-left: 64px;
  box-shadow: none !important;
`;
