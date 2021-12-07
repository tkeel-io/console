import React, { ReactNode, useState } from 'react';
import {
  Link,
  Link as ReactRouterLink,
  useMatch,
  useResolvedPath,
} from 'react-router-dom';
import { ChevronDownIcon, ChevronUpIcon, SettingsIcon } from '@chakra-ui/icons';
import {
  Box as Menu,
  Box as MenusWrapper,
  Box as SubMenus,
  Colors,
  Image as Logo,
  useTheme,
} from '@chakra-ui/react';

import {
  CategoryName,
  IconName,
  IconWrapper,
  LayoutMenus,
  List,
  MenuItem,
  MenuLink,
  SubMenuLink,
  Title,
  TitleWrapper,
} from './index.styled';

import LogoImg from '@/assets/images/logo.png';

import { IMenu, IMenuDetail } from '@/mock/types';

type Props = {
  data: IMenu[];
};

type CustomMenuLinkProps = {
  to: string;
  children: ReactNode | string;
  colors: Colors;
};

function useCustomLinkProps({ to, colors }: { to: string; colors: Colors }): {
  as: typeof Link;
  className: string;
  to: string;
  colors: Colors;
} {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: false });
  return {
    as: ReactRouterLink,
    className: match ? 'active' : '',
    to,
    colors,
  };
}

function CustomMenuLink({ to, children, colors }: CustomMenuLinkProps) {
  const props = useCustomLinkProps({ to, colors });
  return <MenuLink {...props}>{children}</MenuLink>;
}

function CustomSubMenuLink({ to, children, colors }: CustomMenuLinkProps) {
  const props = useCustomLinkProps({ to, colors });
  return <SubMenuLink {...props}>{children}</SubMenuLink>;
}

function IconNameWrapper({ name }: { name: string }) {
  return (
    <IconName>
      <IconWrapper>
        <SettingsIcon />
      </IconWrapper>
      {name}
    </IconName>
  );
}

function SubMenusWrapper({
  subMenus,
  colors,
}: {
  subMenus: IMenuDetail[];
  colors: Colors;
}) {
  return (
    <SubMenus>
      {subMenus.map((subMenu) => (
        <CustomSubMenuLink
          key={subMenu.id}
          to={subMenu.path || ''}
          colors={colors}
        >
          {subMenu.name}
        </CustomSubMenuLink>
      ))}
    </SubMenus>
  );
}

function Menus({ data }: Props): JSX.Element {
  const [spreadMenuIds, setSpreadMenus] = useState<string[]>([]);
  const { colors }: { colors: Colors } = useTheme();

  const handleMenuClick = (id: string) => {
    if (spreadMenuIds.includes(id)) {
      setSpreadMenus(spreadMenuIds.filter((menuId) => menuId !== id));
    } else {
      setSpreadMenus([...spreadMenuIds, id]);
    }
  };

  return (
    <LayoutMenus>
      <TitleWrapper>
        <Logo htmlWidth="27px" src={LogoImg} alt="" />
        <Title as="h1" fontSize="18px">
          tKeel 管理平台
        </Title>
      </TitleWrapper>
      <List>
        {data.map(({ categoryId, categoryName, menus }) => {
          return (
            <MenusWrapper key={categoryId}>
              {categoryId !== 'default' && (
                <CategoryName fontSize="12px" color="gray.400">
                  {categoryName}
                </CategoryName>
              )}
              {menus.map(({ id, name, path, children }) => {
                const spread = spreadMenuIds.includes(id);
                return (
                  <Menu key={id}>
                    {children ? (
                      <MenuItem onClick={() => handleMenuClick(id)}>
                        <IconNameWrapper name={name} />
                        {spread ? <ChevronUpIcon /> : <ChevronDownIcon />}
                      </MenuItem>
                    ) : (
                      <CustomMenuLink to={path || ''} colors={colors}>
                        <MenuItem>
                          <IconNameWrapper name={name} />
                        </MenuItem>
                      </CustomMenuLink>
                    )}
                    {children && spread && (
                      <SubMenusWrapper subMenus={children} colors={colors} />
                    )}
                  </Menu>
                );
              })}
            </MenusWrapper>
          );
        })}
      </List>
    </LayoutMenus>
  );
}

export default Menus;
