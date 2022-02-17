import { Box, Center } from '@chakra-ui/react';

import MenuIcon from '@/tkeel-console-portal-base/containers/Layout/Menus/ExpandMenus/MenuIcon';

type Props = {
  icon: string;
  active: boolean;
};

function MenuItem({ icon, active }: Props) {
  return (
    <Box
      borderRadius="4px"
      backgroundColor={active ? 'primary' : 'inherit'}
      _hover={{ backgroundColor: 'primary' }}
      cursor="pointer"
    >
      <Center width="44px" height="44px">
        <MenuIcon icon={icon} active={active} />
      </Center>
    </Box>
  );
}

export default MenuItem;
