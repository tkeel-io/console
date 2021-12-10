import React from 'react';
import { Colors, useTheme } from '@chakra-ui/react';
import { PageHeader, SearchInput } from '@tkeel/console-components';

import {
  Category,
  Content,
  Item,
  ListTitle,
  Num,
  PluginNum,
  Wrapper,
} from './index.styled';

function Index(): JSX.Element {
  const { colors }: { colors: Colors } = useTheme();

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
    <Wrapper>
      <PageHeader name="插件管理" desc="一段描述文字" />
      <Content colors={colors}>
        <ListTitle>
          <PluginNum>
            {pluginNum.map((item) => (
              <Item key={item.name}>
                <Category colors={colors}>{item.name}</Category>
                <Num colors={colors}>{item.num}</Num>
              </Item>
            ))}
          </PluginNum>
          <SearchInput />
        </ListTitle>
      </Content>
    </Wrapper>
  );
}

export default Index;
