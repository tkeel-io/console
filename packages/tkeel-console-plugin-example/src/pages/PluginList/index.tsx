import React from 'react';

import {
  Book,
  Category,
  Content,
  List,
  ModuleName,
  PluginListWrapper,
  Toolbar,
  ToolbarLeft,
} from './index.styled';

import BookImg from '@/assets/images/book.png';

function PluginList() {
  return (
    <PluginListWrapper>
      <Toolbar>
        <ToolbarLeft>
          <ModuleName>插件管理</ModuleName>
          <Book src={BookImg} alt="" />
        </ToolbarLeft>
      </Toolbar>
      <Content>
        <Category>category</Category>
        <List>list</List>
      </Content>
    </PluginListWrapper>
  );
}

export default PluginList;
