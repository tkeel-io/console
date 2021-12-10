/* eslint-disable import/prefer-default-export */
import { ColorHues, Colors } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Box, Flex, Text } from '@tkeel/console-components';

export const Wrapper = styled(Flex)`
  flex-direction: column;
  height: 100%;
`;

export const Content = styled(Box)`
  flex: 1;
  margin-top: 20px;
  padding: 17px 24px 24px;
  background: ${({ colors }: { colors: Colors }) => colors.white};
  border-radius: 4px; ;
`;

export const ListTitle = styled(Flex)`
  align-items: center;
  justify-content: space-between;
`;

export const PluginNum = styled(Flex)`
  align-items: center;
`;

export const Item = styled(Flex)`
  align-items: center;
  margin-right: 5px;
`;

export const Category = styled(Text)`
  color: ${({ colors }: { colors: Colors }) =>
    (colors.gray as Record<string, Partial<ColorHues>>)[700]};
  font-weight: 500;
  font-size: 12px;
`;

export const Num = styled(Text)`
  margin-left: 2px;
  color: ${({ colors }: { colors: Colors }) =>
    (colors.gray as Record<string, Partial<ColorHues>>)[500]};
  font-weight: 500;
  font-size: 12px;
`;
