import { Box, Center, Flex, Image } from '@chakra-ui/react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Logo, Menu } from '@tkeel/console-types';

import emptyMenu from '@/tkeel-console-portal-base/assets/images/empty-menu.svg';
import logoBottomLineImg from '@/tkeel-console-portal-base/assets/images/logo-bottom-line.svg';
// import { SearchInput } from '@tkeel/console-components';
// import { MagnifierTwoToneIcon } from '@tkeel/console-icons';
import useMenusQuery from '@/tkeel-console-portal-base/hooks/queries/useMenusQuery';

import MenuLink from './MenuLink';
import SubMenuLink from './SubMenuLink';
import SubMenuTitle from './SubMenuTitle';

type Props = {
  // handleSearch: () => void;
  isDarkMenu: boolean;
  logo: Logo;
};

export default function ExpandMenus({ isDarkMenu, logo }: Props) {
  const location = useLocation();

  const [spreadMenuId, setSpreadMenuId] = useState('');

  const { menus, isLoading } = useMenusQuery({
    onSuccess(data) {
      const entries = data?.data?.entries ?? [];
      entries.forEach((menu) => {
        const { id, children } = menu;
        const active: boolean = (children as Menu[]).some((item) => {
          return item.path && location.pathname.includes(item.path);
        });
        if (active) {
          setSpreadMenuId(id);
        }
      });
    },
  });

  const handleMenuClick = (id: string) => {
    setSpreadMenuId(spreadMenuId === id ? '' : id);
  };

  return (
    <Flex
      flexDirection="column"
      position="relative"
      width="240px"
      height="100%"
    >
      <Flex paddingTop="17px" height="80px" paddingLeft="20px">
        {isDarkMenu ? logo.typeLight : logo.typeDark}
      </Flex>
      <Image src={logoBottomLineImg} marginLeft="20px" width="200px" />
      {/* <SearchInput
        width="200px"
        height="44px"
        inputGroupStyle={{ marginLeft: '20px' }}
        inputStyle={{
          border: 'none',
          borderRadius: '4px',
          backgroundColor: isDarkMenu ? 'whiteAlpha.50' : 'gray.100',
        }}
        icon={<MagnifierTwoToneIcon color={isDarkMenu ? 'white' : ''} />}
        iconSize={20}
        placeholder="搜索"
        onSearch={handleSearch}
      /> */}
      <Box marginTop="20px" flex="1" overflow="auto">
        {(() => {
          if (menus.length > 0) {
            return menus.map((menu) => {
              const { id, name, icon, path, children } = menu;
              const hasChildren = children && children[0];
              const spread = spreadMenuId === id;
              return (
                <Box key={id} marginBottom="8px">
                  <Box key={id}>
                    {hasChildren ? (
                      <SubMenuTitle
                        {...menu}
                        spread={spread}
                        handleMenuClick={handleMenuClick}
                      />
                    ) : (
                      <MenuLink
                        path={path as string}
                        name={name}
                        icon={icon as string}
                      />
                    )}
                    {hasChildren && spread && (
                      <Box marginTop="4px" borderRadius="4px">
                        {children.map((subMenu) => (
                          <SubMenuLink
                            key={subMenu.id}
                            name={subMenu.name}
                            path={subMenu.path as string}
                          />
                        ))}
                      </Box>
                    )}
                  </Box>
                </Box>
              );
            });
          }

          if (isLoading) {
            return null;
          }

          return (
            <Center height="100%">
              <Image src={emptyMenu} width="104px" />
            </Center>
          );
        })()}
      </Box>
    </Flex>
  );
}
