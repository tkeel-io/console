import React from 'react';
import { Box, Center } from '@chakra-ui/react';
import * as icons from '@tkeel/console-icons';

type Props = {
  icon: string;
  active: boolean;
};

function MenuItem({ icon, active }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const Icon = icons[icon || 'AppsAddFilledIcon'];

  return (
    <Box
      borderRadius="4px"
      backgroundColor={active ? 'gray.800' : 'inherit'}
      boxShadow={
        active
          ? '0 20px 25px -5px rgb(113 128 150 / 10%), 0 10px 10px -5px rgb(113 128 150 / 4%)'
          : 'none'
      }
      _hover={{ backgroundColor: active ? 'gray.800' : 'gray.100' }}
      cursor="pointer"
    >
      <Center width="48px" height="48px">
        <Icon mode={active ? 'dark' : 'light'} />
      </Center>
    </Box>
  );
}

export default MenuItem;
