import { useState } from 'react';
import { Box, Flex, Image } from '@chakra-ui/react';
import { SearchInput } from '@tkeel/console-components';
import { MagnifierTwoToneIcon } from '@tkeel/console-icons';

import Logo from '@/tkeel-console-portal-base/assets/images/logo.svg';
import tKeelBlack from '@/tkeel-console-portal-base/assets/images/tkeel-black.svg';
import tKeelWhite from '@/tkeel-console-portal-base/assets/images/tkeel-white.svg';
import useMenusQuery from '@/tkeel-console-portal-base/hooks/queries/useMenusQuery';

import MenuLink from './MenuLink';
import SubMenuLink from './SubMenuLink';
import SubMenuTitle from './SubMenuTitle';

type Props = {
  handleSearch: () => void;
  isDarkTheme: boolean;
};

function Menus({ handleSearch, isDarkTheme }: Props) {
  const { menus } = useMenusQuery();
  const [spreadMenuIds, setSpreadMenus] = useState<string[]>([]);

  const handleMenuClick = (id: string) => {
    if (spreadMenuIds.includes(id)) {
      setSpreadMenus(spreadMenuIds.filter((menuId) => menuId !== id));
    } else {
      setSpreadMenus([...spreadMenuIds, id]);
    }
  };

  return (
    <Box position="relative" width="240px" height="100%">
      <Flex alignItems="center" height="96px" paddingLeft="40px">
        <Image htmlWidth="47px" src={Logo} alt="" />
        <Image
          marginLeft="8px"
          htmlWidth="93px"
          src={isDarkTheme ? tKeelWhite : tKeelBlack}
          alt=""
        />
      </Flex>
      <SearchInput
        width="200px"
        height="44px"
        inputGroupStyle={{ marginLeft: '20px' }}
        inputStyle={{
          border: 'none',
          borderRadius: '4px',
          backgroundColor: isDarkTheme ? 'whiteAlpha.50' : 'gray.100',
        }}
        icon={<MagnifierTwoToneIcon color={isDarkTheme ? 'white' : ''} />}
        iconSize={20}
        placeholder="搜索"
        onSearch={handleSearch}
      />
      <Box padding="20px">
        {menus.map((menu) => {
          const { id, name, icon, path, children } = menu;
          const spread = spreadMenuIds.includes(id);
          return (
            <Box key={id}>
              <Box key={id}>
                {children ? (
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
                {children && spread && (
                  <Box
                    marginTop="10px"
                    borderRadius="4px"
                    backgroundColor={
                      isDarkTheme ? 'whiteAlpha.100' : 'gray.100'
                    }
                  >
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
        })}
      </Box>
    </Box>
  );
}

export default Menus;
