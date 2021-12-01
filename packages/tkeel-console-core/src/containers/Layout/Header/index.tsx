import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';

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
        <img src={DefaultAvatar} alt="avatar" />
        <Username>Admin</Username>
      </UserInfo>
    </LayoutHeader>
  );
}

export default Header;
