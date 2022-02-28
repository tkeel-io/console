import { Box, Center } from '@chakra-ui/react';

import { useColor } from '@tkeel/console-hooks';

import MenuIcon from '@/tkeel-console-portal-base/containers/Layout/Menus/ExpandMenus/MenuIcon';

type Props = {
  icon: string;
  active: boolean;
  isMenuLink?: boolean;
};

function MenuItem({ icon, active, isMenuLink = false }: Props) {
  const primaryColor = useColor('primary');

  let backgroundColor = 'transparent';
  if (isMenuLink) {
    backgroundColor = active ? 'primary' : 'inherit';
  }

  return (
    <Box
      borderRadius="4px"
      backgroundColor={backgroundColor}
      _hover={
        active
          ? {}
          : {
              svg: {
                fill: `${primaryColor} !important`,
              },
            }
      }
      cursor="pointer"
    >
      <Center width="44px" height="44px">
        <MenuIcon icon={icon} active={active} isMenuLink={isMenuLink} />
      </Center>
    </Box>
  );
}

export default MenuItem;
