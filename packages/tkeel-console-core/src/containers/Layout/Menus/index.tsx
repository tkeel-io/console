import React from 'react';
import {
  Link as ReactRouterLink,
  LinkProps,
  useMatch,
  useResolvedPath,
} from 'react-router-dom';
import {
  Box as SubMenusWrapper,
  Colors,
  Image as Logo,
  Text,
  useTheme,
} from '@chakra-ui/react';

import {
  IconWrapper,
  Item,
  LayoutMenus,
  List,
  Title,
  TitleWrapper,
} from './index.styled';

import LogoImg from '@/assets/images/logo.png';

import { IMenu } from '@/mock/types';

type Props = {
  data: IMenu[];
};

type IColors = {
  colors: Colors;
};
function CustomLink({ children, to, colors }: LinkProps & IColors) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: false });

  return (
    <Item
      as={ReactRouterLink}
      className={match ? 'active' : ''}
      to={to}
      colors={colors}
    >
      {children}
    </Item>
  );
}

function Menus({ data }: Props): JSX.Element {
  const { colors }: IColors = useTheme();

  return (
    <LayoutMenus>
      <TitleWrapper>
        <Logo htmlWidth="27px" src={LogoImg} alt="" />
        <Title as="h1" fontSize="18px">
          tKeel 管理平台
        </Title>
      </TitleWrapper>
      <List>
        {data.map(({ categoryId, categoryName, subMenus }) => {
          return (
            <SubMenusWrapper key={categoryId}>
              {categoryId !== 'default' && (
                <Text fontSize="12px" color="gray.400">
                  {categoryName}
                </Text>
              )}
              {subMenus.map(({ id, name, path }) => (
                <CustomLink key={id} to={path} colors={colors}>
                  <IconWrapper>icon</IconWrapper>
                  {name}
                </CustomLink>
              ))}
            </SubMenusWrapper>
          );
        })}
      </List>
    </LayoutMenus>
  );
}

export default Menus;
