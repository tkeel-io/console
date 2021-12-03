import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Image as Avatar,
} from '@chakra-ui/react';

import { LayoutHeader, UserInfo, Username } from './index.styled';

import DefaultAvatar from '@/assets/images/default-avatar.png';

function Header(): JSX.Element {
  return (
    <LayoutHeader>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">插件管理</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <UserInfo>
        <Avatar width="16px" src={DefaultAvatar} alt="avatar" />
        <Username>Admin</Username>
      </UserInfo>
    </LayoutHeader>
  );
}

export default Header;
