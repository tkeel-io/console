import { CSSProperties } from 'react';

import * as icons from '@tkeel/console-icons';

import { isDarkMenuTheme } from '@/tkeel-console-portal-base/utils';

type Props = {
  icon: string;
  active: boolean;
  style?: CSSProperties;
};

function MenuIcon({ icon, active, style = {} }: Props) {
  const iconName = icon || 'AppsAddFilledIcon';
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const Icon = icons[iconName];
  const isTwoTone = iconName.includes('TwoTone');

  const isDarkMenu = isDarkMenuTheme();

  let defaultColor = 'gray.700';
  let defaultTwoToneColor = 'gray.300';
  let activeColor = 'gray.700';
  let twoToneColor = 'gray.300';

  if (isDarkMenu) {
    defaultColor = isTwoTone ? 'whiteAlpha.500' : 'whiteAlpha.800';
    defaultTwoToneColor = isTwoTone ? 'whiteAlpha.800' : 'whiteAlpha.500';
    activeColor = isTwoTone ? 'whiteAlpha.700' : 'white';
    twoToneColor = active ? 'white' : defaultTwoToneColor;
  }

  const iconProps = isTwoTone
    ? {
        twoToneColor,
      }
    : {};

  if (!Icon) return null;

  return (
    <Icon
      color={active ? activeColor : defaultColor}
      size={16}
      style={style}
      {...iconProps}
    />
  );
}

export default MenuIcon;
