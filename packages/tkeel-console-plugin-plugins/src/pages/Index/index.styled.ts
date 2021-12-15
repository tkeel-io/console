/* eslint-disable import/prefer-default-export */
import { Box, Center, ColorHues, Colors, Flex, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

type InstallButtonProps = {
  installed: string;
};

export const Wrapper = styled(Flex)`
  flex-direction: column;
  height: 100%;
`;

export const Tabs = styled(Box)`
  width: 380px;
  height: 32px;
  border: 1px solid #c1c9d1;
  border-radius: 16px;
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

export const ListContent = styled(Flex)`
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin-top: 19px;
`;

export const Card = styled(Flex)`
  flex-direction: column;
  width: 24.4%;
  height: 126px;
  margin-bottom: 8px;
  padding: 12px;
  border: 1px solid #ebf0f6;
  border-radius: 4px;
`;

export const BaseInfo = styled(Flex)`
  align-items: center;
  justify-content: space-between;
`;

export const IconNameWrapper = styled(Flex)`
  align-items: center;
`;

export const Name = styled(Text)`
  color: ${({ colors }: { colors: Colors }) => colors.black};
  font-size: 14px;
`;

export const InstallButton = styled(Center)<InstallButtonProps>`
  width: 60px;
  height: 28px;
  color: ${({ installed }) => (installed === 'true' ? '#329dce' : '#f9fbfd')};
  font-size: 12px;
  background-color: ${({ installed }) =>
    installed === 'true' ? '#eff4f9' : '#329dce'};
  border-radius: 15px;
  cursor: ${({ installed }) => (installed === 'true' ? 'default' : 'pointer')};
`;

export const Desc = styled(Flex)`
  color: #79879c;
  font-size: 12px;
`;

export const CardBottom = styled(Flex)``;
