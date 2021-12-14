import styled from '@emotion/styled';
import { Box, Center, Flex, Text } from '@tkeel/console-components';

type InstallButtonProps = {
  installed: string;
};

export const Tabs = styled(Box)`
  width: 380px;
  height: 32px;
  background: #f9fbfd;
  border: 1px solid #c1c9d1;
  border-radius: 16px;
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
  font-weight: 500;
  font-size: 12px;
`;

export const Num = styled(Text)`
  margin-left: 2px;
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
  border-style: solid;
  border-width: 1px;
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
  font-size: 12px;
`;

export const CardBottom = styled(Flex)``;
