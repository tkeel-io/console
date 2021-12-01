import React from 'react';
import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom';

import { LayoutMenus, List, Title, TitleWrapper } from './index.styled';

import Logo from '@/assets/images/logo.png';

import { IMenu } from '@/mock/types';

type Props = {
  data: IMenu[];
};

function CustomLink({ children, to }: LinkProps) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link className={match ? 'active' : ''} to={to}>
      {children}
    </Link>
  );
}

function Menus({ data }: Props): JSX.Element {
  return (
    <LayoutMenus>
      <TitleWrapper>
        <img src={Logo} alt="" />
        <Title>tKeel 管理平台</Title>
      </TitleWrapper>
      <List>
        {data.map(({ id, name, path }) => (
          <CustomLink key={id} to={path}>
            {name}
          </CustomLink>
        ))}
      </List>
    </LayoutMenus>
  );
}

export default Menus;
