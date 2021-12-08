import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Image as Avatar,
} from '@chakra-ui/react';

import SvgIcon from '@/components/SvgIcon';

import {
  IconWrapper,
  LayoutHeader,
  UserName,
  UserNameWrapper,
} from './index.styled';

import DefaultAvatar from '@/assets/images/default-avatar.png';

function Header() {
  return (
    <LayoutHeader>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">插件管理</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <IconWrapper>
        <UserNameWrapper>
          <Avatar width="16px" src={DefaultAvatar} alt="avatar" />
          <UserName>Admin</UserName>
        </UserNameWrapper>
        <SvgIcon iconClass="setting" />
        <SvgIcon iconClass="bell" />
      </IconWrapper>
    </LayoutHeader>
  );
}

export default Header;
