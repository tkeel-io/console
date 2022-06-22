import { Box } from '@chakra-ui/react';

import { Menu } from '@tkeel/console-types';

import { isDarkMenuTheme } from '@/tkeel-console-portal-base/utils';

import SubMenuLink from './SubMenuLink';

type Props = {
  data: Menu[];
};

function SubMenuLinks({ data }: Props) {
  const isDarkMenu = isDarkMenuTheme();
  return (
    <Box
      position="absolute"
      left="56px"
      top="0"
      padding="8px"
      width="144px"
      borderRadius="4px"
      border="1px solid"
      borderColor={isDarkMenu ? 'none' : 'gray.300'}
      backgroundColor={isDarkMenu ? 'gray.800' : 'white'}
      boxShadow="0px 10px 15px rgba(113, 128, 150, 0.1), 0px 4px 6px rgba(113, 128, 150, 0.2)"
    >
      {data.map((menu) => (
        <SubMenuLink
          key={menu.id}
          path={menu.path as string}
          name={menu.name}
          isDarkMenu={isDarkMenu}
        />
      ))}
    </Box>
  );
}

export default SubMenuLinks;
