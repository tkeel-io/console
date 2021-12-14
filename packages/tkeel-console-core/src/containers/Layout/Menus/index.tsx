import React, { useState } from 'react';
import {
  Link as ReactRouterLink,
  useLocation,
  useMatch,
  useResolvedPath,
} from 'react-router-dom';
import { Colors, useTheme } from '@chakra-ui/react';
import {
  Box as Menu,
  Box as MenusWrapper,
  Box as SubMenus,
  Image as Logo,
} from '@tkeel/console-components';

import SvgIcon from '@/components/SvgIcon';

import {
  CategoryName,
  IconName,
  IconWrapper,
  List,
  MenuItem,
  MenuLink,
  SubMenuLink,
  SubMenuTitle,
  Title,
  TitleWrapper,
  Wrapper,
} from './index.styled';
import {
  CustomLinkReturnType,
  CustomMenuLinkProps,
  IconNameProps,
  Props,
  SubMenuProps,
} from './types';

import LogoImg from '@/assets/images/logo.png';

import { IMenuDetail } from '@/mock/types';

function useActive(to: string): boolean {
  const resolved = useResolvedPath(to);
  const active = useMatch({ path: resolved.pathname, end: false });
  return !!active;
}

function useCustomLinkProps(to: string): CustomLinkReturnType {
  const active = useActive(to);
  return {
    as: ReactRouterLink,
    className: active ? 'active' : '',
    to,
  };
}

function IconNameWrapper({ name, icon }: IconNameProps) {
  return (
    <IconName>
      <IconWrapper>
        <SvgIcon iconClass={icon} />
      </IconWrapper>
      {name}
    </IconName>
  );
}

function SubMenuTitleWrapper({
  id,
  name,
  icon,
  children,
  handleMenuClick,
}: IMenuDetail & { handleMenuClick: (id: string) => void }) {
  const location = useLocation();
  const active: boolean = (children as IMenuDetail[]).some((item) => {
    return item.path && location.pathname.includes(item.path);
  });

  return (
    <SubMenuTitle
      active={active.toString()}
      onClick={() => handleMenuClick(id)}
    >
      <MenuItem>
        <IconNameWrapper name={name} icon={icon} />
        <SvgIcon iconClass="down" />
        {/* {spread ? <ChevronUpIcon /> : <ChevronDownIcon />} */}
      </MenuItem>
    </SubMenuTitle>
  );
}

function CustomMenuLink({ to, children }: CustomMenuLinkProps) {
  const props = useCustomLinkProps(to);
  return (
    <MenuLink _hover={{ backgroundColor: 'gray.100' }} {...props}>
      {children}
    </MenuLink>
  );
}

function CustomSubMenuLink({ to, children }: CustomMenuLinkProps) {
  const props = useCustomLinkProps(to);
  return (
    <SubMenuLink _active={{ backgroundColor: 'blue.400' }} {...props}>
      {children}
    </SubMenuLink>
  );
}

function SubMenusWrapper({ subMenus }: SubMenuProps) {
  return (
    <SubMenus>
      {subMenus.map((subMenu) => (
        <CustomSubMenuLink key={subMenu.id} to={subMenu.path || ''}>
          {subMenu.name}
        </CustomSubMenuLink>
      ))}
    </SubMenus>
  );
}

function Menus({ data }: Props) {
  const [spreadMenuIds, setSpreadMenus] = useState<string[]>([]);

  const handleMenuClick = (id: string) => {
    if (spreadMenuIds.includes(id)) {
      setSpreadMenus(spreadMenuIds.filter((menuId) => menuId !== id));
    } else {
      setSpreadMenus([...spreadMenuIds, id]);
    }
  };

  return (
    <Wrapper>
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
              {menus.map((menu) => {
                const { id, name, icon, path, children } = menu;
                const spread = spreadMenuIds.includes(id);

                return (
                  <Menu key={id}>
                    {children ? (
                      <SubMenuTitleWrapper
                        {...menu}
                        handleMenuClick={handleMenuClick}
                      />
                    ) : (
                      <CustomMenuLink to={path || ''}>
                        <MenuItem>
                          <IconNameWrapper name={name} icon={icon} />
                        </MenuItem>
                      </CustomMenuLink>
                    )}
                    {children && spread && (
                      <SubMenusWrapper subMenus={children} />
                    )}
                  </Menu>
                );
              })}
            </MenusWrapper>
          );
        })}
      </List>
    </Wrapper>
  );
}

export default Menus;
