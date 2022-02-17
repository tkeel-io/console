import { ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';

import MenuIcon from './MenuIcon';

type Props = {
  active: boolean;
  name: string;
  leftIcon: string;
  rightIcon?: ReactNode;
};

function MenuItem({ active, name, leftIcon, rightIcon = null }: Props) {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      height="44px"
      paddingLeft="22px"
      fontWeight={500}
      cursor="pointer"
      userSelect="none"
    >
      <Flex alignItems="center">
        <MenuIcon
          icon={leftIcon}
          active={active}
          style={{ marginRight: '10px' }}
        />
        {name}
      </Flex>
      {rightIcon}
    </Flex>
  );
}

export default MenuItem;
