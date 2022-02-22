import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Flex, Image } from '@chakra-ui/react';
import { Menu } from '@tkeel/console-types';

import qingcloudLogoBlack from '@/tkeel-console-portal-base/assets/images/qingcloud-logo-black.svg';
import qingcloudLogoWhite from '@/tkeel-console-portal-base/assets/images/qingcloud-logo-white.svg';
import tKeelBlack from '@/tkeel-console-portal-base/assets/images/tkeel-black.svg';
// import { SearchInput } from '@tkeel/console-components';
// import { MagnifierTwoToneIcon } from '@tkeel/console-icons';
import tkeelLogo from '@/tkeel-console-portal-base/assets/images/tkeel-logo.svg';
import tKeelWhite from '@/tkeel-console-portal-base/assets/images/tkeel-white.svg';
import useMenusQuery from '@/tkeel-console-portal-base/hooks/queries/useMenusQuery';

import MenuLink from './MenuLink';
import SubMenuLink from './SubMenuLink';
import SubMenuTitle from './SubMenuTitle';

type Props = {
  // handleSearch: () => void;
  isQingCloudTheme: boolean;
  isDarkMenu: boolean;
};

function Menus({ isQingCloudTheme, isDarkMenu }: Props) {
  const location = useLocation();

  const [spreadMenuIds, setSpreadMenus] = useState<string[]>([]);

  const { menus } = useMenusQuery({
    onSuccess(data) {
      const entries = data?.data?.entries ?? [];
      entries.forEach((menu) => {
        const { id, children } = menu;
        const active: boolean = (children as Menu[]).some((item) => {
          return item.path && location.pathname.includes(item.path);
        });
        if (active) {
          setSpreadMenus([...spreadMenuIds, id]);
        }
      });
    },
  });

  const handleMenuClick = (id: string) => {
    if (spreadMenuIds.includes(id)) {
      setSpreadMenus(spreadMenuIds.filter((menuId) => menuId !== id));
    } else {
      setSpreadMenus([...spreadMenuIds, id]);
    }
  };

  return (
    <Flex
      flexDirection="column"
      position="relative"
      width="240px"
      height="100%"
    >
      <Flex alignItems="center" height="96px" paddingLeft="40px">
        {isQingCloudTheme ? (
          <Image
            width="150px"
            src={isDarkMenu ? qingcloudLogoWhite : qingcloudLogoBlack}
          />
        ) : (
          <>
            <Image htmlWidth="47px" src={tkeelLogo} alt="" />
            <Image
              marginLeft="8px"
              htmlWidth="93px"
              src={isDarkMenu ? tKeelWhite : tKeelBlack}
              alt=""
            />
          </>
        )}
      </Flex>
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
      <Box flex="1" overflow="auto" padding="20px">
        {menus.map((menu) => {
          const { id, name, icon, path, children } = menu;
          const hasChildren = children && children[0];
          const spread = spreadMenuIds.includes(id);
          return (
            <Box key={id} marginBottom="4px">
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
                  <Box
                    marginTop="10px"
                    padding="8px"
                    borderRadius="4px"
                    backgroundColor={isDarkMenu ? 'whiteAlpha.100' : 'gray.100'}
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
    </Flex>
  );
}

export default Menus;
