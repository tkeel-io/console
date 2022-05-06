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
  let defaultColor = 'gray.700';

  const isDarkMenu = isDarkMenuTheme();
  if (isDarkMenu) {
    defaultColor = isTwoTone ? 'whiteAlpha.500' : 'whiteAlpha.800';
  }

  let defaultTwoToneColor = 'gray.300';
  if (isDarkMenu) {
    defaultTwoToneColor = isTwoTone ? 'whiteAlpha.800' : 'whiteAlpha.500';
  }

  const activeColor = isTwoTone ? 'whiteAlpha.700' : 'white';

  const iconProps = isTwoTone
    ? {
        twoToneColor: active ? 'white' : defaultTwoToneColor,
      }
    : {};

  if (!Icon) return null;

  return (
    <Icon
      color={active ? activeColor : defaultColor}
      size={14}
      style={style}
      {...iconProps}
    />
  );
}

export default MenuIcon;
