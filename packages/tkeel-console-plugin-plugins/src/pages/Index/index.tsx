import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { PageHeader, SearchInput } from '@tkeel/console-components';

import {
  BaseInfo,
  Card,
  CardBottom,
  Category,
  Desc,
  IconNameWrapper,
  InstallButton,
  Item,
  ListContent,
  Name,
  Num,
  PluginNum,
} from './index.styled';

function Index(): JSX.Element {
  const pluginNum = [
    {
      name: '插件数量',
      num: 50,
    },
    {
      name: '已启用',
      num: 30,
    },
    {
      name: '未启用',
      num: 20,
    },
  ];

  return (
    <Flex flexDir="column" height="100%">
      <PageHeader name="插件管理" desc="一段描述文字" />
      <Box
        width="380px"
        height="32px"
        backgroundColor="#f9fbfd"
        border="1px solid #c1c9d1"
        rounded="16px"
      />
      <Box
        mt="20px"
        flex={1}
        padding="17px 24px 24px"
        rounded={4}
        backgroundColor="white"
      >
        <Flex alignItems="center" justifyContent="space-between">
          <PluginNum>
            {pluginNum.map((item) => (
              <Item key={item.name}>
                <Category color="gray.700">{item.name}</Category>
                <Num color="gray.500">{item.num}</Num>
              </Item>
            ))}
          </PluginNum>
          <SearchInput />
        </Flex>
        <ListContent>
          <Card backgroundColor="white" borderColor="gray.200">
            <BaseInfo>
              <IconNameWrapper>
                <Name color="black">device</Name>
              </IconNameWrapper>
              <InstallButton installed="true">已安装</InstallButton>
            </BaseInfo>
            <Desc color="gray.500">安装用于管理设备的插件</Desc>
            <CardBottom />
          </Card>
        </ListContent>
      </Box>
    </Flex>
  );
}

export default Index;
