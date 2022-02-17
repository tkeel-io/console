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
  const icon = leftIcon || 'AppsAddFilledIcon';
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const Icon = icons[icon];
  const isTwoTone = icon.includes('TwoTone');
  const activeColor = isTwoTone ? 'gray.300' : 'white';
  const iconProps = isTwoTone
    ? {
        twoToneColor: active ? 'white' : 'gray.300',
      }
    : {};

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
        {Icon && (
          <Icon
            color={active ? activeColor : 'gray.700'}
            style={{ marginRight: '10px' }}
            {...iconProps}
          />
        )}
        {name}
      </Flex>
      {rightIcon}
    </Flex>
  );
}

export default MenuItem;
