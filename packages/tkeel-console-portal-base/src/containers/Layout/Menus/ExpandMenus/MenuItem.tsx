import { ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';
import * as icons from '@tkeel/console-icons';

type Props = {
  active: boolean;
  name: string;
  leftIcon: string;
  rightIcon?: ReactNode;
};

function MenuItem({ active, name, leftIcon, rightIcon = null }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const Icon = icons[leftIcon || 'AppsAddFilledIcon'];

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

export default MenuItem;
