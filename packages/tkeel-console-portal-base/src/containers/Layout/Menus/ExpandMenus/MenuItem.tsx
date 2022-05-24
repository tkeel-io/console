import { Flex, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import MenuIcon from './MenuIcon';

type Props = {
  active: boolean;
  menuIconActive?: boolean;
  name: string;
  leftIcon: string;
  rightIcon?: ReactNode;
};

function MenuItem({
  active,
  menuIconActive,
  name,
  leftIcon,
  rightIcon = null,
}: Props) {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      height="36px"
      paddingLeft="34px"
      fontWeight={active ? '600' : 'normal'}
      cursor="pointer"
      userSelect="none"
    >
      <Flex alignItems="center">
        <MenuIcon
          icon={leftIcon}
          active={menuIconActive ?? active}
          style={{ marginRight: '10px' }}
        />
        <Text className="menu-name">{name}</Text>
      </Flex>
      {rightIcon}
    </Flex>
  );
}

export default MenuItem;
