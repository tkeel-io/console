import React from 'react';
import {
  Link as ReactRouterLink,
  useMatch,
  useResolvedPath,
} from 'react-router-dom';
import { Image as Logo } from '@chakra-ui/react';

import SvgIcon from '@/components/SvgIcon';
import { CustomMenuLinkProps, Props } from '@/containers/Layout/Menus/types';
import { getTotalMenus } from '@/utils/qiankun';
import { IMenuInfo } from '@/utils/qiankun/types';

import {
  Wrapper,
  List,
  MenuIconWrapper,
  MenuLink,
  TitleWrapper,
} from './index.styled';

import LogoImg from '@/assets/images/logo.png';

function CustomMenuLink({ to, children }: CustomMenuLinkProps) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: false });
  return (
    <MenuLink
      _hover={{ backgroundColor: 'gray.100' }}
      as={ReactRouterLink}
      className={match ? 'active' : ''}
      to={to}
    >
      {children}
    </MenuLink>
  );
}

function CollapsedMenus({ data }: Props) {
  const menus: IMenuInfo[] = getTotalMenus(data);

  return (
    <Wrapper>
      <TitleWrapper>
        <Logo htmlWidth="27px" src={LogoImg} alt="" />
      </TitleWrapper>
      <List>
        {menus.map(({ id, icon, path }) => (
          <CustomMenuLink key={id} to={path}>
            <MenuIconWrapper key={id}>
              <SvgIcon iconClass={icon} />
            </MenuIconWrapper>
          </CustomMenuLink>
        ))}
      </List>
    </Wrapper>
  );
}

export default CollapsedMenus;
