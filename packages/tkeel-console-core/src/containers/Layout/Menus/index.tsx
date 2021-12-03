import React from 'react';
import {
  Link as ReactRouterLink,
  LinkProps,
  useMatch,
  useResolvedPath,
} from 'react-router-dom';
import { Image as Logo } from '@chakra-ui/react';

import { Item, LayoutMenus, List, Title, TitleWrapper } from './index.styled';

import LogoImg from '@/assets/images/logo.png';

import { IMenu } from '@/mock/types';

type Props = {
  data: IMenu[];
};

function CustomLink({ children, to }: LinkProps) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: false });

  return (
    <Item as={ReactRouterLink} className={match ? 'active' : ''} to={to}>
      {children}
    </Item>
  );
}

function Menus({ data }: Props): JSX.Element {
  return (
    <LayoutMenus>
      <TitleWrapper>
        <Logo htmlWidth="27px" src={LogoImg} alt="" />
        <Title as="h1" fontSize="18px">
          tKeel 管理平台1
        </Title>
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
