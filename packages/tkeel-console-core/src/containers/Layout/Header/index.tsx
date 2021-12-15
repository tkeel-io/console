import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Image as Avatar,
} from '@chakra-ui/react';

import SvgIcon from '@/components/SvgIcon';
import { getTotalMenus } from '@/utils/qiankun';

import {
  IconWrapper,
  UserName,
  UserNameWrapper,
  Wrapper,
} from './index.styled';

import DefaultAvatar from '@/assets/images/default-avatar.png';

import { IMenu } from '@/mock/types';

function Header({ menus }: { menus: IMenu[] }) {
  const { pathname } = useLocation();
  const totalMenus = getTotalMenus(menus);
  let name = '';
  totalMenus.forEach((menu) => {
    if (pathname.includes(menu.path)) {
      name = menu.name;
    }
  });

  return (
    <Wrapper>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">{name}</BreadcrumbLink>
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
    </Wrapper>
  );
}

export default Header;
