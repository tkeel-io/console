import { ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';
import * as icons from '@tkeel/console-icons';

import { isDarkMenuTheme } from '@/tkeel-console-portal-base/utils';

type Props = {
  active: boolean;
  name: string;
  leftIcon: string;
  rightIcon?: ReactNode;
};

function MenuItem({ active, name, leftIcon, rightIcon = null }: Props) {
  const isDarkTheme = isDarkMenuTheme();

  const icon = leftIcon || 'AppsAddFilledIcon';
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const Icon = icons[icon];
  const isTwoTone = icon.includes('TwoTone');
  let defaultColor = 'gray.700';
  if (isDarkTheme) {
    defaultColor = isTwoTone ? 'whiteAlpha.500' : 'whiteAlpha.800';
  }

  let defaultTwoToneColor = 'gray.300';
  if (isDarkTheme) {
    defaultTwoToneColor = isTwoTone ? 'whiteAlpha.800' : 'whiteAlpha.500';
  }
  const activeColor = isTwoTone ? 'gray.300' : 'white';
  const iconProps = isTwoTone
    ? {
        twoToneColor: active ? 'white' : defaultTwoToneColor,
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
            color={active ? activeColor : defaultColor}
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
