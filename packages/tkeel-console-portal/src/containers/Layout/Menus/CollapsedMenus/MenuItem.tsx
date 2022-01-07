import React from 'react';
import { Box, Center } from '@chakra-ui/react';
import * as icons from '@tkeel/console-icons';

type Props = {
  icon: string;
  iconSize?: number | string;
  active: boolean;
};

const defaultProps = {
  iconSize: 16,
};

function MenuItem({ icon, iconSize, active }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const Icon = icons[icon || 'AppsAddFilledIcon'];

  return (
    <Box
      borderRadius="4px"
      backgroundColor={active ? 'tKeel' : 'inherit'}
      _hover={{ backgroundColor: active ? 'tKeel' : 'gray.100' }}
      cursor="pointer"
    >
      <Center width="44px" height="44px">
        <Icon mode={active ? 'dark' : 'light'} size={iconSize} />
      </Center>
    </Box>
  );
}

MenuItem.defaultProps = defaultProps;

export default MenuItem;
