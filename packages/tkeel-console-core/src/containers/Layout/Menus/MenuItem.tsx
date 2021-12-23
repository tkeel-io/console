import React from 'react';
import { Flex } from '@chakra-ui/react';
import * as icons from '@tkeel/console-icons';

type Props = {
  active: boolean;
  name: string;
  leftIcon?: string;
  rightIcon?: React.ReactNode;
};

const defaultProps = {
  leftIcon: '',
  rightIcon: null,
};

function MenuItem({ active, name, leftIcon, rightIcon }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const Icon = leftIcon ? icons[leftIcon] : null;
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
        {Icon && (
          <Icon
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

MenuItem.defaultProps = defaultProps;

export default MenuItem;
