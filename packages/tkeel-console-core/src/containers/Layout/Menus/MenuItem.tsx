import React, { ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';
import { AppsAddFilledIcon } from '@tkeel/console-icons';

type Props = {
  active: boolean;
  name: string;
  icon: string;
  rightIcon?: ReactNode;
};

function MenuItem({ active, name, icon, rightIcon }: Props) {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      height="44px"
      paddingLeft="22px"
      fontWeight={500}
      cursor="pointer"
    >
      <Flex alignItems="center">
        {icon && (
          <AppsAddFilledIcon
            mode={active ? 'dark' : 'light'}
            style={{ marginRight: '10px' }}
          />
        )}
        {name}
      </Flex>
      {rightIcon}
    </Flex>
  );
}

MenuItem.defaultProps = {
  rightIcon: null,
};

export default MenuItem;
