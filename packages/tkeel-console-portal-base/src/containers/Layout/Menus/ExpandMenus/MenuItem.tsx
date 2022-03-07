import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

import MenuIcon from './MenuIcon';

type Props = {
  active: boolean;
  name: string;
  leftIcon: string;
  rightIcon?: ReactNode;
  isMenuLink?: boolean;
};

function MenuItem({
  active,
  name,
  leftIcon,
  rightIcon = null,
  isMenuLink = false,
}: Props) {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      height="40px"
      paddingLeft="22px"
      fontWeight="500"
      cursor="pointer"
      userSelect="none"
    >
      <Flex alignItems="center">
        <MenuIcon
          icon={leftIcon}
          active={active}
          style={{ marginRight: '10px' }}
          isMenuLink={isMenuLink}
        />
        {name}
      </Flex>
      {rightIcon}
    </Flex>
  );
}

export default MenuItem;
