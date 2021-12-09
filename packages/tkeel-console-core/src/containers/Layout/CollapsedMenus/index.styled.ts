import { Box, Center, ColorHues, Colors, Flex, Link } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const LayoutCollapsedMenus = styled(Box)`
  width: 80px;
  background-color: #f7fafc;
`;

export const TitleWrapper = styled(Center)`
  height: 92px;
  border-bottom: 1px solid #ebf0f6;
`;

export const List = styled(Flex)`
  flex-direction: column;
  align-items: center;
`;

export const MenuLink = styled(Link)`
  margin-top: 10px;
  border-radius: 4px;

  &:hover {
    background-color: ${({ colors }: { colors: Colors }) =>
      (colors.gray as Record<string, Partial<ColorHues>>)[100]};
  }

  &.active {
    background-color: #242e42;
    box-shadow: 0 20px 25px -5px rgb(113 128 150 / 10%),
      0 10px 10px -5px rgb(113 128 150 / 4%);
  }
`;

export const MenuIconWrapper = styled(Center)`
  width: 48px;
  height: 48px;
`;
