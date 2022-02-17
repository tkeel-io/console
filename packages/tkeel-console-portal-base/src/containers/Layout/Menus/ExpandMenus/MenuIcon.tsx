import { Box } from '@chakra-ui/react';
import * as icons from '@tkeel/console-icons';

import { isDarkMenuTheme } from '@/tkeel-console-portal-base/utils';

type Props = {
  icon: string;
  active: boolean;
  style?: React.CSSProperties;
};

function MenuIcon({ icon, active, style = {} }: Props) {
  const iconName = icon || 'AppsAddFilledIcon';
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const Icon = icons[iconName];
  const isTwoTone = iconName.includes('TwoTone');
  let defaultColor = 'gray.700';

  const isDarkTheme = isDarkMenuTheme();
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

  if (!Icon) return null;

  return (
    <Box
      _hover={{
        '& > svg': {
          fill: 'white !important',
        },
      }}
    >
      <Icon
        color={active ? activeColor : defaultColor}
        style={style}
        {...iconProps}
      />
    </Box>
  );
}

export default MenuIcon;
