import React, { ReactNode, useState } from 'react';
import {
  Link,
  Link as ReactRouterLink,
  useMatch,
  useResolvedPath,
} from 'react-router-dom';
import {
  Box as Menu,
  Box as MenusWrapper,
  Box as SubMenus,
  Colors,
  Image as Logo,
  useTheme,
} from '@chakra-ui/react';

// import { Button } from '@tkeel/console-components';
// import SearchInput from '@/components/SearchInput';
import SvgIcon from '@/components/SvgIcon';

import { IMenu, IMenuDetail } from '@/mock/types';

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

type Props = {
  data: IMenu[];
};

type CustomLinkProps = {
  as: typeof Link;
  className: string;
  to: string;
  colors: Colors;
};

type CustomMenuLinkProps = {
  to: string;
  children: ReactNode | string;
  colors: Colors;
};

type SubMenuProps = {
  subMenus: IMenuDetail[];
  colors: Colors;
};

function useCustomLinkProps({
  to,
  colors,
}: {
  to: string;
  colors: Colors;
}): CustomLinkProps {
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

function IconNameWrapper({ name, icon }: { name: string; icon: string }) {
  return (
    <IconName>
      <IconWrapper>
        <SvgIcon iconClass={icon} />
      </IconWrapper>
      {name}
    </IconName>
  );
}

function SubMenusWrapper({ subMenus, colors }: SubMenuProps) {
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

function Menus({ data }: Props) {
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
      {/* <SearchInput width="300px" />
      <Button>Button</Button> */}
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
              {menus.map(({ id, name, icon, path, children }) => {
                const spread = spreadMenuIds.includes(id);
                return (
                  <Menu key={id}>
                    {children ? (
                      <MenuItem onClick={() => handleMenuClick(id)}>
                        <IconNameWrapper name={name} icon={icon} />
                        <SvgIcon iconClass="down" />
                        {/* {spread ? <ChevronUpIcon /> : <ChevronDownIcon />} */}
                      </MenuItem>
                    ) : (
                      <CustomMenuLink to={path || ''} colors={colors}>
                        <MenuItem>
                          <IconNameWrapper name={name} icon={icon} />
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
