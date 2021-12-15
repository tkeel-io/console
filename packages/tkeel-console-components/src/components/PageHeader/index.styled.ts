import { Box, ColorHues, Colors, Flex, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

const getGrayColor = ({ colors }: { colors: Colors }) =>
  (colors.gray as Record<string, Partial<ColorHues>>)[700];

export const Wrapper = styled(Flex)`
  padding: 20px 24px;
  width: 100%;
  height: 100px;
  border-radius: 4px;
  background-color: ${({ colors }: { colors: Colors }) => colors.white};
  box-shadow: 0px 10px 15px -3px rgba(113, 128, 150, 0.1),
    0px 4px 6px -2px rgba(113, 128, 150, 0.05);
`;

export const IconWrapper = styled(Box)`
  width: 60px;
  height: 60px;
  background-color: #eff4f9;
`;

export const TitleWrapper = styled(Flex)`
  margin-left: 20px;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled(Text)`
  font-size: 14px;
  color: ${getGrayColor};
  font-weight: bold;
`;

export const Desc = styled(Text)`
  margin-top: 5px;
  font-size: 12px;
  color: ${getGrayColor};
`;
